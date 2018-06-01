const bindQuery = {
  state: {
    bindQuery: {}
  },

  mutations: {
    SET_BINDQUERY: (state, bindQuery) => {
      state.bindQuery = bindQuery
    }
  },

  actions: {
    SetBindQuery({ commit }, bindQuery) {
      commit('SET_BINDQUERY', bindQuery)
    }
  }
}

export default bindQuery
