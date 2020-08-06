<template>
        <div class="overlaySearch">
            <div class="overlay-search">
                <div class="overlay-search-title">
                      <h1>{{ $t('searchPanel.title') }}</h1>
                        <h2>{{ $t('searchPanel.subtitle') }}</h2>
                </div>
                <div class="overlay-search-subtitle">
                    <span>{{ $t('searchPanel.aboutUS') }}</span>
                </div>
                <div class="d-flex">
                    <IndexCustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
                    <IndexCustomSelect :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
                    <IndexCustomSelect :data="typesPost" type="type" :placeHolder="$t('searchPanel.selectType')" />
                </div>
            </div>
        </div>
    </template>

<script>
    import IndexCustomSelect from "../../elements/IndexCustomSelect";
    export default {
        props: ['cats','companies','typesPost'],
        name: 'SearchPanel',
        components: {IndexCustomSelect}
    }
</script>
