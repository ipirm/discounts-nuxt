<template>
    <div class="overlayHeader">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ul :class="[isActive ? 'is-active-menu' : '' ,'header-menu']" v-if="mobile">
                        <li>
                            <a href="javascript:void(0)" @click="linkToPage('index')">{{ $t('menu.main') }}</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" @click="linkToPage('category')">{{ $t('menu.category') }}</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" @click="linkToPage('company')">{{ $t('menu.company') }}</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" @click="linkToPage('favorite')">{{ $t('menu.popular') }}</a>
                        </li>
                    </ul>
                    <ul class="header-menu" v-else>
                        <li>
                            <Clink :to="{name:'index'}">{{ $t('menu.main') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'category'}">{{ $t('menu.category') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'company'}">{{ $t('menu.company') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'favorite'}">{{ $t('menu.popular') }}</Clink>
                        </li>
                    </ul>
                    <div class="header-locales">
                        <nuxt-link :to="switchLocalePath('az')">AZ</nuxt-link>
                        <nuxt-link :to="switchLocalePath('ru')">RU</nuxt-link>
                    </div>
                    <button :class="[isActive ? 'is-active' : '' , 'hamburger hamburger--3dxy']" type="button"
                            @click="isActive = !isActive">
                         <span class="hamburger-box">
                               <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clink from "../elements/Link";

    export default {
        name: 'Header',
        components: {Clink},
        data() {
            return {
                isActive: false
            }
        },
        methods:{
          linkToPage(item){
              this.isActive = false
              this.$router.push(this.localePath(item))
          }
        },
        computed: {
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
