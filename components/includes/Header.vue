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
          <clink to="/" class="header__center__item">
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
            <img src="/images/heart.svg">
          </clink>
          <div class="header__right__line"></div>
          <button class="header__right__menu-button" @click="toggleMenu()">
            <img src="/images/menu-button.svg">
          </button>
        </div>
        <div class="header__menu__wrapper" :class="{active: menuActive}">
          <div class="header__menu__slider">
            <div class="header__menu">
              <div class="header__menu__langs">
                <button class="header__menu__langs__item" :class="{active: $i18n.locale == 'ru'}">Ru</button>
                <button class="header__menu__langs__item" :class="{active: $i18n.locale == 'az'}">Az</button>
              </div>
              <div class="header__menu__content">
                <h2 class="header__menu__title--big">{{ $t('menu.navigation') }}</h2>
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
                  <li>
                    <clink to="/blog">{{ $t('menu.blog') }}</clink>
                  </li>
                </ul>
                <h3 class="header__menu__title--medium">{{ $t('menu.who-we-are') }}</h3>
                <ul>
                  <li>
                    <clink to="/information/haqqimizda">{{ $t('footer.aboutUs') }}</clink>
                  </li>
                  <li>
                    <clink to="/information/partnerstvo">{{ $t('footer.workWithUs') }}</clink>
                  </li>
                  <li>
                    <clink to="/information/kontakty">{{ $t('menu.contact') }}</clink>
                  </li>
                  <li>
                    <clink to="/information/gizlilik-siyas-ti">{{ $t('menu.policy') }}</clink>
                  </li>
                </ul>
                <h3 class="header__menu__title--medium">{{ $t('menu.read-in-blog') }}</h3>
                <div class="header__menu__blog">
                  <clink to="#" class="header__menu__blog__left">
                    <img src="/temp/menu-blog.png">
                  </clink>
                  <div class="header__menu__blog__right">
                    <h4 class="header__menu__blog__right__title">{{ $t('menu.todays-topic') }}</h4>
                    <div class="header__menu__blog__right__topics">
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">мода</clink>
                      </div>
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">покупки</clink>
                      </div>
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">шоппинг</clink>
                      </div>
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">скидки и акции</clink>
                      </div>
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">вазы</clink>
                      </div>
                      <div class="header__menu__blog__right__topics__item">
                        <clink to="/">взгляд со стороны</clink>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 class="header__menu__title--medium">{{ $t('menu.social') }}</h3>
                <div class="header__menu__socials">
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/fb.svg">
                  </a>
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/wp.svg">
                  </a>
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/msg.svg">
                  </a>
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/mail.svg">
                  </a>
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/ig.svg">
                  </a>
                  <a href="#" class="header__menu__socials__item">
                    <img src="/images/menu/phone.svg">
                  </a>
                </div>
                <span class="header__menu__bottom-text">{{ $t('menu.bottom-text') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    components: {clink: () => import('../elements/Link')},

    data() {
      return {
        menuActive: false
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
      }
    }
  }
</script>
