<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col ">
          <div class="footer-about">
            <div class="footer-about-title"><span>{{ $t('footer.aboutUs') }}</span></div>
            <div class="footer-about-text"><span>{{ $t('footer.aboutText') }}</span>
            </div>
          </div>
          <div class="footer-social">
            <div class="footer-social-title"><span>{{ $t('footer.writeUs') }}</span></div>
            <div class="footer-social-content">
              <a href="/">
                <svg-icon name="social/mail" style="width: 17px;height: 18px"/>
                <span>ilham@pirm.com</span>
              </a>
              <a href="/">
                <svg-icon name="social/phone" style="width: 17px;height: 18px"/>
                <span>+7985 505 50 50</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col ">
          <div class="footer-links">
            <div class="footer-links-title">
              <span>{{ $t('footer.fastLinks') }}</span>
            </div>
            <div class="footer-links-content">
              <Clink :to="{name:'index'}">{{ $t('menu.main') }}</Clink>
              <Clink :to="{name:'category'}">{{ $t('menu.category') }}</Clink>
              <Clink :to="{name:'company'}">{{ $t('menu.company') }}</Clink>
              <Clink :to="{name:'favorite'}">{{ $t('menu.popular') }}</Clink>
            </div>
          </div>
        </div>
        <div class="footer-col ">
          <div class="footer-links">
            <div class="footer-links-title">
              <span>{{ $t('footer.workWithUs') }}</span>
            </div>
            <div class="footer-links-content">
              <nuxt-link v-for="item in pages" :key="item.id" :to="`/information/${item.slug}`"><span>{{ item.menu_name[$i18n.locale] }}</span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="footer-col ">
          <div class="footer-contact">
            <div class="footer-contact-title">
              <span>{{ $t('footer.contactUs') }}</span>
            </div>
            <div class="footer-contact-text">
              <span>{{ $t('footer.stayUs') }}</span>
            </div>
            <div class="footer-contact-mail">
              <!--                            <div class="footer-contact-mail-social"><span>Мы в соц. сетях</span></div>-->
              <input type="text" :placeholder="$t('footer.yourMail')">
              <a class="footer-contact-mail-send">
                <span>{{ $t('footer.send') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row footer-row">
        <div class="footer-subcol"><span>{{ $t('footer.changedLang') }} {{ $t('footer.lang') }}</span>
        </div>
        <div class="footer-subcol"><span>{{ $t('footer.rightReserved') }}</span></div>
        <div class="footer-subcol"><span>{{ $t('footer.rightStudio') }}</span></div>
      </div>
    </div>
  </footer>
</template>

<script>
  import Clink from "../elements/Link";
  import {mapState} from 'vuex'

  export default {
    name: 'Footer',
    components: {Clink},
    computed: {
      ...mapState('pages', ['pages']),
    }
  }
</script>
