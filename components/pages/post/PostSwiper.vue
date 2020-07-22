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
        <div v-swiper:mySwiper="swiperOption" class="swiper-container" @transitionEnd="swiperChange"
             @ready="swiperInit">
          <div class="swiper-controls-mobile">
            <a class="swiper-controls-prev" @click="mySwiper.slidePrev()" v-if="currentSlide !==1">
              <svg-icon name="mobile/prev" style="width: 52px;height: 90px"/>
            </a>
            <a class="swiper-controls-next" @click="mySwiper.slideNext()"
               v-if="currentSlide !== slides.length">
              <svg-icon name="mobile/prev" style="width: 52px;height: 90px"/>
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
      swiperInit() {
        this.currentSlide = this.mySwiper.activeIndex + 1
      }
    }
  }
</script>
