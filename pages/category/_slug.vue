<template>
  <div class="index-page">
    <SearchPanel :catText="catPost" :isCatPage="true"/>
    <div class="container container-discounts" :style="{marginTop: 50 + 'px'}">
      <a @click="$router.go(-1)" class="post-back-button">
        <svg-icon name="navigation/prev" style="width: 26px;height: 30px"/>
        <span>{{$t('navigation.prev')}}</span>
      </a>
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
  import Spinner from "~/components/elements/Spinner";
  import CustomSelect from "~/components/mobile/CustomSelect";
  import NotFound from "~/components/elements/NotFound";
  import {APP_URI} from "~/config/types"

  export default {
    layout: 'nometa',

    head() {
      return {
        title: this.catPost.meta_title[this.$i18n.locale] || '',
        meta: [
          {hid: 'description', name: 'description', content: this.catPost.meta_description[this.$i18n.locale] || ''},
          {itemprop: "name", content: this.catPost.meta_title[this.$i18n.locale]},
          {itemprop: "description", content: this.catPost.meta_description[this.$i18n.locale]},
          {itemprop: "image", content: `${APP_URI}/images/seo-image.webp`},
          {property: "og:url", content: APP_URI},
          {property: "og:type", content: "website"},
          {property: "og:title", content: this.catPost.meta_title[this.$i18n.locale]},
          {property: "og:description", content: this.catPost.meta_description[this.$i18n.locale]},
          {property: "og:image", content: `${APP_URI}/images/seo-image.webp`},
        ],
      }
    },

    components: {NotFound, CustomSelect, Spinner, Card, SearchPanel},

    watchQuery(newQuery, oldQuery) {
      return newQuery && oldQuery
    },

    async fetch({store, route}) {
      await store.dispatch('category/getCat', route.params.slug).then( async ()=>{
      })
    },

    created() {
      this.$nuxt.$on('open-contact-form', () => {
        this.renderItemKey();
      })
      this.renderItemKey();
      this.$store.dispatch('post/getPosts', `/?cats=${this.catPost.id}`);
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
      ...mapState('post', ['posts', 'total', 'page', 'infinityRender']),
      ...mapState('category', ['catPost']),

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
      ...mapActions('post', ['getPosts']),
      ...mapMutations('post', ['SET_PAGE']),

      onResize() {
        if (!document.querySelector('.index-page')) {
          window.removeEventListener('resize', this.onResize, false);
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
          this.$store.dispatch('post/getPosts', `/?cats=${this.catPost.id}`).then(() => {
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


