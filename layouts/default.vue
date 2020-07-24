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

  export default {
    components: {Logo, Spinner, Footer, Header},
    data() {
      return {
        pageReady: false
      }
    },

    mounted() {
      if (process.browser) {
        window.onNuxtReady((app) => {
          this.pageReady = !this.pageReady;
        })
      }
    },
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
