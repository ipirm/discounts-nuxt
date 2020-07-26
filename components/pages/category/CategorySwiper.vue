<template>
  <div class="container-fluid swiper-fluid">
    <div class="row swiper-title">
      <div class="col-12 swiper-col">
        <div class="swiper-controls-title">{{ label.title[$i18n.locale] }}</div>
        <div class="swiper-controls">
          <a class="swiper-controls-prev" @click="mySwiper.slidePrev()" v-if="currentSlide !==1">
            <svg-icon name="slider/prev" style="width: 50px;height: 34px"/>
          </a>
          <a class="swiper-controls-next" @click="mySwiper.slideNext()"
             v-if="currentSlide !== slides.length">
            <svg-icon name="slider/next" style="width: 50px;height: 34px"/>
          </a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-swiper">
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
            <div class="swiper-slide slide-width" style="display: flex" v-for="item in slides"
                 :key="item.index">
              <Clink :to="{name:'index', query:{cats: item.id}}">
                <div class="category-element">
                  <img :alt="item.name[$i18n.locale]" :src="item.image_url"/>
                </div>
                <p>{{ item.name[$i18n.locale] }}</p>
              </Clink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Clink from "../../elements/Link";

  export default {
    name: "CategorySwiper",
    components: {Clink},
    props: ['label', 'slides'],
    data() {
      return {
        currentSlide: 0
      }
    },
    computed: {
      swiperOption() {
        if (process.client) {
          let width = window.innerWidth;
          let obg = {}
          if (width <= 500) {
            obg = {
              spaceBetween: 16,
              slidesPerView: 1,
              observer: true,
              observeParents: true
            }
          } else if (width >= 500 && width <= 1200) {
            obg = {
              spaceBetween: 16,
              slidesPerView: 3,
              observer: true,
              observeParents: true
            }
          } else {
            obg = {
              spaceBetween: 16,
              slidesPerView: 4,
              observer: true,
              observeParents: true
            }
          }
          return obg
        }
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

<style scoped>

</style>
