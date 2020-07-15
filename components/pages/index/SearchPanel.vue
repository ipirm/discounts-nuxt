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
                    <span>{{ $t('searchPanel.aboutUS') }}</span>
                </div>
                <div class="d-flex">
                    <CustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
                    <CustomSelect  :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
                    <CustomSelect  :data="typesPost" type="type" :placeHolder="$t('searchPanel.selectType')" />
                </div>
            </div>
        </div>
    </template>

<script>
    import CustomSelect from "../../elements/CustomSelect";
    export default {
        props: ['cats','companies','typesPost'],
        name: 'SearchPanel',
        components: {CustomSelect},

    }
</script>
