import axios from 'axios'
import qs from 'qs'
import global from './global'
import {Loading, Message} from 'element-ui'
import router from './router'
let loadingInstance
let obj_options = {}
let loadOptions = {
  lock: true,
  text: 'Loading...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.5)'
}
axios.defaults.baseURL = global.api_url
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  if (obj_options instanceof Object && obj_options.loading) {
    loadingInstance = Loading.service(loadOptions)
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    //console.log(document.cookie)
    if (obj_options instanceof Object && obj_options.loading) {
      loadingInstance.close()
    }
    return response
  },
  error => {
    if (obj_options instanceof Object && obj_options.loading) {
      loadingInstance.close()
    }
    return Promise.resolve(error.response)

  }
)

function checkStatus(response) {
  if (response) {
    if (response.status === 200 || response.status === 304) {
      return response
    }
  }
  return {
    data: {
      recode: 404,
    }
  }
}

function checkCode(res) {
  if (res.data.recode == 404) {
    Message({
      message: '数据请求失败!',
      type: 'warning',
      showClose: true
    })
    return ''
  } else if (res.data.recode == 1006) {
    Message({
      message: '用户为登录或会话已经失效!',
      type: 'warning',
      showClose: true
    })
    setTimeout(function () {
      router.push({
        path: '/Signin'
      })
    }, 2000)
    return ''
  } else if (res.data.recode == 0) {
    return res.data
  } else {
    Message.error(res.data.errmsg)
    return ''
  }
}
export default {
  post(url, data, obj) {
    if (obj instanceof Object) {
      obj_options = obj
    }
    if (obj_options instanceof Object && obj_options.baseUrl) {
      return axios({
        method: 'post',
        url,
        baseURL: obj_options.baseUrl,
        data: qs.stringify(data),
        timeout: 30000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    } else {
      return axios({
        method: 'post',
        url,
        data: data,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    }
  },
  get(url, params, obj) {
    if (obj instanceof Object) {
      obj_options = obj
    }
    if (obj_options instanceof Object && obj_options.baseUrl) {
      return axios({
        method: 'get',
        url,
        baseURL: obj_options.baseUrl,
        params,
        timeout: 3000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    } else {
      return axios({
        method: 'get',
        url,
        params,
        timeout: 3000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    }
  }
}
