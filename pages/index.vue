<template>
  <div>
    <SearchPanel :cats="cats" :companies="companies" :typesPost="typesPost"/>
    <div v-if="mobile" :class="[activeSearch ? 'navigation-search-active' : '' ,'navigation-search']"
         @click="activeSearch = true">
      <svg-icon name="mobile/prev" style="width: 52px;height: 90px" v-if="!activeSearch" />
      <svg-icon name="mobile/next" style="width: 52px;height: 90px" @click.stop="activeSearch = false" v-if="activeSearch" />
      <div v-if="activeSearch" class="navigation-search-items">
        <div class="navigation-search-item">
          <CustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
          <CustomSelect :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
          <CustomSelect :data="typesPost" type="type" :placeHolder="$t('searchPanel.selectType')" />
        </div>
      </div>
    </div>
    <div class="container" :style="{marginTop: 50 + 'px'}">
      <div class="row post-row" :style="{margin: 'auto'}">
        <Card
          v-if="posts"
          v-for="(item, index) in posts"
          :key="index"
          :post="item"
        />
      </div>
    </div>
    <client-only>
      <infinite-loading ref="InfiniteLoading" @infinite="infiniteScroll" :key="infinityItem">
        <div slot="spinner">
          <Spinner/>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>

  import {mapState, mapActions, mapMutations} from 'vuex'
  import SearchPanel from "~/components/pages/index/SearchPanel";
  import Card from "~/components/elements/Card";
  import Spinner from "../components/elements/Spinner";
  import CustomSelect from "../components/mobile/CustomSelect";


  export default {

    components: {CustomSelect, Spinner, Card, SearchPanel},
    async fetch({store, route}) {

      await store.dispatch('post/getPosts', route.fullPath).then(async () => {
        await store.dispatch('company/getCompanies');
        await store.dispatch('category/getCats');
        await store.dispatch('post/getPostsType');
      });
    },
    created() {
      this.renderItemKey();
    },
    data() {
      return {
        infinityItem: 0,
        activeSearch: false
      }
    },
    methods: {
      ...mapActions('company', ['getCompanies']),
      ...mapActions('category', ['getCats']),
      ...mapActions('post', ['getPosts']),
      ...mapMutations('post', ['SET_PAGE']),
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
    },
    watchQuery(newQuery, oldQuery) {
      this.renderItemKey();
      return newQuery && oldQuery
    },

    computed: {
      ...mapState('company', ['companies']),
      ...mapState('category', ['cats']),
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
      }
  }
</script>

