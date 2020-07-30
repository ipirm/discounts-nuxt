<template>
  <div>
    <!--        <Spinner v-show="!pageReady"/>-->
    <!--        <div v-show="pageReady">-->
    <Logo v-show="!pageReady"/>
    <Header v-show="pageReady"/>
    <nuxt v-show="pageReady"/>
    <Footer v-show="pageReady"/>
  </div>
</template>

<script>
  import Logo from "../components/elements/Logo";
  import Spinner from "../components/elements/Spinner";
  import Footer from "../components/includes/Footer";
  import Header from "../components/includes/Header";
  import {mapMutations, mapState} from 'vuex'

  export default {
    components: {Logo, Spinner, Footer, Header},
    name: "nometa",
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

</style>
