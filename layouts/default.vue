<template>
    <div>
        <Spinner v-show="!pageReady"/>
        <div v-show="pageReady">
            <Header/>
            <nuxt/>
            <Footer/>
        </div>
    </div>
</template>
<script>
    import Header from "../components/includes/Header";
    import Footer from "../components/includes/Footer";
    import Spinner from "../components/elements/Spinner";

    export default {
        components: {Spinner, Footer, Header},
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
