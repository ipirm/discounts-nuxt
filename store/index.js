import apiRequest from "../utils/apiRequest";

export const state = () => ({
});

export const mutations = {
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
      await dispatch('pages/getPages');
    }
}
