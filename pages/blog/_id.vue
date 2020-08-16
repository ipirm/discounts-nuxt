<template>
	<div class="blog-post-page container">
		<div class="blog-post-page__top">
      <a @click="$router.go(-1)" class="post-back-button">
        <svg-icon name="navigation/prev" style="width: 26px;height: 30px"/>
        <span>{{$t('navigation.prev')}}</span>
      </a>
      <a class="post-back-button post-next-button" @click="nextRouterHandler">
        <span>{{$t('navigation.next')}}</span>
        <svg-icon name="navigation/next" style="width: 26px;height: 30px"/>
      </a>
		</div>
		<h1 class="blog-post-page__title">Где живут дельфины? Эта веб-страница является весьма прекрасным местом для жизни.</h1>
		<div class="blog-post-page__subtitle-area">
			<span class="blog-post-page__subtitle-area__date">28 июля, 15:00</span>
			<div class="blog-post-page__subtitle-area__share">
				<span>Поделиться:</span>
				<a href="#">
					<img src="/images/fb.svg" alt="Facebook">
				</a>
				<a href="#">
					<img src="/images/ig.svg" alt="Instagram">
				</a>
				<a href="#">
					<img src="/images/msg.svg" alt="Messenger">
				</a>
				<a href="#">
					<img src="/images/wp.svg" alt="Whatsapp">
				</a>
			</div>
		</div>
		<div class="blog-post-page__subtitle-area__content" v-html="html"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			html: 'Coupons Baku является крупнейшим агрегатором скидок по Азербайджану. У нас достоверная и самая актуальная на сегодняшний день информация. Мы предоставляем читателям скидки и акции по популярным магазинам и развлечениям в городе Баку. На сайте ежедневно обновляются данные по предложениям работающих в городе компаний, и мы стараемся, чтобы эти предложения для удобства читателя были выведены в одном месте. Список магазинов и ресторанов, опубликованных на сайте, постоянно обновляет. Coupons Baku является крупнейшим агрегатором скидок по Азербайджану. У нас достоверная и самая актуальная на сегодняшний день информация. Мы предоставляем читателям скидки и акции по популярным магазинам и развлечениям в городе Баку. На сайте ежедневно обновляются данные по предложениям работающих в городе компаний, и мы стараемся, чтобы эти предложения для удобства читателя были выведены в одном месте. Список магазинов и ресторанов, опубликованных на сайте, постоянно обновляет. Список магазинов и ресторанов, опубликованных на сайте, постоянно обновляет.Список магазинов и ресторанов, опубликованных на сайте, постоянно обновляет.. Список магазинов и ресторанов, опубликованных на сайте/ Наслаждайтесь полда корпирет тонкорнок'
		}
	},

	methods: {
		nextRouterHandler() {

		}
	}
}
</script>

<style lang="scss">
@import '~/assets/scss/pages/blog-post';
</style>
