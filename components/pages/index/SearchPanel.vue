<template>
        <div class="overlaySearch">
            <div class="overlay-search">
                <div class="overlay-search-title" v-if="!isCatPage">>
                      <h1>{{ $t('searchPanel.title') }}</h1>
                        <h2>{{ $t('searchPanel.subtitle') }}</h2>
                </div>
                <div class="overlay-search-subtitle" v-if="!isCatPage">>
                    <span>{{ $t('searchPanel.aboutUS') }}</span>
                </div>
              <div class="overlay-search-title" v-if="isCatPage">>
                <h2>{{catText.name[this.$i18n.locale]}}</h2>
              </div>
              <div class="overlay-search-subtitle" v-if="isCatPage">
                <span>{{catText.text_about[this.$i18n.locale]}}</span>
              </div>
                <div class="d-flex" v-if="!isCatPage">
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
        props: ['cats','companies','typesPost','isCatPage','catText'],
        name: 'SearchPanel',
        components: {IndexCustomSelect}
    }
</script>
