<template>
  <div class="tile-container">
    <TimeTile />
    <WeatherTile :lat="54.717824" :lng="18.411052" />
    <LuckyNumbersTile />
    <FeedTile />
    <TimetableTile firstClass="1ti" firstClassName="1 Ti" secondClass="2ti" secondClassName="2 Ti" />
    <TimetableTile firstClass="3ti" firstClassName="3 Ti" secondClass="4ti" secondClassName="4 Ti" />
    <TimetableTile firstClass="1la" firstClassName="1 LA" secondClass="2la" secondClassName="2 LA" />
    <TimetableTile firstClass="3la" firstClassName="3 LA" />
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
