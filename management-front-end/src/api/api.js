import { api } from './fetch'

export function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return api.post('/admin/login', params)
}

/**
 *  用户管理
 * */

export function getUserList(page, limit) {
  return api.get('/admin/users', {
    params: {
      page: page,
      limit: limit
    }
  })
}

export function searchUser(key, value) {
  const params = new URLSearchParams()
  params.append('key', key)
  params.append('value', value)
  return api.post('/admin/users/search', params)
}

export function updateUserPassWord(password, userId) {
  const params = new URLSearchParams()
  params.append('password', password)
  return api.post('/admin/user/' + userId + '/reset', params)
}

/**
 *  资讯管理
 * */

// 获取选择器
export function bindSelector() {
  return api.get('/admin/news/selector')
}

// 获取资讯列表
export function newsList(page, limit, type, bindId) {
  return api.get('/admin/news', {
    params: {
      page: page,
      limit: limit,
      type: type,
      bindId: bindId
    }
  })
}

// 获取资讯详情
export function newsDetail(id) {
  return api.get('/admin/news/' + id)
}

// 更新资讯
export function updateNews(id, data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.put('/admin/news/' + id, params)
}

// 创建资讯
export function createNews(title, content, type, bindId, abstract) {
  const params = new URLSearchParams()
  params.append('title', title)
  params.append('content', content)
  params.append('type', type)
  params.append('bindId', bindId)
  params.append('abstract', abstract)
  return api.post('/admin/news', params)
}

// 删除资讯
export function deleteNews(id) {
  return api.delete('/admin/news/' + id)
}

/**
 *  跟帖管理
 * */

// 获取跟帖列表
export function postNewsList(id, page, limit) {
  return api.get('/admin/posts/news/' + id, {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 删除跟帖
export function deletePostNews(id) {
  return api.delete('/admin/post/' + id)
}

/**
 *  评论管理
 * */

// 获取评论列表
export function commentsList(id, page, limit) {
  return api.get('/admin/comments/' + id, {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 删除跟帖
export function deleteComments(id) {
  return api.delete('/admin/post/' + id)
}

/**
 *  平台管理
 * */

// 平台列表
export function platformList(page, limit) {
  return api.get('/admin/platforms', {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 平台详情
export function platformDetail(id) {
  return api.get('/admin/platform/' + id)
}

// 更新平台
export function updatePlatform(id, data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.put('/admin/platform/' + id, params)
}

// 创建平台
export function createPlatform(data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.post('/admin/platform', params)
}

// 删除平台
export function deletePlatform(id) {
  return api.delete('/admin/platform/' + id)
}

/**
 *  Banner管理
 * */

// 获取Banner列表
export function bannerList(page, limit) {
  return api.get('/admin/banners', {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 获取Banner详情
export function bannerDetail(id) {
  return api.get('/admin/banner/' + id)
}

// 更新Banner
export function updateBanner(id, data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.put('/admin/banner/' + id, params)
}

// 创建Banner
export function createBanner(data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.post('/admin/banner', params)
}

// 删除Banner
export function deleteBanner(id) {
  return api.delete('/admin/banner/' + id)
}

/**
 *  货币管理
 * */

// 获取货币列表
export function coinList(page, limit) {
  return api.get('/admin/coins', {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 获取货币详情
export function coinDetail(id) {
  return api.get('/admin/coin/' + id)
}

// 更新货币
export function updateCoin(id, data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.put('/admin/coin/' + id, params)
}

// 删除货币
export function deleteCoin(id) {
  return api.delete('/admin/coin/' + id)
}

// 创建货币
export function createCoin(data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.post('/admin/coin', params)
}
/**
 *  指数管理
 * */

// 获取指数列表
export function indexsList(page, limit) {
  return api.get('/admin/indexs', {
    params: {
      page: page,
      limit: limit
    }
  })
}

// 获取指数详情
export function indexsDetail(id) {
  return api.get('/admin/index/' + id)
}

// 创建指数
export function createIndex(data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.post('/admin/index', params)
}

// 更新指数
export function updateIndex(id, data) {
  const params = new URLSearchParams()
  params.append('data', data)
  return api.put('/admin/index/' + id, params)
}

// 删除货币
export function deleteIndex(id) {
  return api.delete('/admin/index/' + id)
}
