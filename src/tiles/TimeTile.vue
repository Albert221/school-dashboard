<template>
    <article class="tile time">
        <h2 class="time--current">{{ currentTime }}</h2>
        <ul class="time--schedule">
            <li class="time--schedule-progress-item">
                <progress class="time--progress" :value="progress" max="100"></progress>
            </li>
            <li class="time--schedule-previous">{{ previousTime }}</li>
            <li class="time--schedule-current">{{ currentPeriod }}</li>
            <li class="time--schedule-next">{{ nextTime }}</li>
        </ul>
    </article>
</template>

<script>
    import moment from 'moment'
    import { formatDate, formatPeriod } from '../utils'

    export default {
        data() {
            return {
                currentTime: '00:00',
                progress: 0,
                previousTime: '00:00',
                currentPeriod: 'Przerwa',
                nextTime: '00:00'
            }
        },

        mounted() {
            this.updateTime()

            setInterval(() => {
                this.updateTime()
            }, 1000)
        },

        methods: {
            updateTime() {
                const lessons = [
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
                ].map(val => val.map(val => val * 60 * 1000))

                const date = moment()

                // Set current time
                this.currentTime = moment(date).format('H:mm')

                // Set previous and next hours
                const now = (date.hours() * 60 + date.minutes()) * 60 * 1000 - 60 * 60 * 1000
                let foundPeriod = lessons.some(([from, to], i) => {
                    if (now < from && i == 0) {
                        this.previousTime = ''
                        this.currentPeriod = 'Przed lekcjami'
                        this.nextTime = moment(to).format('H:mm')

                        this.updateProgress(0, 0, 0)

                        return true
                    } else if (from <= now && now < to) {
                        this.previousTime = moment(from).format('H:mm')
                        this.currentPeriod = `Lekcja ${i + 1}.`
                        this.nextTime = moment(to).format('H:mm')

                        this.updateProgress(this.previousTime, this.nextTime, this.currentTime)

                        return true
                    } else if (to < now && i == lessons.length - 1) {
                        this.previousTime = moment(from).format('H:mm')
                        this.currentPeriod = 'Po lekcjach'
                        this.nextTime = ''

                        this.updateProgress(0, 0, 0)

                        return true
                    }
                })

                if (!foundPeriod) {
                    lessons.forEach(([from, to], i) => {
                        if (to < now) {
                            this.previousTime = moment(to).format('H:mm')
                            this.currentPeriod = 'Przerwa'
                            this.nextTime = moment(lessons[i + 1][0]).format('H:mm')

                            this.updateProgress(this.previousTime, this.nextTime, this.currentTime)
                        }
                    })
                }
            },

            updateProgress(from, to, now) {
                from = moment(from, 'H:mm')
                to = moment(to, 'H:mm')
                now = moment(now, 'H:mm')

                const max = to.diff(from)
                const value = now.diff(from)

                this.progress = (value / max * 100).toFixed(0)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../variables';

    .time {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        text-align: center;


        &--current {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            font-size: 6vw;
            font-weight: 300;
        }

        &--schedule {
            position: relative;
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            background: $primaryTransColor;

            list-style: none;
        }

        &--schedule-progress-item {
            z-index: -1;
        }

        &--progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            -webkit-appearance: none;

            &::-webkit-progress-bar {
                background: $primaryTransColor;
            }

            &::-webkit-progress-value {
                background: black;
            }
        }

        &--schedule-previous,
        &--schedule-current,
        &--schedule-next {
            flex: 1 0 0;
            padding: 1vw;
        }

        &--schedule-current {
            flex: 1 1 auto;
        }
    }
</style>
