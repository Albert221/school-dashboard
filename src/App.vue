<template>
  <div>
      <BackgroundTile :type="background.type" :src="background.src" />
      <div class="tile-container">
        <TimeTile />
        <WeatherTile :lat="54.717824" :lng="18.411052" />
        <LuckyNumbersTile />
        <FeedTile />
        <TimetableTile firstClass="1ti" secondClass="2ti" />
        <TimetableTile firstClass="3ti" secondClass="4ti" />
        <TimetableTile firstClass="1lab" secondClass="1lah" />
        <TimetableTile firstClass="2la" secondClass="3la" />
        <EmptyTile />
        <EmptyTile />
      </div>
  </div>
</template>

<script>
  import TimeTile from './tiles/TimeTile.vue'
  import WeatherTile from './tiles/WeatherTile.vue'
  import LuckyNumbersTile from './tiles/LuckyNumbersTile.vue'
  import FeedTile from './tiles/FeedTile.vue'
  import TimetableTile from './tiles/TimetableTile.vue'
  import EmptyTile from './tiles/EmptyTile.vue'
  import BackgroundTile from './tiles/BackgroundTile.vue'

  export default {
    name: 'app',

    components: {
      TimeTile,
      WeatherTile,
      LuckyNumbersTile,
      FeedTile,
      TimetableTile,
      EmptyTile,
      BackgroundTile,
    },

    data() {
      return {
        background: {
          type: 'twitch',
          src: 'esl_csgo'
          // type: 'image',
          // src: "http://wp.widewallpapers.net/4k/nature/autumn/3840x2160/autumn-3840x2160-009.jpg",
        }
      }
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
