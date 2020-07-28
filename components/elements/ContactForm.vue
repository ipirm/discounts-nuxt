<template>
  <form class="contact-form" @submit.prevent="checkForm">
    <p class="contact-form-title">Напишите нам</p>
    <span class="contact-form-text">Мы с вами сами свяжемся по любому вопросу</span>
    <input class="contact-form-name" name="name" v-model="body.name" type="text" placeholder="Ваше имя">
    <input class="contact-form-email" name="mail" v-model="body.mail" type="email" placeholder="Ваш e-mail">
    <textarea class="contact-form-textarea" name="text" v-model="body.text" placeholder="Ваше сообщение..."/>
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
      <span>Отправить</span>
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
          this.errors.push('Требуется указать имя');
        }

        if (!this.body.mail) {
          this.errors.push('Требуется указать эмейл');
        }

        if (!this.body.text) {
          this.errors.push('Поле текст не может быть пустым');
        }
        this.$refs.recaptcha.execute();
      },
      onCaptchaVerified(recaptchaToken) {
        this.body.reCaptchaToken = recaptchaToken
        this.$refs.recaptcha.reset();
        if (this.body.name && this.body.mail && this.body.text) {
          this.$store.dispatch('mail/sendMail', this.body).then(() => {
            this.$toast.success('Спасибо за ваш отклик')
          })
        }
      },
      onCaptchaExpired() {
        this.$refs.recaptcha.reset();
      }
    }
  }
</script>

<style scoped>

</style>
