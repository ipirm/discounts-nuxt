<template>
    <div class="post-swiper">
        <div class="row swiper-title">
            <div class="col-12 swiper-col">
                <div class="swiper-controls-title">{{ $t('postSwiper.label')}}</div>
                <div class="swiper-controls">
                    <a class="swiper-controls-prev" @click="mySwiper.slidePrev()">
                        <svg-icon name="slider/prev" style="width: 50px;height: 34px"/>
                    </a>
                    <a class="swiper-controls-next" @click="mySwiper.slideNext()">
                        <svg-icon name="slider/next" style="width: 50px;height: 34px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-swiper:mySwiper="swiperOption" class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in slides" :key="item.id" style="display: flex">
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
        data() {
            return {
                swiperOption: {
                    spaceBetween: 16,
                    slidesPerView: 5,
                    observer: true,
                    observeParents: true
                }
            }
        }
    }
</script>
