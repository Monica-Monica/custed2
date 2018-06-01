const newsText = {
  state: {
    newsData: {
      title: '',
      content: '',
      type: '',
      coinId: ''
    }
  },

  mutations: {
    SET_NEWSDATA: (state, newsData) => {
      state.newsData = newsData
    }
  },

  actions: {
    SetNewsData({ commit }, newsData) {
      commit('SET_NEWSDATA', newsData)
    }
  }
}

export default newsText
