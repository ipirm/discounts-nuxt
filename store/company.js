import apiRequest from "../utils/apiRequest";

export const state = () => ({
    companies: [],
    activeCompany: {},
    letters: [
        {
            name: "A",
            active: false
        },
        {
            name: "B",
            active: false
        },
        {
            name: "C",
            active: false
        },
        {
            name: "D",
            active: false
        },
        {
            name: "E",
            active: false
        },
        {
            name: "F",
            active: false
        },
        {
            name: "G",
            active: false
        },
        {
            name: "H",
            active: false
        },
        {
            name: "I",
            active: false
        },
        {
            name: "J",
            active: false
        },
        {
            name: "K",
            active: false
        }, {
            name: "L",
            active: false
        }, {
            name: "M",
            active: false
        },
        {
            name: "N",
            active: false
        },

        {
            name: "O",
            active: false
        },
        {
            name: "P",
            active: false
        }, {
            name: "Q",
            active: false
        }, {
            name: "R",
            active: false
        },
        {
            name: "S",
            active: false
        },
        {
            name: "T",
            active: false
        }, {
            name: "U",
            active: false
        }, {
            name: "V",
            active: false
        },
        {
            name: "W",
            active: false
        },
        {
            name: "X",
            active: false
        },
        {
            name: "Y",
            active: false
        },
        {
            name: "Z",
            active: false
        }
    ],
    companyLetters: []
})


export const mutations = {

    SET_COMPANY: (state, payload) => {
        state.companies = payload.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    },
    SET_ACTIVE_COMPANY: (state, payload) =>{
        state.activeCompany  = payload
    },
    SET_COMPANY_LETTERS: (state,payload)=>{
        state.companyLetters = payload
    },
    SET_COMPANY_ACTIVE_LETTERS: (state,payload)=>{
        state.letters.forEach(function (item) {
            item.active = false
        })
        state.letters.find(i => i.name.toLowerCase() === payload.toLowerCase()).active = true
    },
}


export const actions = {

    async getCompanies({commit}) {
        const data = await apiRequest.get('posts-company');
        commit('SET_COMPANY', data.data.posts.data);
    },
    async getCompany({commit},slug){
        const data = await apiRequest.get(`posts-company/${slug}`)
        commit('SET_ACTIVE_COMPANY', data.data.post);
    },
    async getCompanyByLetter({commit}){
        const data = await apiRequest.get('posts-company-letter')
        commit('SET_COMPANY_LETTERS', data.data.posts2);
    }
}
