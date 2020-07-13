<template>
    <div>
        <client-only>
            <v-select
                    v-if="type === 'cats' && data"
                    class="basic-single"
                    :placeholder="placeHolder"
                    defaultValue="10"
                    id="1"
                    instanceId="1"
                    inputId="1"
                    :clearable="true"
                    v-model="selected"
                    :options="data"
                    label="name"
                    @input="findPosts"
            />
            <v-select
                    v-else
                    class="basic-single"
                    :placeholder="placeHolder"
                    defaultValue="10"
                    id="2"
                    instanceId="2"
                    inputId="2"
                    :clearable="true"
                    v-model="selected"
                    :options="data"
                    label="name"
                    @input="findPosts"
            />
        </client-only>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        props: ['data', 'type', 'placeHolder'],
        name: 'CustomSelect',
        data() {
            return {
                selected: ''
            }
        },
        methods: {
            ...mapMutations('post', ['SET_PAGE']),
            findPosts() {
                if (this.selected) {
                    this.SET_PAGE(1)
                    this.$router.push({
                        path: this.$route.path,
                        query: {...this.$route.query, ...{[this.type]: this.selected.id}}
                    })

                }
            }
        },

        mounted() {
            if (this.$route.query[this.type]) {
                this.selected = this.data.find(i => parseInt(i.id) === parseInt(this.$route.query[this.type]))
            }
        },
        watch: {
            selected() {
                if (this.selected === null) {
                    this.SET_PAGE(1)
                    let query = Object.assign({}, this.$route.query);
                    delete query[this.type];
                    this.$router.replace({query});
                }
            }
        },
        computed: {
        }

    }
</script>

