import apiRequest from "../utils/apiRequest";

export const state = () => ({
    cats: [],
    activeCat: {},
    catPost: {},
    catsGroup: [],
    labels: []
})


export const mutations = {
    SET_CAT: (state, payload) => {
        state.cats = payload.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    },
    SET_ACTIVE_CAT: (state, payload) => {
        state.activeCat = payload
    },
    SET_POST_CAT: (state, payload) => {
        state.catPost = payload
    },
    SET_GROUP_CATS: (state,payload) => {
        state.catsGroup = payload
    },
    SET_LABEL: (state, payload) =>{
        state.labels = payload
    }
}


export const actions = {
    async getCats({commit}) {
        const data = await apiRequest.get('posts-cats');
        commit('SET_CAT', data.data.posts.data);
    },
    async getSameCats({commit}, slug) {
        const data = await apiRequest.get(`posts-cat-item/${slug}`);
        commit('SET_ACTIVE_CAT', data.data.posts);
    },
    async getCat({commit},slug) {
        const data = await apiRequest.get(`posts-cats/${slug}`);
        commit('SET_POST_CAT', data.data.post);
    },
    async getGroupCats({commit}) {
        const data = await apiRequest.get(`cats-page`)
        const label = await apiRequest.get('labels')
        commit('SET_GROUP_CATS', data.data.posts2);
        commit('SET_LABEL', label.data.posts.data);
    }
}
