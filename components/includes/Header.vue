<template>
    <div class="overlayHeader">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ul class="header-menu">
                        <li>
                            <Clink :to="{name:'index'}">{{ $t('menu.main') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'category'}">{{ $t('menu.category') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'company'}">{{ $t('menu.company') }}</Clink>
                        </li>
                        <li>
                            <Clink :to="{name:'saved'}">{{ $t('menu.popular') }}</Clink>
                        </li>
                    </ul>
                    <div class="header-locales">
                        <nuxt-link :to="switchLocalePath('az')">AZ</nuxt-link>
                        <nuxt-link :to="switchLocalePath('ru')">RU</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clink from "../elements/Link";
    export default {
        name: 'Header',
        components: {Clink}
    }
</script>
