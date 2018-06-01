const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  newsData: state => state.newsData.newsData,
  postNewsQuery: state => state.postNewsQuery.postNewsQuery,
  commentQuery: state => state.commentQuery.commentQuery,
  bindQuery: state => state.bindQuery.bindQuery
}
export default getters
