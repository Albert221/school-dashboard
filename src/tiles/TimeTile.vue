<template>
    <article class="tile time">
        <h2 class="time--current">{{ currentTime.format('H:mm') }}</h2>
        <ul :class="'time--schedule time--schedule__' + currentPeriodClass">
            <li class="time--schedule-progress-item">
                <progress class="time--progress" :value="progress" max="100"></progress>
            </li>
            <li class="time--schedule-previous">{{ previousTime.format('H:mm') }}</li>
            <li class="time--schedule-current">{{ currentPeriod }}</li>
            <li class="time--schedule-next">{{ nextTime.format('H:mm') }}</li>
        </ul>
    </article>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                currentTime: moment(),
                progress: 0,
                previousTime: moment(),
                currentPeriod: 'Przerwa',
                currentPeriodClass: 'break',
                nextTime: moment()
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
                    [ 7*60+50,  8*60+35],
                    [ 8*60+35,  9*60+20],
                    [ 9*60+25, 10*60+10],
                    [10*60+20, 11*60+ 5],
                    [11*60+10, 11*60+55],
                    [12*60+15, 13*60   ],
                    [13*60+ 5, 13*60+50],
                    [13*60+55, 14*60+40],
                    [14*60+45, 15*60+30],
                    [15*60+35, 16*60+20],
                    [16*60+25, 17*60+10]
                ].map(val => val.map(val => moment().hours(0).minutes(0).add(val, 'minutes')))

                const now = moment()

                // Set current time
                this.currentTime = moment(now)

                // Set previous and next hours
                let foundPeriod = lessons.some(([from, to], i) => {
                    if (now < from && i == 0) {
                        this.previousTime = lessons[lessons.length - 1][1]
                        this.currentPeriod = 'Przed lekcjami'
                        this.currentPeriodClass = 'break'
                        this.nextTime = from

                        this.updateProgress(this.previousTime, this.nextTime, this.currentTime)

                        return true
                    } else if (from <= now && now < to) {
                        this.previousTime = from
                        this.currentPeriod = `Lekcja ${i + 1}.`
                        this.currentPeriodClass = 'lesson'
                        this.nextTime = to

                        this.updateProgress(this.previousTime, this.nextTime, this.currentTime)

                        return true
                    } else if (to < now && i == lessons.length - 1) {
                        this.previousTime = to
                        this.currentPeriod = 'Po lekcjach'
                        this.currentPeriodClass = 'break'
                        this.nextTime = lessons[0][0]

                        this.updateProgress(this.previousTime, this.nextTime, this.currentTime)

                        return true
                    }
                })

                if (!foundPeriod) {
                    lessons.forEach(([from, to], i) => {
                        if (to < now) {
                            this.previousTime = to
                            this.currentPeriod = 'Przerwa'
                            this.currentPeriodClass = 'break'
                            this.nextTime = lessons[i + 1][0]

                            this.updateProgress(this.previousTime, this.nextTime, this.currentTime)
                        }
                    })
                }
            },

            updateProgress(from, to, now) {
                if (from > to) {
                    to.add(1, 'day')
                }

                if (now < from) {
                    now.add(1, 'day')
                }

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

            &__break {
                background: $breakTransColor;
            }

            &__lesson {
                background: $lessonTransColor;
            }
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
