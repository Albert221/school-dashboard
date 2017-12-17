<template>
    <footer class="credits">
        Uptime: {{ uptime }} &bull;
        Stworzone przez: Alberta Wolszon, Jakuba Bizewskiego i Łukasza Ciskowskiego
    </footer>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                mountedAt: moment().locale('pl'),
                uptime: ''
            }
        },
        
        mounted() {
            // FIXME: do it without using setInterval
            setInterval(() => {
                this.uptime = this.mountedAt.fromNow(true)
            }, 1000)
        }
    }
</script>

<style lang="scss" scoped>
    .credits {
        position: fixed;
        right: 0;
        bottom: 0;
        border-top-left-radius: 3px;
        padding: 10px 20px;
        background: transparentize(#fff, .3);
    }
</style>
