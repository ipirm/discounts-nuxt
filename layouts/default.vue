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
  import {APP_URI} from "../config/types"
 import {mapMutations,mapState} from 'vuex'

  export default {
    components: {Logo, Spinner, Footer, Header},
    head() {
      return {
        title: `${this.$t('meta.title')}` || '',
        meta: [
          {hid: 'description', name: 'description', content: `${this.$t('meta.description')}` || ''},
          {itemprop: "name", content: `${this.$t('meta.title')}` || ''},
          {itemprop: "description", content: `${this.$t('meta.description')}` || ''},
          {itemprop: "image", content: `${APP_URI}/images/banner.png`},
          {property: "og:url", content: APP_URI},
          {property: "og:type", content: "website"},
          {property: "og:title", content: `${this.$t('meta.title')}` || ''},
          {property: "og:description", content: `${this.$t('meta.description')}` || ''},
          {property: "og:image", content: `${APP_URI}/images/banner.png`},
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
