<template>
    <nuxt-link :to="{name:'discount-slug',params:{slug: post.slug}}" class="overlay-card">
        <div v-if="parseInt(post.ended) === 1" class="overlay-card-item" :style="{backgroundColor: 'rgb(255, 0, 0)'}">
            <span>Просрочено</span>
        </div>
        <div v-else class="overlay-card-item" :style="{backgroundColor: post.color}"><span>{{post.color_text}}</span>
        </div>

        <img v-if="post.image === null" :src="company.image_url"/>
        <img v-else :src="post.image_url"/>

        <div class="overlay-card-text">
            <span>{{post.title}}</span>
            <p>{{post.description}}</p>
            <div class="overlay-card-desc">
                <div class="overlay-card-underline"></div>
                <div class="overlay-date">
                    <div class="overlay-date-now">{{post.duration}}</div>
                    <div class="overlay-date-type">{{ cat.name }}</div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>
<script>

    export default {

        props: ['company', 'post', 'cat'],
        name: 'Card'
    }
</script>
