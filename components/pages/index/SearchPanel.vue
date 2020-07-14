<template>
        <div class="overlaySearch">
            <div class="overlay-search">
                <div class="overlay-search-title">
                    <span>
                        {{ $t('searchPanel.title') }}
                        <b>{{ $t('searchPanel.subtitle') }}</b>
                    </span>
                </div>
                <div class="overlay-search-subtitle">
                    <span>Уникальный проект, который собирает все акции и скидки в городе Баку</span>
                </div>
                <div class="d-flex">
                    <CustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
                    <CustomSelect  :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
                </div>
            </div>
        </div>
    </template>

<script>
    import CustomSelect from "../../elements/CustomSelect";
    export default {
        props: ['cats','companies'],
        name: 'SearchPanel',
        components: {CustomSelect},

    }
</script>
