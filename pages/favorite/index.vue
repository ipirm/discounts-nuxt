<template>
  <div>
    <div class="overlaySearch" style="height: 200px">
      <div class="overlay-search">
        <div class="overlay-search-title">
          <h1 style="font-size:23px;margin-right: 6px">{{$t('savedPage.title')}}</h1>
          <h2 style="font-size:23px">{{ $t('searchPanel.subtitle') }}</h2>
        </div>
      </div>
    </div>
    <div class="container" :style="{marginTop: 50 + 'px'}">
      <div class="row" :style="{margin: 'auto',justifyContent: 'center'}">
        <Card
          v-if="postSaved"
          v-for="(item, index) in postSaved"
          :key="index"
          :post="item"
        />
      </div>
    </div>
    <client-only  v-if="postSaved.length">
      <infinite-loading ref="InfiniteLoading" @infinite="infiniteScroll" >
        <div slot="spinner">
          <Spinner/>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
    <NotFound :text="$t('notFound.saved')" v-else />
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import Card from "~/components/elements/Card";
  import Spinner from "~/components/elements/Spinner";
  import NotFound from "../../components/elements/NotFound";


  export default {

    components: {NotFound, Spinner, Card},
    created() {
      if (this.$cookies.get('savedItems')) {
        if (String(this.$cookies.get('savedItems')).includes('a')) {
          let items = this.$cookies.get('savedItems').split('a')
          this.getSaved(items);
        }
      }
    },
    methods: {
      ...mapActions('post', ['getSaved']),
      infiniteScroll($state) {
        $state.complete()
      },
    },
    computed: {
      ...mapState('post', ['postSaved']),
    }
  }
</script>

