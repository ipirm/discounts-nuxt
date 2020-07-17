<template>
    <nuxt-link :href="localePath(to)" :to="localePath(to)">
        <slot/>
    </nuxt-link>
</template>

<script>
    export default {
        props: ['to'],
        name: "clink"
    }
</script>
