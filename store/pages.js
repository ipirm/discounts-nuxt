import apiRequest from "../utils/apiRequest";

export const state = () => ({
  page: {},
  pages: []
});

export const mutations = {
  SET_PAGE: (state, payload) => {
    state.page = payload
  },
  SET_PAGES: (state, payload) => {
    state.pages = payload
  }
}

export const actions = {
  async getPageBySlug({commit}, slug) {
    const data = await apiRequest.get(`pages/${slug}`);
    commit('SET_PAGE', data.data.posts);
  },
  async getPages({commit}) {
    const data = await apiRequest.get(`pages`);
    commit('SET_PAGES', data.data.posts.data);
  },
}
