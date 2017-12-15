<template>
  <article class="tile feed">
        <h2 class="feed--advert">Ogłoszenia</h2>
        <div class="feed--marquee-container">
            <div class="feed--marquee">
                <div class="feed--scroll" v-for="feed in feeds">
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
    import Marquee from './../marquee'
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
            this.marquee = new Marquee('.feed--marquee-container')

            this.updateNews()
            setInterval(() => {
                this.updateNews()
            }, 1000 * 60 * 1); // Update news every minute
        },


        methods: {
            updateNews() {
                const url = `${API_URL}/newsfeed/5`

                fetch(url, {
                    retries: Number.MAX_SAFE_INTEGER,
                    retryDelay: 1000 * 60 * 1
                }).then((response) => {
                    response.json().then((data) => {
                        this.feeds = data.news
                        
                        this.convertDate()
                        setTimeout(() => this.marquee.update(), 1000)
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

        &--marquee-container {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        &--marquee {
            //
        }

        &--scroll {
            //
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
            margin-right: 3px;
            text-align: right;
            font-style: italic;
        }
    }
</style>

