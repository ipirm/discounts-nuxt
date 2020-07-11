<template>
    <div class="container-fluid swiper-fluid">
        <div class="row swiper-title">
            <div class="col-12 swiper-col">
                <div class="swiper-controls-title">{{ label.title }}</div>
                <div class="swiper-controls">
                    <a class="swiper-controls-prev" @click="mySwiper.slidePrev()">
                        <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#F8C563"/>
                        </svg>
                    </a>
                    <a class="swiper-controls-next" @click="mySwiper.slideNext()">
                        <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#F8C563"/>
                            <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#F8C563"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-swiper:mySwiper="swiperOption" class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" style="display: flex" v-for="item in slides" :key="item.index">
                            <nuxt-link :to="{name:'index', query:{cats: item.slug}}">
                                    <div class="category-element">
                                        <img :src="item.image_url"/>
                                    </div>
                                    <p>{{ item.name }}</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomSwiper",
        props: ['label','slides'],
        data(){
            return {
                swiperOption: {
                    spaceBetween: 16,
                    slidesPerView: 4,
                    observer: true,
                    observeParents: true
                }
            }
        }
    }
</script>

<style scoped>

</style>
