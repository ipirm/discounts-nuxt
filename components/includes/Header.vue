<template>
  <div class="header">
    <div class="header__content">
      <div class="header__container container">
        <div class="full-bg" @click="onBgClick()" :class="{active: menuActive}"></div>
        <div class="header__center">
          <clink to="/" class="header__center__item">
            <span>{{ $t('menu.main') }}</span>
          </clink>
          <clink to="/category" class="header__center__item">
            <span>{{ $t('menu.category') }}</span>
          </clink>
          <clink to="/" class="header__center__item header__logo">
            <img src="/logo.svg">
          </clink>
          <clink to="/company" class="header__center__item">
            <span>{{ $t('menu.company') }}</span>
          </clink>
          <clink to="/information/kontakty" class="header__center__item">
            <span>{{ $t('menu.contact') }}</span>
          </clink>
        </div>
        <div class="header__right">
          <clink to="/favorite" class="header__right__heart">
            <img src="/images/heart-golden.svg" class="hover">
            <img src="/images/heart.svg" class="nohover">
          </clink>
          <div class="header__right__line"></div>
          <button class="hamburger hamburger--spin header__right__menu-button" @click="toggleMenu()" :class="{ 'is-active': menuActive }">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div class="header__menu__wrapper" :class="{active: menuActive}">
          <div class="header__menu__slider">
            <div class="header__menu">
              <div class="header__menu__langs">
                <button class="header__menu__langs__item" :class="{active: $i18n.locale == 'ru'}" @click="chooseLang('ru')">Ru</button>
                <button class="header__menu__langs__item" :class="{active: $i18n.locale == 'az'}" @click="chooseLang('az')">Az</button>
              </div>
              <div class="header__menu__content">
                <h2 class="header__menu__title--big">{{ $t('burgerMenu.navigation') }}</h2>
                <ul>
                  <li>
                    <clink to="/">{{ $t('menu.main') }}</clink>
                  </li>
                  <li>
                    <clink to="/category">{{ $t('menu.category') }}</clink>
                  </li>
                  <li>
                    <clink to="/company">{{ $t('menu.company') }}</clink>
                  </li>
                  <li>
                    <clink to="/favorite">{{ $t('menu.popular') }}</clink>
                  </li>
<!--                  <li>-->
<!--                    <clink to="/blog">{{ $t('menu.blog') }}</clink>-->
<!--                  </li>-->
                </ul>
                <h3 class="header__menu__title--medium">{{ $t('burgerMenu.AnotherLinks') }}</h3>
                <ul>
           <li v-for="item in pages" :key="item.id">
             <clink  :to="`/information/${item.slug}`">{{ item.menu_name[$i18n.locale] }}</clink>
           </li>
                </ul>
                <h3 class="header__menu__title--medium"></h3>
                <div class="header__menu__blog" >
                  <div class="header__menu__blog__left" >
                    <div v-swiper:mySwiper="swiperOption">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide " v-if="false" v-for="i in 3" :key="i">
                          <img src="/temp/menu-blog.png">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="header__menu__blog__right">
                    <h4 class="header__menu__blog__right__title"></h4>
                    <div class="header__menu__blog__right__topics">
                      <clink v-if="false" to="/xz" :class="{active: activeMenuSlide == i-1}" v-for="i in 3" :key="i">Ссылка</clink>
                    </div>
                  </div>
                </div>
                <h3 class="header__menu__title--medium">{{ $t('burgerMenu.withUs') }}</h3>
                <div class="header__menu__socials">
                  <a href="https://www.facebook.com/coupons.baku/" target="_blank" class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/fb.svg">
                    <img class="hover" src="/images/menu/fb-orange.svg">
                  </a>
                  <a href="https://web.whatsapp.com/" target="_blank"  class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/wp.svg">
                    <img class="hover" src="/images/menu/wp-orange.svg">
                  </a>
                  <a href="http://m.me/coupons.baku" target="_blank"  class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/msg.svg">
                    <img class="hover" src="/images/menu/msg-orange.svg">
                  </a>
                  <a href="mailto:info@coupons.az" target="_blank" class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/mail.svg">
                    <img class="hover" src="/images/menu/mail-orange.svg">
                  </a>
                  <a href="https://www.instagram.com/coupons.az/" target="_blank"  class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/ig.svg">
                    <img class="hover" src="/images/menu/ig-orange.svg">
                  </a>
                  <a href="tel:+994503190044" class="header__menu__socials__item">
                    <img class="nohover" src="/images/menu/phone.svg">
                    <img class="hover" src="/images/menu/phone-orange.svg">
                  </a>
                </div>
                <span class="header__menu__bottom-text">{{ $t('burgerMenu.createdWith') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'Header',

    components: {clink: () => import('../elements/Link')},

    data() {
      return {
        menuActive: false,
        activeMenuSlide: 0,
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 10,
          observer: true,
          observeParents: true,
          autoplay: {
            disableOnInteraction: false
          },
          init: false
        }
      }
    },

    mounted() {
      const links = this.$el.querySelectorAll('a');
      if (links) {
        links.forEach(a => {
          a.addEventListener('click', () => {this.closeMenu()});
        });
      }

      if (this.mySwiper) {
        this.mySwiper.on('slideChange', () => {
          this.activeMenuSlide = this.mySwiper.activeIndex;
        });

        this.mySwiper.init(this.swiperOption);
      }
    },

    methods: {
      toggleMenu() {
        if(this.menuActive)
          this.closeMenu();
        else this.openMenu();
      },

      openMenu() {
        this.menuActive = true;
      },

      closeMenu() {
        this.menuActive = false;
      },

      onBgClick() {
        this.closeMenu();
      },

      chooseLang(lang) {
        this.$router.push(this.switchLocalePath(lang));
      }
    },
    computed: {
      ...mapState('pages', ['pages']),
    }
  }
</script>
