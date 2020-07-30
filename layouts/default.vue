<template>
  <div>
    <!--        <Spinner v-show="!pageReady"/>-->
    <!--        <div v-show="pageReady">-->
    <Logo v-show="!pageReady" />
    <Header v-show="pageReady" />
    <nuxt v-show="pageReady" />
    <Footer v-show="pageReady" />
  </div>
</template>
<script>
  import Header from "../components/includes/Header";
  import Footer from "../components/includes/Footer";
  import Spinner from "../components/elements/Spinner";
  import Logo from "../components/elements/Logo";
 import {mapMutations,mapState} from 'vuex'

  export default {
    components: {Logo, Spinner, Footer, Header},
    head() {
      return {
        title: `${this.$t('meta.title')}` || '',
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          {hid: 'description', name: 'description', content: `${this.$t('meta.description')}` || ''},
          {itemprop: "name", content: `${this.$t('meta.title')}` || ''},
          {itemprop: "description", content: `${this.$t('meta.description')}` || ''},
          {itemprop: "image", content: '/images/seo-image.jpg'},
          {property: "og:url", content: "https://discount-nuxt.herokuapp.com"},
          {property: "og:type", content: "website"},
          {property: "og:title", content: `${this.$t('meta.title')}` || ''},
          {property: "og:description", content: `${this.$t('meta.description')}` || ''},
          {property: "og:image", content: '/images/seo-image.jpg'},
        ],
      }
    },
    methods: {
      ...mapMutations('mail', ['SET_PAGE_READY']),
    },
    mounted() {
      if (process.browser) {
        window.onNuxtReady((app) => {
          this.SET_PAGE_READY();
          document.body.style.marginTop = 40 + "px"
        })
      }
    },
    computed: {
      ...mapState('mail', ['pageReady']),
    }
  }
</script>
<style scoped>
  .page-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
