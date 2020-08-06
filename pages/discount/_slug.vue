<template>
  <div class="company-section post-page-image">
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
                <div class="post-title" style="margin-bottom: 10px">
                  <h1>{{ postActive.title[$i18n.locale]}}</h1>
                  <a class="save-button" @click="saveToFavorite">
                    <svg :class="[saved ? 'heart-icon-active' : '']" height="480pt" viewBox="0 -20 480 480"
                         width="480pt" xmlns="http://www.w3.org/2000/svg">
                      <path class="heart-icon"
                            d="m348 8c-44.773438.003906-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.195313-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0"
                            fill="#ff6243"/>
                      <path class="border-icon"
                            d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"
                            fill="#3e3d42"/>
                    </svg>
                  </a>
                </div>
                <div class="post-tags">
                  <clink :to="{name:'index', query:{cats: postActive.pcat.id}}"
                         class="post-tags-item"><span>{{ postActive.pcat.name[$i18n.locale] }}</span>
                  </clink>
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
                <div class="post-information" v-for="item in activePostCompany.address.slice(0,1)"
                     :key="item.id">
                  <p>{{ $t('companyInformation.address') }}</p>
                  <span>{{ item.address}}</span>
                  <div class="post-information-time">{{ $t('companyInformation.time') }}
                    {{ item.time}}
                  </div>
                </div>
                <clink class="hide-props" :to="`/company/${activePostCompany.slug}`">{{$t('companyPage.showAll')}}
                </clink>
              </div>
              <div>
                <img class="post-image" :alt="postActive.title[$i18n.locale]" :src="postActive.image_url"/>
                <client-only>
                  <div class="overlay-social">
                    <p class="overlay-social-text">{{$t('meta.share') }}</p>
                    <facebook :url="urlSocial" scale="1"/>
                    <twitter :url="urlSocial" :title="postActive.title[$i18n.locale]" scale="1"/>
                    <linkedin :url="urlSocial" scale="1"/>
                    <telegram :url="urlSocial" scale="1"/>
                    <whats-app :url="urlSocial" :title="postActive.title[$i18n.locale]" scale="1"/>
                  </div>
                </client-only>
              </div>
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
  import {API_URI, APP_URI} from "../../config/types";

  export default {
    layout: 'nometa',
    components: {PostSwiper, Clink},
    async fetch({store, route}) {
      await store.dispatch('post/getActivePost', route.params.slug).then(async () => {
        await store.dispatch('category/getSameCats', route.params.slug)
      })

    },
    data() {
      return {
        saved: false,
        urlSocial: `${APP_URI}${this.$route.fullPath}`
      }
    },
    created() {
      if (this.$cookies.get('savedItems')) {
        if (String(this.$cookies.get('savedItems')).includes('a')) {
          let items = this.$cookies.get('savedItems').split('a')
          if (items.find(i => parseInt(i) === parseInt(this.postActive.id))) {
            this.saved = !this.saved
          }
        }
      }
      this.SET_PAGE(1)
    },
    head() {
      return {
        title: this.postActive.title[this.$i18n.locale],
        meta: [
          {property: 'og:title', content: this.postActive.title[this.$i18n.locale] || ''},
          {property: 'og:description', content: this.postActive.description[this.$i18n.locale] || ''},
          {property: 'og:image', content: this.postActive.image_url || ''},
          {property: 'og:url', content: `${APP_URI}${this.$route.fullPath}` || ''},
          {property: "og:type", content: "website"},
          {itemprop: "name", content: this.postActive.title[this.$i18n.locale] || ''},
          {itemprop: "description", content: this.postActive.description[this.$i18n.locale] || ''},
          {itemprop: "image", content: this.postActive.image_url || ''},
          {name: 'description', content: this.postActive.description[this.$i18n.locale] || ''},
          {name: 'keywords', content: `${this.$t('keywords')}` || ''},
          {property: 'twitter:card', content: this.postActive.image_url || ''},
        ]
      }
    },
    methods: {
      ...mapMutations('post', ['SET_PAGE']),
      nextRouterHandler() {
        if (this.activeCat.length !== null) {
          let postIndex = this.activeCat.findIndex(i => i.id === this.postActive.id)
          if (postIndex + 1 !== this.activeCat.length) {
            this.$router.push(`/discount/${this.activeCat[postIndex + 1].slug ? this.activeCat[postIndex + 1].slug[this.$i18n.locale] : '/'}`)
          } else {
            postIndex = 0;
            this.$router.push(`/discount/${this.activeCat[postIndex].slug ? this.activeCat[postIndex].slug[this.$i18n.locale] : '/'}`)
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
      ...mapState('post', ['postActive', 'activePostCompany']),
      ...mapState('category', ['activeCat']),
    }
  }
</script>

<style scoped>

</style>
