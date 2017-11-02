<template>
    <article class="tile time">
        <h2 class="time--current">16:42</h2>
        <ul class="time--schedule">
            <li class="time--schedule-previous">16:40</li>
            <li class="time--schedule-current">Przerwa</li>
            <li class="time--schedule-next">16:45</li>
        </ul>
    </article>
</template>

<script>
    export default {
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

        &--schedule-previous {
            //
        }

        &--schedule-current {
            flex: 1;
        }

        &--schedule-next {
            //
        }
    }
</style>
