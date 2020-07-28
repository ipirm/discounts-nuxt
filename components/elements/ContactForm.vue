<template>
  <form class="contact-form" @submit="checkForm">
    <p class="contact-form-title">Напишите нам</p>
    <span class="contact-form-text">Мы с вами сами свяжемся по любому вопросу</span>
    <input class="contact-form-name" name="name" v-model="body.name" type="text" placeholder="Ваше имя">
    <input class="contact-form-email" name="mail" v-model="body.mail" type="text" placeholder="Ваш e-mail">
    <textarea class="contact-form-textarea" name="text" v-model="body.text" placeholder="Ваше сообщение..."/>
    <button type="submit" class="contact-form-btn">
      <span>Отправить</span>
    </button>
  </form>
</template>

<script>
  export default {
    name: "ContactForm",
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
      checkForm: function (e) {
        if (this.name && this.mail && this.text) {
          return true;
        }
        this.errors = [];

        if (!this.name) {
          this.errors.push('Требуется указать имя.');
        }

        if (!this.mail) {
          this.errors.push('Требуется указать возраст.');
        }

        if (!this.text) {
          this.errors.push('Требуется указать возраст.');
        }
        console.log(this.body);
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>

</style>
