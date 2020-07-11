<template>
    <div class="category-section">
        <div class="container-fluid swiper-fluid">
            <div class="row company-section-title">
                <div class="col-2">
                    Категории
                </div>
            </div>
        </div>
        <CustomSwiper v-for="(item,index) in catsGroup" :key="index" :slides="item" :label="labels[index-1]"  />
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CustomSwiper from "../../components/elements/CustomSwiper";
    export default {
        name: "index",
        components: {CustomSwiper},
        async fetch({store}) {
            await store.dispatch('category/getGroupCats')
        },
        computed: {
            ...mapState('category', ['catsGroup','labels']),
        }
    }
</script>

<style scoped>

</style>
