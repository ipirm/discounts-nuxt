<template>
  <div class="overlay-search-select-wrapper">
    <client-only>
      <div
        class="overlay-search-select cat-select"
        style="border-top-left-radius: 3px;border-bottom-left-radius: 3px"
        v-if="type === 'cats' && data"
        @click="handleClick(1)"
      >
        <div class="overlay-search-label"><span>{{ $t('menu.category') }}</span></div>
        <v-select
          class="basic-single select1"
          :placeholder="placeHolder"
          defaultValue="10"
          instanceId="1"
          inputId="1"
          :clearable="true"
          v-model="selected"
          label="name"
          :options="options"
          @input="findPosts"
        />
      </div>
      <div class="overlay-search-select cat-select" v-if="type === 'company' && data" @click="handleClick(2)">
        <div class="overlay-search-label"><span>{{ $t('menu.company') }}</span></div>
        <v-select
          class="basic-single select2"
          :placeholder="placeHolder"
          defaultValue="10"
          instanceId="2"
          inputId="2"
          :clearable="true"
          v-model="selected"
          :options="data"
          label="name"
          @input="findPosts"
        />
      </div>
      <div
        class="overlay-search-select"
        v-if="type === 'type' && data"
        @click="handleClick(3)"
      >
        <div class="overlay-search-label"><span>{{$t('searchPanel.selectType')}}</span></div>
        <v-select
          class="basic-single select3"
          :placeholder="placeHolder"
          defaultValue="10"
          instanceId="3"
          inputId="3"
          :clearable="true"
          v-model="selected"
          :options="options"
          label="name"
          @input="findPosts"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: ['data', 'type', 'placeHolder'],
    name: 'CustomSelect',
    data() {
      return {
        selected: '',
        click: true
      }
    },
    methods: {
      ...mapMutations('post', ['SET_PAGE']),
      handleClick(id) {
        if (this.click) {
          this.click = false;
          setTimeout(() => {
            document.querySelector(`.overlay-search-select-wrapper .select${id} input`).focus();
            this.click = true;
          }, 1)
        }
      },
      findPosts() {
        this.$nuxt.$emit('open-contact-form');
        if (this.selected) {
          this.$store.commit('post/SET_INFINITY_RENDER')
          this.SET_PAGE(1)
          if (this.type === 'cats' || this.type === 'type') {
            let url = this.data.find((i) => i.name[this.$i18n.locale] === this.selected);
            this.$router.push({
              path: this.$route.path,
              query: {...this.$route.query, ...{[this.type]: url.id}}
            })
          } else {
            this.$store.commit('post/SET_INFINITY_RENDER')
            this.SET_PAGE(1)
            this.$router.push({
              path: this.$route.path,
              query: {...this.$route.query, ...{[this.type]: this.selected.id}}
            })
          }
        }
      }
    },
    mounted() {
      if (this.$route.query[this.type] && this.type !== 'company') {
        let url = this.data.find((i) => i.id === parseInt(this.$route.query[this.type]));
        if (url)
          this.selected = url.name[this.$i18n.locale]
      } else {
        this.selected = this.data.find(i => parseInt(i.id) === parseInt(this.$route.query[this.type]))
      }
    },
    watch: {
      selected() {
        if (this.selected === null) {
          this.$nuxt.$emit('open-contact-form');
          this.SET_PAGE(1)
          let query = Object.assign({}, this.$route.query);
          delete query[this.type];
          this.$router.replace({query});
        }
      }
    },
    computed: {
      options() {
        let arrayOptions = []
        if (this.data && this.type !== 'company') {
          arrayOptions = this.data.map((item) => {
            return item.name[this.$i18n.locale]
          })
        }
        return arrayOptions
      }
    }
  }
</script>

