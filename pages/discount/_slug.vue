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
                    <a class="post-back-button post-next-button" @click="nextRouterHandler" v-if="activeCat.length > 1">
                        <span>{{$t('navigation.next')}}</span>
                        <svg-icon name="navigation/next" style="width: 26px;height: 30px"/>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 post-shop"><span>{{$t('post.shop')}} <Clink
                        :to="{name:'index', query:{company: activePostCompany.id}}"><b>{{ activePostCompany.name }}</b></Clink></span>
                </div>
            </div>
            <div class="container post-container">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex">
                            <div class="post-text">
                                <div class="post-title">
                                    <span>{{ postActive.title[$i18n.locale]}}</span>
                                    <a class="save-button" @click="saveToFavorite" v-if="!saved">
                                        <svg width="41" height="37" viewBox="0 0 41 37" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5 36.719C19.9163 36.719 19.3535 36.5076 18.915 36.1234C17.2587 34.6752 15.6618 33.3141 14.2529 32.1136L14.2457 32.1073C10.1152 28.5873 6.54825 25.5475 4.06646 22.553C1.2922 19.2054 0 16.0313 0 12.5639C0 9.19498 1.15519 6.08695 3.25254 3.81192C5.37492 1.50999 8.28713 0.242188 11.4537 0.242188C13.8203 0.242188 15.9878 0.990417 17.8956 2.46592C18.8584 3.21071 19.7311 4.12222 20.5 5.18545C21.2691 4.12222 22.1416 3.21071 23.1047 2.46592C25.0125 0.990417 27.1799 0.242188 29.5466 0.242188C32.7128 0.242188 35.6253 1.50999 37.7477 3.81192C39.8451 6.08695 40.9999 9.19498 40.9999 12.5639C40.9999 16.0313 39.708 19.2054 36.9338 22.5527C34.452 25.5475 30.8854 28.587 26.7554 32.1067C25.3441 33.3091 23.7447 34.6723 22.0846 36.1241C21.6464 36.5076 21.0833 36.719 20.5 36.719ZM11.4537 2.64391C8.96592 2.64391 6.68057 3.63675 5.01801 5.43976C3.33074 7.26998 2.4014 9.79995 2.4014 12.5639C2.4014 15.4802 3.48527 18.0883 5.91545 21.0206C8.2643 23.8549 11.758 26.8322 15.8032 30.2796L15.8107 30.2859C17.2249 31.4911 18.828 32.8574 20.4965 34.3164C22.175 32.8546 23.7807 31.4861 25.1977 30.279C29.2425 26.8316 32.7359 23.8549 35.0848 21.0206C37.5147 18.0883 38.5985 15.4802 38.5985 12.5639C38.5985 9.79995 37.6692 7.26998 35.9819 5.43976C34.3197 3.63675 32.034 2.64391 29.5466 2.64391C27.7242 2.64391 26.051 3.22322 24.5736 4.36559C23.257 5.38408 22.3399 6.67159 21.8022 7.57246C21.5256 8.03573 21.0389 8.31225 20.5 8.31225C19.961 8.31225 19.4743 8.03573 19.1978 7.57246C18.6604 6.67159 17.7432 5.38408 16.4263 4.36559C14.9489 3.22322 13.2757 2.64391 11.4537 2.64391Z"
                                                  fill="#424242"/>
                                        </svg>
                                    </a>
                                    <a class="save-button" @click="saveToFavorite" v-else>
                                        <svg width="41" height="37" viewBox="0 0 41 37" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5 36.719C19.9163 36.719 19.3535 36.5076 18.915 36.1234C17.2587 34.6752 15.6618 33.3141 14.2529 32.1136L14.2457 32.1073C10.1152 28.5873 6.54825 25.5475 4.06646 22.553C1.2922 19.2054 0 16.0313 0 12.5639C0 9.19498 1.15519 6.08695 3.25254 3.81192C5.37492 1.50999 8.28713 0.242188 11.4537 0.242188C13.8203 0.242188 15.9878 0.990417 17.8956 2.46592C18.8584 3.21071 19.7311 4.12222 20.5 5.18545C21.2691 4.12222 22.1416 3.21071 23.1047 2.46592C25.0125 0.990417 27.1799 0.242188 29.5466 0.242188C32.7128 0.242188 35.6253 1.50999 37.7477 3.81192C39.8451 6.08695 40.9999 9.19498 40.9999 12.5639C40.9999 16.0313 39.708 19.2054 36.9338 22.5527C34.452 25.5475 30.8854 28.587 26.7554 32.1067C25.3441 33.3091 23.7447 34.6723 22.0846 36.1241C21.6464 36.5076 21.0833 36.719 20.5 36.719ZM11.4537 2.64391C8.96592 2.64391 6.68057 3.63675 5.01801 5.43976C3.33074 7.26998 2.4014 9.79995 2.4014 12.5639C2.4014 15.4802 3.48527 18.0883 5.91545 21.0206C8.2643 23.8549 11.758 26.8322 15.8032 30.2796L15.8107 30.2859C17.2249 31.4911 18.828 32.8574 20.4965 34.3164C22.175 32.8546 23.7807 31.4861 25.1977 30.279C29.2425 26.8316 32.7359 23.8549 35.0848 21.0206C37.5147 18.0883 38.5985 15.4802 38.5985 12.5639C38.5985 9.79995 37.6692 7.26998 35.9819 5.43976C34.3197 3.63675 32.034 2.64391 29.5466 2.64391C27.7242 2.64391 26.051 3.22322 24.5736 4.36559C23.257 5.38408 22.3399 6.67159 21.8022 7.57246C21.5256 8.03573 21.0389 8.31225 20.5 8.31225C19.961 8.31225 19.4743 8.03573 19.1978 7.57246C18.6604 6.67159 17.7432 5.38408 16.4263 4.36559C14.9489 3.22322 13.2757 2.64391 11.4537 2.64391Z"
                                                  fill="red"/>
                                        </svg>
                                    </a>
                                </div>
                                <div class="post-tags">
                             <clink :to="{name:'index', query:{cats: postActive.pcat.id}}" class="post-tags-item"><span>{{ postActive.pcat.name[$i18n.locale] }}</span></clink>
                                    <a class="post-tags-item" v-if="parseInt(postActive.ended) === 1">
                                        <span>{{ $t('card.overdue') }}</span></a>
                                </div>
                                <div class="post-description">
                                    {{postActive.description[$i18n.locale]}}
                                </div>
                                <div class="post-time">
                                    {{postActive.duration[$i18n.locale]}}
                                </div>
                                <div class="post-underline"></div>
                                <div class="post-information" v-for="item in activePostCompany.address.slice(0,1)" :key="item.id">
                                    <p>{{ $t('companyInformation.address') }}</p>
                                    <span>{{ item.address}}</span>
                                    <div class="post-information-time">{{ $t('companyInformation.time') }}
                                        {{ item.time}}
                                    </div>
                                </div>
                                <clink class="hide-props" :to="`/company/${activePostCompany.slug}`" >Показать еще </clink>
                            </div>
                            <img class="post-image" :src="postActive.image_url"/>
                        </div>
                    </div>
                </div>
            </div>
            <PostSwiper v-if="activeCat.length > 1" :slides="activeCat.filter(i => i.id !== this.postActive.id)"/>
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
        created() {
            if (this.$cookies.get('savedItems')) {
                if (String(this.$cookies.get('savedItems')).includes('a')) {
                   let items = this.$cookies.get('savedItems').split('a')
                    if (items.find(i => parseInt(i) === parseInt(this.postActive.id))){
                        this.saved = !this.saved
                    }
                }
            }
            this.SET_PAGE(1)
        },
        data(){
            return {
                saved: false
            }
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
            },
            saveToFavorite() {
                let items = [0];
                this.saved = !this.saved
                if (this.$cookies.get('savedItems')) {
                    if (String(this.$cookies.get('savedItems')).includes('a')) {
                        items = this.$cookies.get('savedItems').split('a')
                    }
                }
                if (items.find(i => parseInt(i) === parseInt(this.postActive.id))) {
                    items = items.filter(j => parseInt(j) !== parseInt(this.postActive.id))
                } else {
                    items.push(this.postActive.id)
                }
                this.$cookies.set('savedItems', items.join('a'), {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                })
            }
        },
        computed: {
            ...mapState('post', ['postActive','activePostCompany']),
            ...mapState('category', ['activeCat']),
        }
    }
</script>

<style scoped>

</style>
