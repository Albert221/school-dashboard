<template>
  <article class="tile lucky-numbers">
        <h2 class="lucky-numbers--title">Szczęśliwe numerki</h2>
        <ul class="lucky-numbers--numbers">
            <li class="lucky-numbers--number">{{ firstNumber }}</li>
            <li class="lucky-numbers--number">{{ secondNumber }}</li>
        </ul>
    </article>
</template>

<script>
    import fetch from 'fetch-retry'
    import { API_URL } from '../constants'

    export default {
        data() {
            return {
                firstNumber: 0,
                secondNumber: 0
            }
        },

        mounted() {
            this.updateNumbers()

            setInterval(() => {
                this.updateNumbers()
            }, 1000 * 60 * 60); // Update the lucky numbers every hour
        },

        methods: {
            updateNumbers() {
                const url = `${API_URL}/lucky`

                fetch(url, {
                    retries: Number.MAX_SAFE_INTEGER,
                    retryDelay: 1 * 60 * 1000
                }).then((response) => {
                    response.json().then((data) => {
                        this.firstNumber = data.numbers[0]
                        this.secondNumber = data.numbers[1]
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../variables';

    .lucky-numbers {
        display: flex;
        flex-direction: column;

        &--title {
            margin: 0;
            padding: 1vw 1vw 0;
            font-weight: 500;
            text-align: center;
        }

        &--numbers {
            flex: 1;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &--number {
            background: $primaryTransColor;
            padding: 1.5vw;
            font-size: 4vw;
            font-weight: 300;
        }
    }
</style>

