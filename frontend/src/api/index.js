import axios from "axios";

axios.defaults.baseURL = ""
axios.defaults.headers.post["Content-Type"] = "application/json"

/*
  Function Usage Sample:
  ajax("/api/user/login", "post", {
    data: {}
    params:{}
  }).then(res => {  
    ...
  })
  
*/

const ajax = (url, method, options) => {
  var AUTH_TOKEN = "Bearer " + (localStorage.getItem("authToken") ? localStorage.getItem("authToken") : "");
  if (options !== undefined) {
    var { params = {}, data = {} } = options
  } else {
    params = data = null
  }
  return new Promise((resolve, reject) => {
    axios({ url, method, params, data, headers: { 'Authorization': AUTH_TOKEN } }).then(res => {
      resolve(res)
    }, res => {
      reject(res)
    })
  })
}

export default ajax