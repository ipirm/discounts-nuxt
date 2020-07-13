<template>
    <nuxt-link :href="localePath(to)" :to="localePath(to)">
        <slot />
    </nuxt-link>
</template>

<script>
    export default {
        props:{
          to: Object
        },
        name: "clink"
    }
</script>
