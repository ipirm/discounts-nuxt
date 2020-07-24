<template>
    <div class="company-section">
        <div class="container-fluid swiper-fluid">
            <div class="row company-section-title">
                <div class="col-12 swiper-col">{{ $t('menu.company') }}</div>
            </div>
            <div class="company-section-letters">
                <a
                        v-for="item in letters"
                        :key="item.name"
                        v-scroll-to="{ el: `#${item.name}`, offset: -400}"
                        @click="selectLetter(item)"
                        :class="[item.active ? 'active-letter' : '', 'letters-items']"
                >
                    {{ item.name }}
                </a>
            </div>
            <div class="company-section-items" id="company-container">
                <div class="company-section-item" v-for="(value,key) in companyLetters" :key="key" :id="key" :class="[value.length > 15 ? 'big-section' : '','company-section-item']">
                    <div class="company-section-item-right">
                        <span :class="[letters.find(i => i.active === true && i.name.toLowerCase() === key.toLowerCase()) ? 'active-letter' : '', 'letters-items']">
                            {{ key}}
                        </span>
                    </div>
                    <div class="company-section-item-elements">
                        <Clink class="company-section-item-left" v-for="item in value" :key="item.id"
                               :to="{name:'company-slug', params:{slug: item.slug}}">
                            {{item.name }}
                        </Clink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Clink from "../../components/elements/Link";

    export default {
        name: "Company",
        components: {Clink},
        async fetch({store}) {
            await store.dispatch('company/getCompanyByLetter');
        },
        methods: {
            ...mapMutations('company', ['SET_COMPANY_ACTIVE_LETTERS']),
            selectLetter(item) {
                this.SET_COMPANY_ACTIVE_LETTERS(item.name)
            }
        },
        computed: {
            ...mapState('company', ['letters', 'companyLetters'])
        }
    }
</script>

<style scoped>

</style>
