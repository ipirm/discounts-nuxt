export const state = () => ({
    skeleton: null,
    pageLoading: true

})

export const mutations = {
    UPDATE_SKELETON(state, data) {
        state.skeleton = data;
    },
    UPDATE_LOADING(state, data) {
        state.pageLoading = !state.pageLoading;
    }
}
