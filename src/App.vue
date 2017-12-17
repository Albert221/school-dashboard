<template>
  <div>
      <BackgroundTile />
      <div class="tile-container">
        <TimeTile />
        <WeatherTile :lat="54.717824" :lng="18.411052" />
        <LuckyNumbersTile />
        <FeedTile />
        <TimetableTile firstClass="1ti" secondClass="2ti" />
        <TimetableTile firstClass="3ti" secondClass="4ti" />
        <TimetableTile firstClass="1lab" secondClass="1lah" />
        <TimetableTile firstClass="2la" secondClass="3la" />
      </div>
      <CreditsTile />
  </div>
</template>

<script>
  import BackgroundTile from './tiles/BackgroundTile.vue'
  import TimeTile from './tiles/TimeTile.vue'
  import WeatherTile from './tiles/WeatherTile.vue'
  import LuckyNumbersTile from './tiles/LuckyNumbersTile.vue'
  import FeedTile from './tiles/FeedTile.vue'
  import TimetableTile from './tiles/TimetableTile.vue'
  import EmptyTile from './tiles/EmptyTile.vue'
  import CreditsTile from './tiles/CreditsTile.vue'

  export default {
    name: 'app',

    components: {
      BackgroundTile,
      TimeTile,
      WeatherTile,
      LuckyNumbersTile,
      FeedTile,
      TimetableTile,
      EmptyTile,
      CreditsTile
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
