<template>
    <Clink :to="{name:'discount-slug',params:{slug: post.slug}}" class="overlay-card">
        <div v-if="parseInt(post.ended) === 1" class="overlay-card-item" :style="{backgroundColor: 'rgb(255, 0, 0)'}">
            <span>{{ $t('card.overdue') }}</span>
        </div>
        <div v-else-if="post.color !== '-' && parseInt(post.ended) === 0" class="overlay-card-item" :style="{ backgroundColor: post.color}"><span>{{post.color_text}}</span></div>
        <div v-else-if="post.color === '-' && parseInt(post.ended) === 0" class="overlay-card-item" :style="{ backgroundColor: 'rgb(0, 255, 0)'}"><span>{{post.color_text}}</span></div>
        <img  :src="post.image_url"/>
        <div class="overlay-card-text">
            <span>{{post.title[$i18n.locale]}}</span>
            <p>{{post.description[$i18n.locale]}}</p>
            <div class="overlay-card-desc">
                <div class="overlay-card-underline"></div>
                <div class="overlay-date">
                    <div class="overlay-date-now">{{post.duration[$i18n.locale]}}</div>
                    <div class="overlay-date-type">{{ post.pcat.name[$i18n.locale] }}</div>
                </div>
            </div>
        </div>
    </Clink>
</template>
<script>

    import Clink from "./Link";
    export default {
        components: {Clink},
        props: ['post'],
        name: 'Card'
    }
</script>
