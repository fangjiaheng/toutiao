import request from '@/utils/request.js'
import store from '@/store/'

export const sendCode = (mobile) => {
  // 发送 POST 请求
  return request({
    method: 'GET',
    url: '/mp/v1_0/captchas/' + mobile
  })
}

export const login = (user) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: user // 手机号和验证码
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
      authorizations: `Bearer ${store.state.user.token}`
    }
  })
}
