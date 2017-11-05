<template>
  <article class="tile timetable">
        <table class="timetable--table">
            <tbody>
                <tr>
                    <td class="timetable--classname" colspan="3">1 LAB</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Język polski</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T18:00:25+01:00"></time>
                    </td>
                    <td class="timetable--room">5</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Język polski</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T18:40:25+01:00"></time>
                    </td>
                    <td class="timetable--room">3</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Matematyka</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T19:30:25+01:00"></time>
                    </td>
                    <td class="timetable--room">1</td>
                </tr>
                <tr>
                    <td class="timetable--classname" colspan="3">1 LA H</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Język angielski</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T18:00:25+01:00"></time>
                    </td>
                    <td class="timetable--room">6</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Matematyka</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T18:40:25+01:00"></time>
                    </td>
                    <td class="timetable--room">1</td>
                </tr>
                <tr>
                    <td class="timetable--lesson">Biologia</td>
                    <td class="timetable--time">
                        <time datetime="2017-11-05T19:30:25+01:00"></time>
                    </td>
                    <td class="timetable--room">2</td>
                </tr>
            </tbody>
        </table>
    </article>
</template>

<script>
    import moment from 'moment'

    export default {
        mounted() {
            this.updateTimes()
            setInterval(() => {
                this.updateTimes()
            }, 1000)
        },

        methods: {
            updateTimes() {
                const times = document.querySelectorAll('.timetable--time time')

                for (const time of times) {
                    const timeValue = time.getAttribute('datetime')
                    time.innerText = moment(timeValue).locale('pl').fromNow()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../variables';

    .timetable {
        //

        &--table {
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            border-spacing: 0;
        }

        &--classname {
            background: $primaryTransColor;
            text-align: center;
        }

        &--lesson {
            padding-left: .7vw;
        }

        &--time {
            color: #777;
            font-size: 80%;
            vertical-align: middle;
        }

        &--room {
            padding-right: .7vw;
        }
    }
</style>

