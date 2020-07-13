<template>
    <div class="company-section">
        <div class="container-fluid swiper-fluid">
            <div class="row" :style="{justifyContent: 'space-between', alignItems: 'center'}">
                <div class="col-auto">
                    <a @click="$router.go(-1)" class="post-back-button">
                        <svg-icon name="navigation/prev" style="width: 26px;height: 30px"/>
                        <span>{{$t('navigation.prev')}}</span>
                    </a>
                </div>
                <div class="col-auto">
                    <a class="post-back-button post-next-button" @click="nextRouterHandler">
                        <span>{{$t('navigation.next')}}</span>
                        <svg-icon name="navigation/next" style="width: 26px;height: 30px"/>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 post-shop"><span>{{$t('post.shop')}} <Clink :to="{name:'index', query:{company: postActive.company.id}}"><b>{{ postActive.company.name }}</b></Clink></span></div>
            </div>
            <div class="container post-container">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex">
                            <div class="post-text">
                                <div class="post-title"><span>{{ postActive.title[$i18n.locale]}}</span></div>
                                <div class="post-tags">
                                   <div class="post-tags-item"><span>{{ postActive.pcat.name[$i18n.locale] }}</span></div>
                                    <div class="post-tags-item" v-if="parseInt(postActive.ended) === 1">
                                        <span>{{ $t('card.overdue') }}</span></div>
                                </div>
                                <div class="post-description">
                                    {{postActive.description[$i18n.locale]}}
                                </div>
                                <div class="post-time">
                                    {{postActive.duration[$i18n.locale]}}
                                </div>
                                <div class="post-underline"></div>
                                <div class="post-information">
                                    <p>{{ $t('companyInformation.address') }}</p>
                                    <span>Насиминский район, ул. Бакиханова, 8 Хатаи, ул. Нариманова, 8, Баку плаза</span>
                                    <div class="post-information-time">{{ $t('companyInformation.time') }} 10:00 - 22:00</div>
                                </div>
                            </div>
                            <img class="post-image" :src="postActive.image_url"/>
                        </div>
                    </div>
                </div>
            </div>
            <PostSwiper :slides="activeCat.filter(i => i.id !== this.postActive.id)" />
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Clink from "../../components/elements/Link";
    import PostSwiper from "../../components/pages/post/PostSwiper";

    export default {
        components: {PostSwiper, Clink},
        async fetch({store, route}) {
            await store.dispatch('post/getActivePost', route.params.slug).then(async () => {
                await store.dispatch('category/getSameCats', route.params.slug)
            })

        },
        created(){
            this.SET_PAGE(1)
        },
        methods: {
            ...mapMutations('post', ['SET_PAGE']),
            nextRouterHandler() {
                if (this.activeCat.length !== null) {
                    let postIndex = this.activeCat.findIndex(i => i.id === this.postActive.id)
                    if (postIndex + 1 !== this.activeCat.length) {
                        this.$router.push(`/discount/${this.activeCat[postIndex + 1].slug}`)
                    } else {
                        postIndex = 0;
                        this.$router.push(`/discount/${this.activeCat[postIndex].slug}`)
                    }
                }
            }
        },
        computed: {
            ...mapState('post', ['postActive']),
            ...mapState('category', ['activeCat']),
        }
    }
</script>

<style scoped>

</style>
