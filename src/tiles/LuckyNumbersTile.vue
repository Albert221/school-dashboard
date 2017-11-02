<template>
  <article class="tile lucky-numbers">
        <h2 class="lucky-numbers--title">Szczęśliwe numerki</h2>
        <ul class="lucky-numbers--numbers">
            <li class="lucky-numbers--number">15</li>
            <li class="lucky-numbers--number">22</li>
        </ul>
    </article>
</template>

<script>
    export default {
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

