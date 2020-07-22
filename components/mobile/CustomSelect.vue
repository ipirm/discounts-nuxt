<template>
  <div>
    <select @change="findPosts()" v-model="selected" v-if="type === 'company'">
      <option value="" disabled selected>{{ placeHolder }}</option>
      <option value="empty">Любое</option>
      <option v-for="item in data" :value="item" :key="item.id">{{ item.name}}</option>
    </select>
    <select @change="findPosts()" v-model="selected" v-else>
      <option value="" disabled selected>{{ placeHolder }}</option>
      <option value="empty">Любое</option>
      <option v-for="item in data" :value="item.name[$i18n.locale]" :key="item.id">{{ item.name[$i18n.locale]}}</option>
    </select>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: ['data', 'type', 'placeHolder'],
    name: 'CustomSelect',
    data() {
      return {
        selected: ''
      }
    },
    methods: {
      ...mapMutations('post', ['SET_PAGE']),
      findPosts() {
        this.$nuxt.$emit('open-contact-form');
        if (this.selected && this.selected !== 'empty') {
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
        if (this.selected === 'empty') {
          this.$nuxt.$emit('open-contact-form');
          this.SET_PAGE(1)
          let query = Object.assign({}, this.$route.query);
          delete query[this.type];
          this.$router.replace({query});
        }
      }
    },
  }
</script>

