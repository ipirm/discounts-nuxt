<template>
  <section class="about">
    <div class="overlaySearch overlayAbout">
      <div class="overlay-search">
        <div class="overlay-search-title" v-html="page.title[$i18n.locale]">
        </div>
        <div class="overlay-search-subtitle">
          <span>{{ page.subtitle[$i18n.locale]}}</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
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
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    async fetch({store, route}) {
      await store.dispatch('pages/getPageBySlug', route.params.slug)
    },
    computed: {
      ...mapState('pages', ['page']),
    }
  }
</script>

<style scoped>

</style>
