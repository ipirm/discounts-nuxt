<template>
    <div class="category-section category-margin">
        <div class="container-fluid swiper-fluid">
            <div class="row company-section-title">
                <div class="col-2">
                    {{ $t('menu.category') }}
                </div>
            </div>
        </div>
        <CategorySwiper
                v-if="labels && catsGroup"
                v-for="(item,key) in catsGroup"
                :key="key"
                :slides="item"
                :label="labels.find(i => parseInt(key) === parseInt(i.id))"
        />
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import CategorySwiper from "../../components/pages/category/CategorySwiper";

    export default {

        components: {CategorySwiper},
        created(){
            this.SET_PAGE(1)
        },
        async fetch({store}) {
            await store.dispatch('category/getGroupCats')
        },
        methods:{
            ...mapMutations('post', ['SET_PAGE']),
        },
        computed: {
            ...mapState('category', ['catsGroup','labels']),
        }
    }
</script>

<style scoped>

</style>
