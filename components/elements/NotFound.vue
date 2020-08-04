<template>
<div class="not-found">
  <img style="max-width: 100%; width: auto !important" src="/images/sad.svg"/>
  <p>{{ text }}</p>
</div>
</template>

<script>
  export default {
    props: ['text'],
    name: "NotFound"
  }
</script>

<style scoped>
  .svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: middle;
    overflow: hidden;
  }
</style>
