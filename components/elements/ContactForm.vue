<template>
  <form class="contact-form" @submit.prevent="checkForm">
    <p class="contact-form-title">Напишите нам</p>
    <span class="contact-form-text">Мы с вами сами свяжемся по любому вопросу</span>
    <input class="contact-form-name" name="name" v-model="body.name" type="text" placeholder="Ваше имя">
    <input class="contact-form-email" name="mail" v-model="body.mail" type="text" placeholder="Ваш e-mail">
    <textarea class="contact-form-textarea" name="text" v-model="body.text" placeholder="Ваше сообщение..."/>
    <button type="submit" class="contact-form-btn">
      <span>Отправить</span>
    </button>
    <vue-recaptcha
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      size="invisible"
      sitekey="6LeGM7cZAAAAACLPSqAzjLIVn5zN3oc0iUslER5r">
    </vue-recaptcha>
  </form>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    name: "ContactForm",
    components: { VueRecaptcha },
    data() {
      return {
        errors: [],
        body:{
          name: null,
          mail: null,
          text: null
        }
      }
    },
    methods: {
      checkForm(e) {
        this.errors = [];
        if (this.body.name && this.body.mail && this.body.text) {
          return true;
        }

        if (!this.body.name) {
          this.errors.push('Требуется указать имя.');
        }

        if (!this.body.mail) {
          this.errors.push('Требуется указать эмейл.');
        }

        if (!this.body.text) {
          this.errors.push('Поле текст не может быть пустым');
        }
        this.$refs.recaptcha.execute();
      },
      onCaptchaVerified(recaptchaToken){
        this.$refs.recaptcha.reset();
        console.log(this.body);
      },
      onCaptchaExpired(){
        this.$refs.recaptcha.reset();
      }
    }
  }
</script>

<style scoped>

</style>
