<template>
    <article class="tile twitch">
        <div id="twitch" class="twitch--embed"></div>
    </article>
</template>

<script>
    export default {
        props: {
            channel: {
                type: String,
                required: true
            }
        },

        mounted() {
            new Twitch.Embed("twitch", {
                channel: this.channel,
                layout: "video",
                muted: true,
                width: "100%",
                controls: false,
            });
        }
    }
</script>

<style lang="scss">
    .twitch {
        &--embed iframe {
            height: calc(24vh + 1px);
        }
    }
</style>

