<template>
    <div class="overlayHeader">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ul class="header-menu">
                        <li>
                            <nuxt-link :to="{name:'index'}">Главная</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link :to="{name:'category'}">Категории</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link :to="{name:'company'}">Компании</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link :to="{name:'saved'}">Популярное</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        components: {}
    }
</script>
