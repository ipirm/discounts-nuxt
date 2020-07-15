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
            <div class="container post-container company-container">
                <div class="row">
                    <div class="col-12">
                        <div class="post-title"><span>{{ activeCompany.name }}</span></div>
                        <div class="d-flex">
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
                                            <div style="width: 20px;height: 20px;background-color: #F8C563;border-radius: 50%"></div>
                                        </gmap-custom-marker>
                                    </GmapMap>
                                </client-only>
                            </div>
                            <div class="post-text">
                                <div class="post-information-tabs">
                                    <a :class="[activeTab === 1 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(1)"><span>Телефоны</span></a>
                                    <a :class="[activeTab === 2 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(2)"><span>Адреса</span></a>
                                    <a :class="[activeTab === 3 ? 'post-information-tabs-active' : '', 'post-information-tabs-btn']"
                                       @click="changeTab(3)"><span>На карте</span></a>
                                </div>
                                <div class="post-information" v-show="activeTab === 2">
                                    <p style="margin-bottom: 10px">{{ $t('companyInformation.address') }}</p>
                                    <div v-for="item in activeCompany.address" :key="item.id"
                                         style="margin-bottom: 10px">
                                        <span>{{item.address}}</span>
                                        <div class="post-information-time">{{ $t('companyInformation.time') }}
                                            {{item.time}}
                                        </div>
                                    </div>
                                </div>
                                <div class="post-information" v-show="activeTab === 1">
                                    <p style="margin-bottom: 10px">{{ $t('companyInformation.number') }}</p>
                                    <div class="post-information-time" v-for="item in activeCompany.numbers"
                                         :key="item.id">{{item.number}}
                                    </div>
                                </div>
                                <div class="post-information" v-show="activeTab === 3">
                                    <div class="post-information-time">
                                        Я карта карта
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PostSwiper v-if="companiesSame.length" :slides="companiesSame" />
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
            await store.dispatch('company/getCompany', route.params.slug).then( async ()=>{
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
                activeTab: 1
            }
        },
        methods: {
            changeTab(item) {
                this.activeTab = item
            }
        },
        computed: {
            ...mapState('company', ['activeCompany','companiesSame']),
        }
    }
</script>

<style scoped>

</style>
