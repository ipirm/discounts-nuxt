<template>
	<div class="blog-page">
		<div class="container">
			<div class="page__go-back" @click="$router.go(-1)">
				<svg-icon name="slider/prev" style="width: 50px;height: 34px"/>
			</div>
			<h1 class="blog-page__title">{{ $t('blog.title') }}</h1>
			<p class="blog-page__text">Эта веб-страница является прекрасным местом для жизни в любых ее конев а проявлениях. Реалистичные истории очеловечивают бренд, предоставляя контекст. Эта веб-страница является прекрасным местом для жизни в любых ее конев а проявлениях. Реалистичные истории очеловечивают бренд, предоставляя контекст.</p>
			<div class="blog-page__interesting-posts">
				<clink to="/xz" class="blog-page__interesting-posts__item" v-for="i in 3" :key="i">
					<div class="blog-page__interesting-posts__item__content">
						<img src="/temp/blog-interesting.png" alt="xz">
						<h2 class="blog-page__post__title">Она сделала губы</h2>
						<p class="blog-page__post__text">Меная пециоа всстом для жизни в любых ее конев а проявлениях...</p>
					</div>
				</clink>
			</div>
			<div class="blog-page__about">
				<div>
					<span class="line">Coupons <span class="gold">Baku</span>, 2020</span>
					<span class="line bold">{{ $t('blog.aggregator') }}</span>
				</div>
			</div>
			<div class="blog-page__masonry">
				<div class="viewer">
					<div v-for="(post, index) in 10" :data-index="index" :key="index" :class="`box-${index}`" class="item">
						<img class="work-thumb" src="/temp/blog-post.png">
						<div class="working-desc small">
							<h2 class="blog-page__post__title">Она сделала губы</h2>
							<p class="blog-page__post__text">Меная пециоа всстом для жизни в любых ее конев а проявлениях...</p>
						</div>
					</div>
					<div class="grid-sizer"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
if (process.browser) {
	var Masonry = require('masonry-layout');
	var ImagesLoaded = require('imagesloaded');
}

export default {
	watch: {
		data() {
			this.loaded();
		}
	},

	data() {
		return {
			selector: '.viewer',
		  options: {
				columnWidth: '.grid-sizer',
				percentPosition: true,
				gutter: 0,
				itemSelector: '.item'
		  }
		}
	},

	mounted() {
		this.loaded();
	},

	methods: {
		loaded() {
			// all images are loaded
			ImagesLoaded(this.selector, () => {
				this.$emit('masonry-images-loaded');
				// activate mansonry grid
				let masonry = new Masonry(this.selector, this.options);
				this.$emit('masonry-loaded', masonry);
			});
		}
	}
}
</script>

<style lang="scss">
@import '~/assets/scss/pages/blog.scss';
</style>
