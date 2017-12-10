var fs = require('fs')
var fetch = require('node-fetch')
var child_process = require('child_process')

var url = 'https://api.github.com/repos/PozytywneInicjatywy/dashboard-front/commits'

var params = [
    '../../index.html',
    '--kiosk',
    '--incognito',
    '--disable-infobars'
]

function runCommand(command) {
    try {
        child_process.execSync(command, { cwd: __dirname })
    }
    catch (exception) {

    }
}

fetch(url).then(function(response) {
    response.json().then(function(data) {
        var sha = data[0]['sha']

        fs.readFile(__dirname + '/lastver.txt', 'utf8', function (error, data) {
            if (error || data !== sha) {
                console.log('error or outdated')

                runCommand('pkill chrome')

                runCommand('cp ../../src/constants.js /tmp/dashboard-backup.js')

                runCommand('git fetch --all')
                runCommand('git reset --hard origin/master')

                runCommand('mv /tmp/dashboard-backup.js ../../src/constants.js')

                runCommand('npm install')
                runCommand('npm run build')

                child_process.spawn('google-chrome', params, { cwd: __dirname, detached: true, stdio: 'ignore', env: { DISPLAY: ':0' } })
                    .unref()

                fs.writeFile(__dirname + '/lastver.txt', sha, 'utf8', function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
            }
            else {
                console.log('all is good')
            }
        })
    })
})