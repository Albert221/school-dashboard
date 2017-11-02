<template>
    <article class="tile weather">
        <div class="weather--current">
            <span class="weather--current-temperature">7&deg;C</span>
        </div>
        <ul class="weather--coming">
            <li class="weather--coming-item">
                <span class="weather--coming-time">Wieczorem</span>
                <span class="weather--coming-temperature">6&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">W nocy</span>
                <span class="weather--coming-temperature">0&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">Jutro</span>
                <span class="weather--coming-temperature">5&deg;C</span>
            </li>
            <li class="weather--coming-item">
                <span class="weather--coming-time">Pojutrze</span>
                <span class="weather--coming-temperature">-1&deg;C</span>
            </li>
        </ul>
    </article>
</template>

<script>
    export default {
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
