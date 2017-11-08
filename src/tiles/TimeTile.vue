<template>
    <article class="tile time">
        <h2 class="time--current">{{ currentTime }}</h2>
        <ul class="time--schedule">
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
                previousTime: '00:00',
                currentPeriod: 'Przerwa',
                nextTime: '00:00'
            }
        },

        mounted() {
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
                ].map(val => val.map(val => moment().hours(0).minutes(0).add(val, 'minutes')))
                console.log(lessons)

                const date = moment()

                // Set current time
                this.currentTime = moment(date).format('H:mm')

                // Set previous and next hours
                const now = date
                let foundPeriod = lessons.some(([from, to], i) => {
                    if (now < from && i == 0) {
                        this.previousTime = ''
                        this.currentPeriod = 'Przed lekcjami'
                        this.nextTime = moment(from).format('H:mm')

                        return true
                    } else if (from <= now && now < to) {
                        this.previousTime = moment(from).format('H:mm')
                        this.currentPeriod = `Lekcja ${i + 1}.`
                        this.nextTime = moment(to).format('H:mm')

                        return true
                    } else if (to < now && i == lessons.length - 1) {
                        this.previousTime = moment(to).format('H:mm')
                        this.currentPeriod = 'Po lekcjach'
                        this.nextTime = ''
                        
                        return true
                    }
                })

                if (!foundPeriod) {
                    lessons.forEach(([from, to], i) => {
                        if (to < now) {
                            this.previousTime = moment(to).format('H:mm')
                            this.currentPeriod = 'Przerwa'
                            this.nextTime = moment(lessons[i + 1][0]).format('H:mm')
                        }
                    })
                }
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
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            background: $primaryTransColor;

            list-style: none;
        }

        &--schedule li {
            padding: 1vw;
        }

        &--schedule-previous,
        &--schedule-next {
            flex: 1 0 0;
        }

        &--schedule-current {
            flex: 1 1 auto;
        }
    }
</style>
