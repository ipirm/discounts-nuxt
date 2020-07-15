<template>
    <div>
        <div class="overlaySearch" style="height: 200px">
            <div class="overlay-search">
                <div class="overlay-search-title">
                    <span>
                        Сохраннные вами скидки и акции
                        <b>{{ $t('searchPanel.subtitle') }}</b>
                    </span>
                </div>
            </div>
        </div>
        <div class="container" :style="{marginTop: 50 + 'px'}">
            <div class="row" :style="{margin: 'auto'}">
                <Card
                        v-if="postSaved"
                        v-for="(item, index) in postSaved"
                        :key="index"
                        :post="item"
                />
            </div>
        </div>
        <client-only>
            <infinite-loading ref="InfiniteLoading" @infinite="infiniteScroll">
                <div slot="spinner">
                    <Spinner/>
                </div>
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </client-only>
    </div>
</template>

<script>

    import {mapState,mapActions} from 'vuex'
    import Card from "~/components/elements/Card";
    import Spinner from "~/components/elements/Spinner";


    export default {

        components: {Spinner, Card},
        head() {
            return {
                title: `Акции, скидки, каталоги магазинов Москвы - Tviser.io`
            }
        },
        created(){
            if (this.$cookies.get('savedItems')) {
                if (String(this.$cookies.get('savedItems')).includes('a')) {
                    let items = this.$cookies.get('savedItems').split('a')
                    this.getSaved(items);
                }
            }
        },
        methods: {
            ...mapActions('post', ['getSaved']),
            infiniteScroll($state) {
                    $state.complete()
            },
        },
        computed: {
            ...mapState('post', ['postSaved']),
        }
    }
</script>

