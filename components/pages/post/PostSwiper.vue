<template>
    <div class="post-swiper">
        <div class="row swiper-title">
            <div class="col-12 swiper-col">
                <div class="swiper-controls-title">{{ $t('postSwiper.label')}}</div>
                <div class="swiper-controls">
                    <a class="swiper-controls-prev" @click="mySwiper.slidePrev()" v-if="currentSlide !==1">
                        <svg-icon name="slider/prev" style="width: 50px;height: 34px"/>
                    </a>
                    <a class="swiper-controls-next" @click="mySwiper.slideNext()" v-if="currentSlide !== slides.length">
                        <svg-icon name="slider/next" style="width: 50px;height: 34px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-swiper:mySwiper="swiperOption" class="swiper-container" @transitionEnd="swiperChange" @ready="swiperInit">
                    <div class="swiper-controls-mobile">
                        <a class="swiper-controls-prev" @click="mySwiper.slidePrev()" v-if="currentSlide !==1">
                            <svg width="52" height="90" viewBox="0 0 52 124" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M62 124C53.858 124 45.7958 122.396 38.2736 119.281C30.7514 116.165 23.9166 111.598 18.1594 105.841C12.4021 100.083 7.83524 93.2485 4.71945 85.7264C1.60366 78.2042 -1.43651e-05 70.1419 -1.36533e-05 62C-1.29415e-05 53.858 1.60367 45.7958 4.71946 38.2736C7.83526 30.7514 12.4021 23.9166 18.1594 18.1594C23.9166 12.4021 30.7514 7.83525 38.2736 4.71946C45.7958 1.60367 53.8581 -7.11792e-07 62 0L62 62L62 124Z"
                                      fill="url(#paint0_linear)"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M37.8579 44.3223L53.7678 60.2322C54.7441 61.2085 54.7441 62.7915 53.7678 63.7678L37.8579 79.6777C36.8816 80.654 35.2987 80.654 34.3224 79.6777C33.3461 78.7013 33.3461 77.1184 34.3224 76.1421L45.9645 64.5L24.4834 64.5C23.1027 64.5 21.9834 63.3807 21.9834 62C21.9834 60.6193 23.1027 59.5 24.4834 59.5L45.9645 59.5L34.3224 47.8579C33.3461 46.8815 33.3461 45.2986 34.3224 44.3223C35.2987 43.346 36.8816 43.346 37.8579 44.3223Z"
                                      fill="white"/>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="62" y1="124" x2="62" y2="-5.42021e-06"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop offset="0.609926" stop-color="#F8C563"/>
                                        <stop offset="0.871161" stop-color="#FFD363"/>
                                    </linearGradient>
                                </defs>
                            </svg>

                        </a>
                        <a class="swiper-controls-next" @click="mySwiper.slideNext()"
                           v-if="currentSlide !== slides.length">
                            <svg width="52" height="90" viewBox="0 0 52 124" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M62 124C53.858 124 45.7958 122.396 38.2736 119.281C30.7514 116.165 23.9166 111.598 18.1594 105.841C12.4021 100.083 7.83524 93.2485 4.71945 85.7264C1.60366 78.2042 -1.43651e-05 70.1419 -1.36533e-05 62C-1.29415e-05 53.858 1.60367 45.7958 4.71946 38.2736C7.83526 30.7514 12.4021 23.9166 18.1594 18.1594C23.9166 12.4021 30.7514 7.83525 38.2736 4.71946C45.7958 1.60367 53.8581 -7.11792e-07 62 0L62 62L62 124Z"
                                      fill="url(#paint0_linear)"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M37.8579 44.3223L53.7678 60.2322C54.7441 61.2085 54.7441 62.7915 53.7678 63.7678L37.8579 79.6777C36.8816 80.654 35.2987 80.654 34.3224 79.6777C33.3461 78.7013 33.3461 77.1184 34.3224 76.1421L45.9645 64.5L24.4834 64.5C23.1027 64.5 21.9834 63.3807 21.9834 62C21.9834 60.6193 23.1027 59.5 24.4834 59.5L45.9645 59.5L34.3224 47.8579C33.3461 46.8815 33.3461 45.2986 34.3224 44.3223C35.2987 43.346 36.8816 43.346 37.8579 44.3223Z"
                                      fill="white"/>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="62" y1="124" x2="62" y2="-5.42021e-06"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop offset="0.609926" stop-color="#F8C563"/>
                                        <stop offset="0.871161" stop-color="#FFD363"/>
                                    </linearGradient>
                                </defs>
                            </svg>

                        </a>
                    </div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide post-swiper-slide"
                             v-for="item in slides"
                             :key="item.id"
                             style="display: flex"
                        >
                            <Card
                                    :post="item"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Card from "../../elements/Card";

    export default {
        name: 'PostSwiper',
        components: {Card},
        props: ['slides'],
        computed: {
            swiperOption() {
                if (process.client) {
                    let width = window.innerWidth;
                    let obg = {}
                    if (width <= 500) {
                        obg = {
                            spaceBetween: 0,
                            slidesPerView: 1,
                            observer: true,
                            observeParents: true
                        }
                    } else if (width >= 500 && width <= 1000) {
                        obg = {
                            spaceBetween: 16,
                            slidesPerView: 2,
                            observer: true,
                            observeParents: true
                        }
                    } else if (width >= 1000 && width <= 1400) {
                        obg = {
                            spaceBetween: 16,
                            slidesPerView: 4,
                            observer: true,
                            observeParents: true
                        }
                    } else {
                        obg = {
                            spaceBetween: 16,
                            slidesPerView: 5,
                            observer: true,
                            observeParents: true
                        }
                    }
                    return obg
                }
            }
        },
        data() {
            return {
                currentSlide: 0
            }
        },
        methods: {
            swiperChange() {
                this.currentSlide = this.mySwiper.activeIndex + 1
            },
            swiperInit(){
                this.currentSlide = this.mySwiper.activeIndex + 1
            }
        }
    }
</script>
