<template>
  <div class="index-page">
    <div v-show="false">{{ $route.query.cats && !($route.query.company || $route.query.type) ? (cats.find(v => v.id == $route.query.cats) && cats.find(v => v.id == $route.query.cats).meta_description ? cats.find(v => v.id == $route.query.cats).meta_description[this.$i18n.locale] : '') : '' }}</div>
    <SearchPanel :cats="cats" :companies="companies" :typesPost="typesPost"/>
    <div class="navigation-search">
      <div class="navigation-search-bg" :style="{width: `${navigationSearchBgSize}px`, height: `${navigationSearchBgSize}px`,transform: `scale3d(${navigationSearchBgScale}, ${navigationSearchBgScale}, 1) translate3d(50%, 50%, 0)`}"></div>
      <div class="bottom-search-button" @click="openModal()"><svg-icon name="mobile/search" /></div>
      <div class="navigation-search-content" :class="{active: searchActive, visible: searchVisible}">
        <div class="navigation-search-header">
          <svg-icon name="mobile/backBtn" @click.stop="hideModal" class="search-go-back" />
          <span>{{$t('mainPage.filter')}}</span>
        </div>
        <div class="navigation-search-items">
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
      searchActive: false,
      searchVisible: false,
      searchBgActive: false,
      navigationSearchBgScale: 0,
      navigationSearchBgSize: 0
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
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

    onResize() {
      if (!document.querySelector('.index-page')) {
        window.removeEventListener('resize', this.onResize, false);
        console.log('what');
        return;
      }

      this.navigationSearchBgSize = (window.innerWidth + window.innerHeight + 30) * 2;
    },

    openModal(){
      this.navigationSearchBgScale = 1;
      setTimeout(() => {
        if (this.navigationSearchBgScale > 0) {
          this.searchActive = true;
          setTimeout(() => {
            this.searchVisible = true;
          }, 1);
        }
      }, 500);
    },

    hideModal(){
      this.searchVisible = false;
      setTimeout(() => {
        if (!this.searchVisible) {
          this.searchActive = false;
          this.navigationSearchBgScale = 0;
        }
      }, 500);
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

