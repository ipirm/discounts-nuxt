<template>
  <div>
    <div v-show="false">{{ $route.query.cats && !($route.query.company || $route.query.type) ? (cats.find(v => v.id == $route.query.cats) && cats.find(v => v.id == $route.query.cats).meta_description ? cats.find(v => v.id == $route.query.cats).meta_description[this.$i18n.locale] : '') : '' }}</div>
    <SearchPanel :cats="cats" :companies="companies" :typesPost="typesPost"/>
    <div  :class="[activeSearch ? 'navigation-search-active' : '' ,'navigation-search']"
         @click="openModal()">
      <svg-icon name="mobile/search" v-if="!activeSearch" class="bottom-search-button" />
      <div class="navigation-search-header" v-if="activeSearch">
      <svg-icon name="mobile/backBtn" style="width: 19px;height: 21px" @click.stop="hideModal"  />
        <span>{{$t('mainPage.filter')}}</span>
      </div>
      <div v-if="activeSearch" class="navigation-search-items">
        <div class="navigation-search-selectedItems">{{$t('mainPage.live')}} <span style="margin-left: 3px">{{$t('mainPage.search')}}</span></div>
        <div class="navigation-search-item">
          <CustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
          <CustomSelect :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
          <CustomSelect :data="typesPost" type="type" :placeHolder="$t('searchPanel.selectType')" />
        </div>
        <a @click.stop="hideModal" class="navigation-search-btn">
          <span>{{$t('mainPage.startSearch')}}</span>
        </a>
      </div>
    </div>
    <div class="container container-discounts" :style="{marginTop: 50 + 'px'}">
      <div class="row post-row" :style="{margin: 'auto'}">
        <Card
          v-if="posts"
          v-for="(item, index) in posts"
          :key="index"
          :post="item"
        />
      </div>
    </div>
    <client-only v-if="posts.length">
      <infinite-loading ref="InfiniteLoading" @infinite="infiniteScroll" :key="infinityItem">
        <div slot="spinner">
          <Spinner/>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
    <NotFound :text="$t('notFound.posts')"  v-else />
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import SearchPanel from "~/components/pages/index/SearchPanel";
import Card from "~/components/elements/Card";
import Spinner from "../components/elements/Spinner";
import CustomSelect from "../components/mobile/CustomSelect";
import NotFound from "../components/elements/NotFound";
import {APP_URI} from "../config/types"

export default {
  layout: 'nometa',

  head() {
    return {
      title: `${this.$t('meta.title')}` || '',
      meta: [
        {hid: 'description', name: 'description', content: this.$route.query.cats && !(this.$route.query.company || this.$route.query.type) ? (this.cats.find(v => v.id == this.$route.query.cats) && this.cats.find(v => v.id == this.$route.query.cats).meta_description ? this.cats.find(v => v.id == this.$route.query.cats).meta_description[this.$i18n.locale] : '') : '' },
        {itemprop: "name", content: this.$route.query.cats && !(this.$route.query.company || this.$route.query.type) ? (this.cats.find(v => v.id == this.$route.query.cats) && this.cats.find(v => v.id == this.$route.query.cats).meta_title ? this.cats.find(v => v.id == this.$route.query.cats).meta_title[this.$i18n.locale] : '') : ''},
        {itemprop: "description", content: this.$route.query.cats && !(this.$route.query.company || this.$route.query.type) ? (this.cats.find(v => v.id == this.$route.query.cats) && this.cats.find(v => v.id == this.$route.query.cats).meta_description ? this.cats.find(v => v.id == this.$route.query.cats).meta_description[this.$i18n.locale] : '') : ''},
        {itemprop: "image", content: `${APP_URI}/images/seo-image.webp`},
        {property: "og:url", content: APP_URI},
        {property: "og:type", content: "website"},
        {property: "og:title", content: this.$route.query.cats && !(this.$route.query.company || this.$route.query.type) ? (this.cats.find(v => v.id == this.$route.query.cats) && this.cats.find(v => v.id == this.$route.query.cats).meta_title ? this.cats.find(v => v.id == this.$route.query.cats).meta_title[this.$i18n.locale] : '') : ''},
        {property: "og:description", content: this.$route.query.cats && !(this.$route.query.company || this.$route.query.type) ? (this.cats.find(v => v.id == this.$route.query.cats) && this.cats.find(v => v.id == this.$route.query.cats).meta_description ? this.cats.find(v => v.id == this.$route.query.cats).meta_description[this.$i18n.locale] : '') : ''},
        {property: "og:image", content: `${APP_URI}/images/seo-image.webp`},
      ],
    }
  },

  components: {NotFound, CustomSelect, Spinner, Card, SearchPanel},
  
  watchQuery(newQuery, oldQuery) {
    return newQuery && oldQuery
  },

  async fetch({store, route}) {
    await store.dispatch('post/getPosts', route.fullPath).then(async () => {
      await store.dispatch('company/getCompanies');
      await store.dispatch('category/getCats');
      await store.dispatch('post/getPostsType');
    });
  },

  created() {
    this.$nuxt.$on('open-contact-form', () => {
      this.renderItemKey();
    })
    this.renderItemKey();
  },

  data() {
    return {
      infinityItem: 0,
      activeSearch: false
    }
  },

  computed: {
    ...mapState('company', ['companies']),
    ...mapState('category', ['cats', 'activeCat']),
    ...mapState('post', ['posts', 'total', 'page', 'infinityRender', 'typesPost']),

    mobile() {
      let mobile = false
      if (process.client) {
        let width = window.innerWidth;
        if (width < 500) {
          mobile = true
        }
      }
      return mobile
    }
  },

  methods: {
    ...mapActions('company', ['getCompanies']),
    ...mapActions('category', ['getCats']),
    ...mapActions('post', ['getPosts']),
    ...mapMutations('post', ['SET_PAGE']),

    openModal(){
      this.activeSearch = true;
    },

    hideModal(){
      this.activeSearch = false;
    },

    infiniteScroll($state) {
      if (this.posts.length < parseInt(this.total)) {
        this.SET_PAGE(this.page + 1)
        this.getPosts(this.$route.fullPath).then(() => {
          $state.loaded()
        })
      } else {
        $state.complete()
      }
    },

    renderItemKey() {
      this.infinityItem = this.infinityItem + 1
    }
  }
}
</script>

