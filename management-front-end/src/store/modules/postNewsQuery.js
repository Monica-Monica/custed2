const newsText = {
  state: {
    postNewsQuery: {
      title: '',
      content: '',
      type: '',
      coinId: ''
    }
  },

  mutations: {
    SET_POSTNEWSQUERY: (state, postNewsQuery) => {
      state.postNewsQuery = postNewsQuery
    }
  },

  actions: {
    SetPostNewsQuery({ commit }, postNewsQuery) {
      commit('SET_POSTNEWSQUERY', postNewsQuery)
    }
  }
}

export default newsText
