<template>
  <article class="tile timetable">
        <table class="timetable--table">
            <tbody>
                <tr>
                    <td class="timetable--classname" colspan="3">{{ firstClassName }}</td>
                </tr>
                <tr v-for="lesson in lessons.firstClass">
                    <td class="timetable--lesson">{{ lesson.lesson }}</td>
                    <td class="timetable--time">
                        <time :datetime="lesson.time"></time>
                    </td>
                    <td class="timetable--room">{{ lesson.room }}</td>
                </tr>
                <tr v-if="secondClass">
                    <td class="timetable--classname" colspan="3">{{ secondClassName }}</td>
                </tr>
                <tr v-for="lesson in lessons.secondClass">
                    <td class="timetable--lesson">{{ lesson.lesson }}</td>
                    <td class="timetable--time">
                        <time :datetime="lesson.time"></time>
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

    export default {
        props: {
            firstClass: {
                type: String,
                required: true
            },
            firstClassName: {
                type: String,
                required: true
            },
            secondClass: {
                type: String
            },
            secondClassName: {
                type: String
            }
        },

        data() {
            return {
                lessons: {
                    firstClass: {},
                    secondClass: {}
                }
            }
        },

        mounted() {
            this.updateTimetables();
            this.updateTimes();

            setInterval(() => {
                this.updateTimes();
                this.updateVisibility();
            }, 1000);

            setInterval(() => {
                this.updateTimetables();
            }, 1000 * 60 * 60)
        },

        methods: {
            updateTimes() {
                const times = document.querySelectorAll('.timetable--time time');

                for (const time of times) {
                    const timeValue = time.getAttribute('datetime');
                    time.innerText = moment(timeValue).locale('pl').fromNow()
                }
            },

            updateVisibility() {

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
                ].map(val => val.map(val => moment().hours(0).minutes(0).add(val, 'minutes')));

                const url = `${API_URL}/timetable/%s`;
                const dayOfWeek = moment().format('dddd').toLowerCase();

                fetch(sprintf(url, this.firstClass)).then((response) => {
                    response.json().then((data) => {
                        this.lessons.firstClass = data[dayOfWeek];

                        for (const key in this.lessons.firstClass) {
                            this.lessons.firstClass[key].time = lessonTime[key - 1][0];
                        }
                    })
                });

                if (this.secondClass) {
                    fetch(sprintf(url, this.secondClass)).then((response) => {
                        response.json().then((data) => {
                            this.lessons.secondClass = data[dayOfWeek];

                            for (const key in this.lessons.secondClass) {
                                this.lessons.secondClass[key].time = lessonTime[key - 1][0];
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

