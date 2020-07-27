<template>
  <form class="contact-form">
    <p class="contact-form-title">Напишите нам</p>
    <span class="contact-form-text">Мы с вами сами свяжемся по любому вопросу</span>
    <input class="contact-form-name" type="text" placeholder="Ваше имя">
    <input class="contact-form-email" type="text" placeholder="Ваш e-mail">
    <textarea class="contact-form-textarea" placeholder="Ваше сообщение..."/>
    <a class="contact-form-btn">
      <span>Отправить</span>
    </a>
  </form>
</template>

<script>
  export default {
    name: "ContactForm"
  }
</script>

<style scoped>

</style>
