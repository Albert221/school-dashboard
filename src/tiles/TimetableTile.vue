<template>
  <article class="tile timetable">
        <table class="timetable--table">
            <tbody>
                <tr>
                    <td class="timetable--classname" colspan="3">{{ firstClassData.name }}</td>
                </tr>
                <tr v-for="lesson in firstClassData.visibleLessons">
                    <td class="timetable--lesson">{{ lesson.lesson }}</td>
                    <td class="timetable--time">
                        <time :datetime="lesson.time[0]"></time>
                    </td>
                    <td class="timetable--room">{{ lesson.room }}</td>
                </tr>
                <tr v-if="secondClass">
                    <td class="timetable--classname" colspan="3">{{ secondClassData.name }}</td>
                </tr>
                <tr v-for="lesson in secondClassData.visibleLessons">
                    <td class="timetable--lesson">{{ lesson.lesson }}</td>
                    <td class="timetable--time">
                        <time :datetime="lesson.time[0]"></time>
                    </td>
                    <td class="timetable--room">{{ lesson.room }}</td>
                </tr>
            </tbody>
        </table>
    </article>
</template>

<script>
    import moment from 'moment'
    import { sprintf } from 'sprintf-js'
    import { API_URL } from '../constants'
    import pickBy from 'lodash.pickby'

    export default {
        props: {
            firstClass: {
                type: String,
                required: true
            },
            secondClass: {
                type: String
            }
        },

        data() {
            return {
                firstClassData: {
                    name: '',
                    lessons: {},
                    visibleLessons: {}
                },
                secondClassData: {
                    name: '',
                    lessons: {},
                    visibleLessons: {}
                }
            }
        },

        mounted() {
            this.updateTimetables()
            this.updateVisibility()
            this.updateTimes()

            setInterval(() => {
                this.updateTimes()
                this.updateVisibility()
            }, 1000)

            setInterval(() => {
                this.updateTimetables()
            }, 1000 * 60 * 60)
        },

        methods: {
            updateTimes() {
                const times = document.querySelectorAll('.timetable--time time')

                for (const time of times) {
                    const timeValue = time.getAttribute('datetime')

                    if (timeValue != 0) {
                        time.innerText = moment(timeValue).locale('pl').fromNow()
                    }
                }
            },

            updateVisibility() {
                const now = moment()

                function shouldStartPicking(lesson, key, keyValues) {
                    if (key == keyValues.lowest && now.diff(lesson.time[0]) < 0)
                        return true

                    if (now.diff(lesson.time[0], 'minutes') <= 45)
                        return true

                    if (key == keyValues.highest - 2)
                        return true

                    return false
                }

                function getVisible(lessons) {
                    const keys = Object.keys(lessons).map((number) => parseInt(number))

                    const keyValues = {
                        lowest: Math.min(...keys),
                        highest: Math.max(...keys)
                    }
                    
                    let startedPicking = false
                    let leftToPick = 3

                    return pickBy(lessons, (lesson, key) => {
                        if (startedPicking) {
                            if (leftToPick > 0) {
                                leftToPick--

                                return true
                            }
                        }
                        else if (shouldStartPicking(lesson, key, keyValues)) {
                            startedPicking = true
                            leftToPick--

                            return true
                        }

                        return false
                    })
                }

                this.firstClassData.visibleLessons = getVisible(this.firstClassData.lessons)
                this.secondClassData.visibleLessons = getVisible(this.secondClassData.lessons)
            },

            updateTimetables() {
                const lessonTime = [
                    [ 7*60+40,  8*60+25],
                    [ 8*60+30,  9*60+15],
                    [ 9*60+20, 10*60+ 5],
                    [10*60+15, 11*60   ],
                    [11*60+10, 11*60+55],
                    [12*60+15, 13*60   ],
                    [13*60+ 5, 13*60+50],
                    [13*60+55, 14*60+40],
                    [14*60+45, 15*60+30],
                    [15*60+35, 16*60+20],
                    [16*60+25, 17*60+10]
                ].map(val => val.map(val => moment().hours(0).minutes(0).add(val, 'minutes')))

                const url = `${API_URL}/timetable/%s`
                const dayOfWeek = parseInt(moment().format('d'))

                fetch(sprintf(url, this.firstClass)).then((response) => {
                    response.json().then((data) => {
                        this.firstClassData.name = data['className']

                        if (data['timetable'][dayOfWeek] != null) {
                            this.firstClassData.lessons = data['timetable'][dayOfWeek]

                            for (const key in this.firstClassData.lessons) {
                                this.firstClassData.lessons[key].time = lessonTime[key - 1]
                            }
                        }
                        else {
                            for (let key = 1; key <= 3; key++) {
                                this.firstClassData.lessons[key] = {
                                    lesson: '',
                                    time: [0, 0],
                                    room: ''
                                }
                            }
                        }
                    })
                })

                if (this.secondClass) {
                    fetch(sprintf(url, this.secondClass)).then((response) => {
                        response.json().then((data) => {
                            this.secondClassData.name = data['className']

                            if (data['timetable'][dayOfWeek] != null) {
                                this.secondClassData.lessons = data['timetable'][dayOfWeek]

                                for (const key in this.secondClassData.lessons) {
                                    this.secondClassData.lessons[key].time = lessonTime[key - 1]
                                }
                            }
                            else {
                                for (let key = 1; key <= 3; key++) {
                                    this.secondClassData.lessons[key] = {
                                        lesson: '',
                                        time: [0, 0],
                                        room: ''
                                    }
                                }
                            }
                        })
                    })
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

