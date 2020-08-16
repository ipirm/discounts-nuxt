<template>
	<div class="blog-page">
		<div class="container">
			<div class="page__go-back">
				<a @click="$router.go(-1)" class="post-back-button">
          <svg-icon name="navigation/prev" style="width: 26px;height: 30px; transform: scaleX(1)"/>
          <span>{{$t('navigation.prev')}}</span>
        </a>
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
					<clink v-for="(post, i) in 10" :data-index="i" :key="i" to="/xz" class="item" :class="[wideClass(i) ? 'wide' : '', `box-${i}`]">
						<img class="work-thumb" src="/temp/blog-post.png">
						<div class="blog-page__masonry__info">
							<h2 class="blog-page__post__title">Она сделала губы</h2>
							<p class="blog-page__post__text">Меная пециоа всстом для жизни в любых ее конев а проявлениях...</p>
						</div>
					</clink>
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
		},
		wideClass(i) {
			if ((i+1) % 10 < 5 && (i+1) % 5 == 1)
				return true;
			else if ((i+1) % 10 >= 5 && (i+1) % 5 == 2) return true;
			return false;
		}
	}
}
</script>

<style lang="scss">
@import '~/assets/scss/pages/blog.scss';
</style>
