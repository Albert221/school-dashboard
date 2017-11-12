<template>
    <div class="background--content">
        <div v-if="type === 'twitch'" id="twitch" class="background--content--twitch"></div>
        <img v-else-if="type === 'image'" :src="src" class="background--content--image" />
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            }
        },

        mounted() {
            if(this.type === 'twitch') {
                new Twitch.Embed("twitch", {
                    channel: this.src,
                    layout: "video",
                    muted: true,
                    controls: false,
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '../variables';

    .background {        
        &--content {
            position: fixed;
            z-index: -100;

            &--image {
                width: 100%;
                min-height: 500px;
                width: 100vw;
                height: 100vh;
                object-fit: cover;
            }

            &--twitch iframe{
                width: 100vw;
                height: 100vh;
            }
        }
    }
</style>