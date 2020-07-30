import apiRequest from "../utils/apiRequest";


export const state = () => ({
  pageReady: false
})
export const mutations = {
  SET_PAGE_READY: (state) => {
    console.log('fafaaf')
    state.pageReady =  !state.pageReady
  },
}

export const actions = {
  async sendMail({commit}, body) {
    const data = await apiRequest.post(`mail-form`, body);
  }
}
