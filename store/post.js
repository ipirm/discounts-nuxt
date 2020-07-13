import apiRequest from "../utils/apiRequest";

export const state = () => ({
    posts: [],
    total: 0,
    page: 1,
    postActive: {},
    infinityRender: 0
})


export const mutations = {
    SET_POSTS: (state, payload) => {
        function saveDiference(arr) {
            return (
                Array.from(new Set(arr.map(a => a.id)))
                    .map(id => {
                        return arr.find(a => a.id === id)
                    })
            )
        }
        state.page === 1 ? state.posts = payload : state.posts = saveDiference(state.posts.concat(payload))
    },
    SET_TOTAL: (state, payload) => {
        state.total = payload
    },
    SET_PAGE: (state, payload) => {
        state.page = payload
    },
    SET_ACTIVE_POST: (state, payload) => {
        state.postActive = payload
    },
    SET_INFINITY_RENDER: (state, payload) => {
        state.infinityRender += 1
    },
}

export const actions = {
    async getPosts({commit,state}, url) {
        let urlNew = ''
        if(url){
            const replaceUrl = url.split('/');
            urlNew = replaceUrl[1].split('?')[1];
        }
            const data = await apiRequest.get(`posts?per_page=6&page=${state.page}&${urlNew}`);
             commit('SET_POSTS', data.data.newsData.data);
            commit('SET_TOTAL', data.data.newsData.total);
    },
    async getActivePost({commit}, url) {
        const data = await apiRequest.get(`posts/${url}`);
        commit('SET_ACTIVE_POST', data.data.post);
    }
}
