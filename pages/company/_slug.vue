<template>
    <div class="company-section company-page">
        <div class="container-fluid swiper-fluid">
            <div class="row" :style="{justifyContent: 'space-between', alignItems: 'center'}">
                <div class="col-auto">
                    <a class="post-back-button" @click="$router.go(-1)">
                        <svg-icon name="navigation/prev" style="width: 26px;height: 30px"/>
                        <span>{{ $t('navigation.prev') }}</span>
                    </a>
                </div>
            </div>
            <div class="container post-container company-container company-item-page">
                <div class="row">
                    <div class="col-12">
                        <div class="post-title"><span>{{ activeCompany.name }}</span></div>
                      {{ parseFloat(activeCompany.address[0].lng) - 0.01 }}
                        <div class="d-flex">
                            <div>
                                <img v-if="activeTab !== 3" class="post-image" :src="activeCompany.image_url"/>
                                <div v-else>
                                    <client-only>
                                        <GmapMap ref="mapRef"
                                                 :center="{lat: parseFloat(activeCompany.address[0].lng), lng: parseFloat(activeCompany.address[0].ltg)}"
                                                 :zoom="16" :options="options"
                                                 style="width: 360px;height: 330px">
                                            <gmap-custom-marker
                                                    v-for="item in activeCompany.address"
                                                    :key="item.id"
                                                    :marker="{ lat: parseFloat(item.lng), lng: parseFloat(item.ltg) }"
                                            >
                                              <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.9998 0C9.60952 0 4.41064 5.03641 4.41064 11.227C4.41064 18.9096 14.7818 30.1882 15.2234 30.6646C15.6381 31.1121 16.3623 31.1113 16.7763 30.6646C17.2178 30.1882 27.589 18.9096 27.589 11.227C27.5889 5.03641 22.3901 0 15.9998 0ZM15.9998 16.8756C12.7847 16.8756 10.1691 14.3416 10.1691 11.227C10.1691 8.11231 12.7848 5.57843 15.9998 5.57843C19.2149 5.57843 21.8305 8.11237 21.8305 11.227C21.8305 14.3417 19.2149 16.8756 15.9998 16.8756Z" fill="#F8C563"/>
                                              </svg>
                                            </gmap-custom-marker>
                                        </GmapMap>
                                    </client-only>
                                </div>
                                <client-only>
                                    <div class="overlay-social">
                                        <p class="overlay-social-text">{{$t('meta.share') }}</p>
                                        <facebook :url="url" scale="1"/>
                                        <twitter :url="url" :title="activeCompany.name" scale="1"/>
                                        <linkedin :url="url" scale="1"/>
                                        <telegram :url="url" scale="1"/>
                                        <whats-app :url="url" :title="activeCompany.name" scale="1"/>
                                    </div>
                                </client-only>
                            </div>
                            <div class="post-text">
                                <div class="post-information-tabs">
                                    <a :class="[activeTab === 1 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(1)"><span>Адреса</span></a>
                                    <a :class="[activeTab === 2 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(2)"><span>Телефоны</span></a>
                                    <a :class="[activeTab === 3 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(3)"><span>На карте</span></a>
                                </div>
                                <div class="post-information" v-show="activeTab === 1">
                                    <p style="margin-bottom: 10px">{{ $t('companyInformation.address') }}</p>
                                    <div v-for="item in activeCompany.address.slice(0,this.addressCount)" :key="item.id"
                                         style="margin-bottom: 10px">
                                        <span>{{item.address}}</span>
                                        <div class="post-information-time">{{ $t('companyInformation.time') }}
                                            {{item.time}}
                                        </div>
                                    </div>
                                    <a v-if="addressCount === 4 && activeCompany.address.length >4" class="hide-props"
                                       @click="sliceAddresCountHandler(100)">Показать все</a>
                                    <a v-if="addressCount !== 4 && activeCompany.address.length >4" class="hide-props"
                                       @click="sliceAddresCountHandler(4)">Скрыть</a>
                                </div>
                                <div class="post-information" v-show="activeTab === 2">
                                    <p style="margin-bottom: 10px">{{ $t('companyInformation.number') }}</p>
                                    <div class="post-information-time"
                                         v-for="item in activeCompany.numbers.slice(0,this.sliceCount)"
                                         :key="item.id">{{item.number}}
                                    </div>
                                    <a v-if="sliceCount === 6 && activeCompany.numbers.length >6" class="hide-props"
                                       @click="sliceCountHandler(100)">Показать все</a>
                                    <a v-if="sliceCount !== 6 && activeCompany.numbers.length >6" class="hide-props"
                                       @click="sliceCountHandler(6)">Скрыть</a>
                                </div>
                                <div class="post-information" v-show="activeTab === 3">
                                    <p style="margin-bottom: 10px">{{activeCompany.name }} на карте</p>
                                    <div class="post-information-time">
                                        Нажмите на карту для того, чтобы<br> просмотретьв полноэкранном режиме
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PostSwiper v-if="companiesSame.length" :slides="companiesSame"/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import GmapCustomMarker from "vue2-gmap-custom-marker";
    import PostSwiper from "../../components/pages/post/PostSwiper";

    export default {
        components: {PostSwiper, GmapCustomMarker},
        async fetch({store, route}) {
            await store.dispatch('company/getCompany', route.params.slug).then(async () => {
                console.log(store.state.company.activeCompany.id);
                await store.dispatch('company/getCompanySane', store.state.company.activeCompany.id)
            })
        },
        asyncData(context) {
            return {
                options: {
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    disableDefaultUi: false,
                }
            }
        },
        data() {
            return {
                activeTab: 1,
                sliceCount: 6,
                addressCount: 4,
                url: `https://discount-nuxt.herokuapp.com${this.$route.fullPath}`
            }
        },
        head() {
            return {
                title: this.activeCompany.name,
                meta: [
                    {property: 'og:title', content: this.activeCompany.name || ''},
                    {property: 'og:description', content: this.activeCompany.description || ''},
                    {name: 'description', content: this.activeCompany.description || ''},
                    {property: 'og:image', content: this.activeCompany.image_url || ''},
                    {property: 'og:url', content: `https://discount-nuxt.herokuapp.com${this.$route.fullPath}` || ''},
                    {name: 'keywords', content: `${this.$t('keywords')}` || ''},
                    {property: 'twitter:card', content: this.activeCompany.image_url || ''},
                ]
            }
        },
        methods: {
            changeTab(item) {
                this.activeTab = item
            },
            sliceCountHandler(item) {
                this.sliceCount = item
            },
            sliceAddresCountHandler(item) {
                this.addressCount = item
            }
        },
        computed: {
            ...mapState('company', ['activeCompany', 'companiesSame']),
        }
    }
</script>

<style scoped>

</style>
