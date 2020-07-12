<template>
    <div>
        <SearchPanel :cats="cats" :companies="companies"/>
        <div class="container" :style="{marginTop: 50 + 'px'}">
            <div class="row" :style="{margin: 'auto'}">
                <Card
                        v-if="posts"
                        v-for="(item, index) in posts"
                        :key="index"
                        :post="item"
                        :cat="cats.find(i => i.slug === item.cat)"
                />
            </div>
        </div>
        <client-only>
            <infinite-loading @infinite="infiniteScroll">
                <div slot="spinner"><Spinner /></div>
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </client-only>
    </div>
</template>

<script>

    import {mapState, mapActions, mapMutations} from 'vuex'
    import SearchPanel from "~/components/pages/index/SearchPanel";
    import Card from "~/components/elements/Card";
    import Spinner from "../components/elements/Spinner";


    export default {
        components: {Spinner, Card, SearchPanel},
        async fetch({store, route}) {
            await store.dispatch('post/getPosts', route.fullPath).then(async () => {
                await store.dispatch('company/getCompanies');
                await store.dispatch('category/getCats');
            });
        },
        head() {
            return {
                title: `Акции, скидки, каталоги магазинов Москвы - Tviser.io`,
                // meta: [
                //     { name: 'description', content: `${this.$t('metaDescription')}` || '' },
                //     { property: 'og:title', content: `${this.$t('MetaTitle')}` || '' } ,
                //     { property: 'og:description', content: `${this.$t('metaDescription')}` || '' } ,
                //     { property: 'og:image', content: '/images/main-page/slide1.png' || '' } ,
                //     { property: 'og:url', content: `https://covid.az/${this.$route.fullPath}` || '' } ,
                //     { property: 'twitter:card', content: '/images/main-page/slide1.png' || '' } ,
                //     { name: 'keywords', content: `${this.$t('keywords')}` || '' },
                // ]
            }
        },
        methods: {
            ...mapActions('company', ['getCompanies']),
            ...mapActions('category', ['getCats']),
            ...mapActions('post', ['getPosts']),
            ...mapMutations('post', ['SET_PAGE']),

            infiniteScroll($state) {
                if (this.posts.length < parseInt(this.total)) {
                    this.SET_PAGE(this.page + 1)
                    this.getPosts(this.$route.fullPath).then(() => {
                        $state.loaded()
                    })
                } else {
                    $state.complete()
                }
            },
        },
        watchQuery(newQuery, oldQuery) {
            return newQuery && oldQuery
        },

        computed: {
            ...mapState('company', ['companies']),
            ...mapState('category', ['cats']),
            ...mapState('post', ['posts', 'total', 'page']),
        }
    }
</script>

