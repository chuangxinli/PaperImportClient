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
axios.interceptors.request.use(config => {
  if (obj_options instanceof Object && obj_options.loading) {
    loadingInstance = Loading.service(loadOptions)
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
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
  return res.data;
  /*if (res.data.recode == 404) {
    Message({
      message: '出现了未知的错误!',
      type: 'warning',
      showClose: true
    })
    return ''
  } else if (res.data.recode == 1) {
    Message.error(res.data.errmsg)
    return ''
  } else if (res.data.recode == 99) {
    Message({
      message: '会话已过期,请重新登录!',
      type: 'warning',
      showClose: true
    })
    setTimeout(function () {
      //location.href = global.return_url
    }, 2000)
    return ''
  } else if (res.data) {
    return res.data
  }*/
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
        timeout: 3000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    } else {
      return axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        timeout: 3000,
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
