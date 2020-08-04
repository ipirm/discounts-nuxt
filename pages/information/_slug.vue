<template>
  <section class="about">
    <div class="overlaySearch overlayAbout">
      <div class="overlay-search">
        <h1 class="overlay-search-title" v-html="page.title[$i18n.locale]">
        </h1>
        <div class="overlay-search-subtitle">
          <h2>{{ page.subtitle[$i18n.locale]}}</h2>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-6">
          <div class="container-information">
            <div v-for="item in page.content" :key="item.id">
              <div class="about-country" v-if="item.bordered === '0'">{{ item.quoto[$i18n.locale]}}</div>
              <div class="about-title" v-if="item.bordered === '0'">{{ item.title[$i18n.locale]}}</div>
              <div class="about-content" v-if="item.bordered === '0'" v-html="item.text[$i18n.locale]"></div>
              <div class="about-mision" v-else>
                <div class="about-mision-content">
                  <p>{{ item.title[$i18n.locale]}}</p>
                  <div v-html="item.text[$i18n.locale]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2">
          <ContactForm/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import ContactForm from "../../components/elements/ContactForm";
  import {APP_URI} from "../../config/types";

  export default {
    layout: 'nometa',
    components: {ContactForm},

    async fetch({store, route}) {
      await store.dispatch('pages/getPageBySlug', route.params.slug)
    },
    head() {
      return {
        title: this.page.content[0].title[this.$i18n.locale],
        meta: [
          {property: 'og:title', content: this.page.content[0].title[this.$i18n.locale] || ''},
          {property: 'og:description', content: this.page.subtitle[this.$i18n.locale] || ''},
          {name: 'description', content:  this.page.subtitle[this.$i18n.locale]  || ''},
          {property: 'og:image', content: '/images/seo-image.webp'},
          {property: 'og:url', content: `${APP_URI}${this.$route.fullPath}` || ''},
          {property: "og:type", content: "website"},
          {name: 'keywords', content: `${this.$t('keywords')}` || ''},
          {property: 'twitter:card', content: '/images/seo-image.webp'},
          {itemprop: "name", content: this.page.content[0].title[this.$i18n.locale] || ''},
          {itemprop: "description", content: this.page.subtitle[this.$i18n.locale] || ''},
          {itemprop: "image", content: '/images/seo-image.webp'},
        ]
      }
    },
    computed: {
      ...mapState('pages', ['page']),
    },
  }
</script>

<style scoped>

</style>
