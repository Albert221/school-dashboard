<template>
  <article class="tile feed">
        <h2 class="feed--advert">Ogłoszenia</h2>
        <div class="feed--marquee" id="marquee">
            <div class="feed--scroll" id="vmarquee">
                <div v-for="feed in feeds">
                    <div class="feed--title">{{ feed.title }}</div>
                    <div class="feed--content">{{ feed.content }}</div>
                    <div class="feed--author">{{ feed.author.username }}</div>
                    <div class="feed--publishedAt">{{ feed.publishedAt.toLocaleString() }}</div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import * as marquee from './../marquee'
    import fetch from 'fetch-retry'
    import { API_URL } from '../constants'

    export default {
        data() {
            return {
                feeds:[{
                        "title": "",
                        "content": "",
                        "author": {
                            "username": ""
                        },
                        "publishedAt": ""
                    }
                ]
            }
        },

        mounted() {
            this.updateNews()

            setInterval(() => {
                this.updateNews()
            }, 1000 * 60 * 5); // Update news every 5 minutes
            marquee.Init('marquee','vmarquee');
        },


        methods: {
            updateNews() {
                const url = `${API_URL}/newsfeed/5`

                fetch(url, {
                    retries: Number.MAX_SAFE_INTEGER,
                    retryDelay: 1 * 60 * 1000
                }).then((response) => {
                    response.json().then((data) => {
                        this.feeds = data.news;
                        
                        this.convertDate();
                    })
                })
            },

            convertDate() {
                for(var i=0;i<this.feeds.length;i++){
                    this.feeds[i].publishedAt = new Date(1000*this.feeds[i].publishedAt);
                }
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
            position:relative;
            height:100%;
            overflow: hidden;
        }

        &--scroll {
            position:absolute;
        }

        &--title {
            font-size:1.1em;
            text-align: center;
            font-weight: bolder;
        }

        &--content {
            flex: 1;
            white-space: pre-line;
            text-align: center;
        }

        &--author {
            text-align:right;
            font-style:italic;
            padding:0.5vw 1vw 0;
        }

        &--publishedAt {
            font-size:16px;
            text-align:right;
            padding:0 1vw 2vw;
            font-style:italic;
        }
    }
</style>

