<template>
    <div class="company-section company-page">
        <div class="container-fluid swiper-fluid">
            <div class="row" :style="{justifyContent: 'space-between', alignItems: 'center'}">
                <div class="col-auto">
                    <a class="post-back-button"  @click="$router.go(-1)">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path
                                        d="M18.1212 10.884H8.57944V6.31567C8.57512 5.93723 8.30579 5.63451 7.9778 5.6395C7.81517 5.64194 7.66058 5.72125 7.55001 5.85888L0.185813 14.5387C-0.0328183 14.7483 -0.062828 15.1227 0.118746 15.375C0.13898 15.403 0.161411 15.429 0.185813 15.4524L7.55001 24.1322C7.66376 24.271 7.82002 24.3531 7.98553 24.3606H8.22311C8.44917 24.234 8.58898 23.9651 8.57944 23.6753V19.5638H18.1212C18.5199 19.4858 18.8263 19.1137 18.8734 18.6502V11.3408C18.8734 10.9754 18.4775 10.884 18.1212 10.884Z"
                                        fill="#F8C563"/>
                                <path
                                        d="M20.6554 10.6555C20.3274 10.6555 20.0615 10.9624 20.0615 11.3408V18.6502C20.0615 19.0286 20.3274 19.3355 20.6554 19.3355C20.9834 19.3355 21.2493 19.0286 21.2493 18.6502V11.3408C21.2493 10.9624 20.9835 10.6555 20.6554 10.6555Z"
                                        fill="#F8C563"/>
                                <path
                                        d="M23.0304 10.6555C22.7024 10.6555 22.4365 10.9624 22.4365 11.3408V18.6502C22.4365 19.0286 22.7024 19.3355 23.0304 19.3355C23.3584 19.3355 23.6243 19.0286 23.6243 18.6502V11.3408C23.6243 10.9624 23.3584 10.6555 23.0304 10.6555Z"
                                        fill="#F8C563"/>
                                <path
                                        d="M25.4064 10.6555C25.0784 10.6555 24.8125 10.9624 24.8125 11.3408V18.6502C24.8125 19.0286 25.0784 19.3355 25.4064 19.3355C25.7344 19.3355 26.0003 19.0286 26.0003 18.6502V11.3408C26.0003 10.9624 25.7344 10.6555 25.4064 10.6555Z"
                                        fill="#F8C563"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="30" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Назад</span>
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
                                    <p>Адреса магазинов:</p>
                                    <span>{{activeCompany.address}}</span>
                                    <div class="post-information-time">Часы работы: {{activeCompany.time}}</div>
                                </div>
                                <div class="post-information">
                                    <p>Телефоны:</p>
                                    <div class="post-information-time">{{activeCompany.number}}</div>
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
