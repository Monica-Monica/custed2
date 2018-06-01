const commentQuery = {
  state: {
    commentQuery: {}
  },

  mutations: {
    SET_COMMENTQUERY: (state, commentQuery) => {
      state.commentQuery = commentQuery
    }
  },

  actions: {
    SetCommentQuery({ commit }, commentQuery) {
      commit('SET_COMMENTQUERY', commentQuery)
    }
  }
}

export default commentQuery
