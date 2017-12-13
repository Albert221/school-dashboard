<template>
  <article class="tile feed">
        <h2 class="feed--advert">Ogłoszenia</h2>
        <div class="feed--marquee" id="marquee">
            <div class="feed--scroll">
                <div v-for="feed in feeds">
                    <div class="feed--title">{{ feed.title }}</div>
                    <div class="feed--published-at">{{ feed.publishedAt.calendar() }}</div>
                    <div class="feed--content" v-html="feed.content"></div>
                    <div class="feed--author">{{ feed.author.username }}</div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import moment from 'moment'
    import marquee from './../marquee'
    import fetch from 'fetch-retry'
    import { API_URL } from '../constants'

    export default {
        data() {
            return {
                feeds: [{
                        title: '',
                        content: '',
                        author: {
                            username: ''
                        },
                        publishedAt: moment()
                    }
                ]
            }
        },

        mounted() {
            this.updateNews()

            setInterval(() => {
                this.updateNews()
            }, 1000 * 60 * 5); // Update news every 5 minutes

            marquee('marquee')
        },


        methods: {
            updateNews() {
                const url = `${API_URL}/newsfeed/5`

                fetch(url, {
                    retries: Number.MAX_SAFE_INTEGER,
                    retryDelay: 1 * 60 * 1000
                }).then((response) => {
                    response.json().then((data) => {
                        this.feeds = data.news
                        
                        this.convertDate()
                    })
                })
            },

            convertDate() {
                this.feeds.map((feed) => {
                    feed.publishedAt = moment.unix(feed.publishedAt).locale('pl')
                    return feed
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .feed {
        grid-area: auto / auto / span 2 / span 1;
        display: flex;
        flex-direction: column;
        padding: 1vw 1vw 0;

        &--advert {
            margin-top: 0;
        }

        &--marquee {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        &--scroll {
            position: absolute;
            width: 100%;
        }

        &--title {
            font-size: 1.1em;
            font-weight: bolder;
        }

        &--published-at {
            color: #aaa;
            font-size: 90%;
        }

        &--content {
            flex: 1;
            white-space: pre-line;
        }

        &--author {
            text-align: right;
            font-style: italic;
        }
    }
</style>

