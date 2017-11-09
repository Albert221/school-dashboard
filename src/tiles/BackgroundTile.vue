<template>
    <div class="tile background">
        <div v-if="type === 'twitch'" id="twitch"></div>
        <img v-else-if="type === 'image'" id="image" :src="this.src"/>
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
            if(this.type === "twitch")
            {
                new Twitch.Embed("twitch", {
                    channel: this.src,
                    layout: "video",
                    muted: true,
                    width: 800,
                    controls: false,
                });
            }
        }
    }
</script>

<style lang="scss">
    .background {
        position: fixed;
        min-width: 100%;
        min-height: 100%;
        width: 100%;
        height: 100%;
        z-index: -100;
    }

    #twitch {
        width: 100%;
        height: 100%;
    }

    #twitch iframe {
        width: 100%;
        height: 100%;
    }

    #image {
        width: 100%;
        height: 100%;
    }
</style>