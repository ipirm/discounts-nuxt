<template>
  <form class="contact-form" @submit.prevent="checkForm">
    <p class="contact-form-title">{{$t('contactForm.title')}}</p>
    <span class="contact-form-text">{{$t('contactForm.subtitle')}}</span>
    <input class="contact-form-name" name="name" v-model="body.name" type="text" :placeholder="$t('contactForm.name')">
    <input class="contact-form-email" name="mail" v-model="body.mail" type="email" :placeholder="$t('contactForm.email')">
    <textarea class="contact-form-textarea" name="text" v-model="body.text" :placeholder="$t('contactForm.text')"/>
    <vue-recaptcha
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      :loadRecaptchaScript="true"
      size="invisible"
      sitekey="6LeGM7cZAAAAACLPSqAzjLIVn5zN3oc0iUslER5r">
    </vue-recaptcha>
    <span class="error" v-for="item in this.errors" :key="item">{{ item }}</span>
    <button type="submit" class="contact-form-btn">
      <span>{{ $t('contactForm.sendBtn') }}</span>
    </button>
  </form>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "ContactForm",
    components: {VueRecaptcha},
    data() {
      return {
        errors: [],
        body: {
          name: null,
          mail: null,
          text: null,
          reCaptchaToken: null
        }
      }
    },
    methods: {
      checkForm(e) {
        this.errors = [];
        if (!this.body.name) {
          this.errors.push(this.$t('contactForm.validateName'));
        }

        if (!this.body.mail) {
          this.errors.push(this.$t('contactForm.validateEmail'));
        }

        if (!this.body.text) {
          this.errors.push(this.$t('contactForm.validateText'));
        }
        this.$refs.recaptcha.execute();
      },
      onCaptchaVerified(recaptchaToken) {
        this.body.reCaptchaToken = recaptchaToken
        this.$refs.recaptcha.reset();
        if (this.body.name && this.body.mail && this.body.text) {
          this.$store.dispatch('mail/sendMail', this.body).then(() => {
            this.$toast.success(this.$t('contactForm.thankYou'));
            this.body = {
              name: null,
              mail: null,
              text: null,
              reCaptchaToken: null
            }
          })
        }
      },
      onCaptchaExpired() {
        this.$refs.recaptcha.reset();
      }
    }
  }
</script>
