<template>
    <div>
        <client-only>
        <v-select
                class="basic-single"
                :placeholder="placeHolder"
                defaultValue="10"
                id="1"
                instanceId="1"
                inputId="1"
                :clearable="false"
                v-model="selected"
                :options="data"
                label="name"
                @input="doSomething"
        />
        </client-only>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        props: ['data', 'type','placeHolder'],
        name: 'CustomSelect',
        data() {
            return {
                selected: ''
            }
        },
        methods: {
            ...mapMutations('post', ['SET_PAGE']),
            doSomething() {
                if (this.selected) {
                    this.SET_PAGE(1)
                    this.$router.push({
                        path: this.$route.path,
                        query: {...this.$route.query,  ...{[this.type]: this.selected.slug}}
                    })

                }
            }
        },
        mounted(){
            if(this.$route.query[this.type]){
                this.selected = this.data.find(i => i.slug === this.$route.query[this.type])
            }
        },
        watchQuery(newQuery, oldQuery) {
            return newQuery && oldQuery
        },
        computed: {}
    }
</script>

