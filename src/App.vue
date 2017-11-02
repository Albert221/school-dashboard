<template>
  <div class="tile-container">
    <TimeTile />
    <WeatherTile />
    <LuckyNumbersTile />
    <FeedTile />
    <TimetableTile />
    <TimetableTile />
    <TimetableTile />
    <TimetableTile />
    <EmptyTile />
    <EmptyTile />
    <TwitchTile channel="esl_csgo" />
  </div>
</template>

<script>
  import TimeTile from './tiles/TimeTile.vue'
  import WeatherTile from './tiles/WeatherTile.vue'
  import LuckyNumbersTile from './tiles/LuckyNumbersTile.vue'
  import FeedTile from './tiles/FeedTile.vue'
  import TimetableTile from './tiles/TimetableTile.vue'
  import EmptyTile from './tiles/EmptyTile.vue'
  import TwitchTile from './tiles/TwitchTile.vue'

  export default {
    name: 'app',
    components: {
      TimeTile,
      WeatherTile,
      LuckyNumbersTile,
      FeedTile,
      TimetableTile,
      EmptyTile,
      TwitchTile
    }
  }
</script>

<style lang="scss">
  @import 'node_modules/normalize-scss/sass/normalize/import-now';

  @import './variables';
  @import './base';

  .tile-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 20vw 20vw 20vw 20vw;
    grid-template-rows: 24vh 24vh 24vh;
    
    grid-gap: 1.5vw;
    padding: 7vw;
  }

  .tile {
      background: transparentize(#ffffff, .2);
  }
</style>
