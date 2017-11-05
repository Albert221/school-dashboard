<template>
    <article class="tile weather">
        <div class="weather--current">
            <span class="weather--current-temperature">{{ current.temperature }}&deg;C</span>
        </div>
        <ul class="weather--coming">
            <li class="weather--coming-item">
                <span class="weather--coming-time">Wieczorem</span>
                <span class="weather--coming-temperature">{{ evening.temperature }}&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">W nocy</span>
                <span class="weather--coming-temperature">{{ night.temperature }}&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">Jutro</span>
                <span class="weather--coming-temperature">{{ tomorrow.temperature }}&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">Pojutrze</span>
                <span class="weather--coming-temperature">{{ twoDays.temperature }}&deg;C</span>
            </li>
        </ul>
    </article>
</template>

<script>
    import { sprintf } from 'sprintf-js'
    import { OWM_APPID } from '../constants'

    export default {
        props: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                current: {
                    temperature: 0
                },
                evening: {
                    temperature: 0
                },
                night: {
                    temperature: 0
                },
                tomorrow: {
                    temperature: 0
                },
                twoDays: {
                    temperature: 0
                }
            }
        },

        mounted() {
            this.updateWeather()

            setInterval(() => {
                this.updateWeather()
            }, 1000*60*15) // Each 5 minutes
        },
        
        methods: {
            updateWeather() {
                const url = `http://api.openweathermap.org/data/2.5/%s?lat=${this.lat}&lon=${this.lng}&APPID=${OWM_APPID}&units=metric`

                // Current weather
                fetch(sprintf(url, 'weather')).then((response) => {
                    response.json().then((data) => {
                        this.current.temperature = data.main.temp
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../variables';

    .weather {
        display: flex;
        flex-direction: row;

        &--current {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &--current-temperature {
            font-size: 4vw;
            font-weight: 300;
        }

        &--coming {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0 1vw;
            background: $primaryTransColor;
            list-style: none;
        }

        &--coming-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &--coming-time {
            margin-right: 1vw;
        }

        &--coming-temperature {
            margin-left: auto;
        }
    }
</style>
