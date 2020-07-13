<template>
    <div class="company-section company-page">
        <div class="container-fluid swiper-fluid">
            <div class="row" :style="{justifyContent: 'space-between', alignItems: 'center'}">
                <div class="col-auto">
                    <a class="post-back-button"  @click="$router.go(-1)">
                        <svg-icon name="navigation/prev" style="width: 26px;height: 30px"/>
                        <span>{{ $t('navigation.prev') }}</span>
                    </a>
                </div>
            </div>
            <div class="container post-container">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex">
                            <div class="post-text">
                                <div class="post-title"><span>{{ activeCompany.name }}</span></div>
                                <div class="post-description">
                                    {{activeCompany.text}}
                                </div>
                                <div class="post-information">
                                    <p>{{ $t('companyInformation.address') }}</p>
                                    <div v-for="item in activeCompany.address" :key="item.id">
                                    <span>{{item.address}}</span>
                                    <div class="post-information-time">{{ $t('companyInformation.time') }} {{item.time}}</div>
                                    </div>
                                </div>
                                <div class="post-information">
                                    <p>{{ $t('companyInformation.number') }}</p>
                                    <div class="post-information-time" v-for="item in activeCompany.numbers" :key="item.id">{{item.number}}</div>
                                </div>
                            </div>
                            <img class="post-image" :src="activeCompany.image_url"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        async fetch({store,route}) {
            await store.dispatch('company/getCompany',route.params.slug)
        },
        computed: {
            ...mapState('company', ['activeCompany']),
        }
    }
</script>

<style scoped>

</style>
