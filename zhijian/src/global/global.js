import axios from 'axios'
export default{
  // baseUrl: '/upload',
  baseUrls:'http://116.62.135.192:8763',
  baseUrls2:'http://116.62.135.192:8762',
  baseUrlv:'http://116.62.135.192:8762',
  // baseUrl: '/http://localhost:6784/',
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  // postHttpData: function (data) {
  //   var temp = new FormData()
  //   for (var i in data) {
  //     if (data[i] != null) {
  //       temp.append(i, data[i])
  //     }
  //   }
  //   return temp
  // },
  // postHttpDataWithToken: function (data) {
  //   var temp = this.postHttpData(data)
  //   temp.append('token', this.getToken())
  //   return temp
  // },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  isNotNull(data) {
    var temp = true
    for (var i in data) {
      if (data[i] == null) {
        return false
      }
    }
    return temp
  },
  mapGet(obj, data) {
        var self = this
        return new Promise((resolve, reject) => {
            axios.get('https://restapi.amap.com/v3/geocode/geo?key=06523358ff86b422149a52ecc4d8a0bb' + this.getHttpData(data))
                .then((res) => {
                    if (res.data.status === '1') {
                        resolve(res);
                    } else {
                        self.error(obj, '高德地图访问出现问题', '')
                    }
                }).catch(err => {
                    self.error(obj, '网络连接错误', '')
                        // reject();
                });
        });
  },
  prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  },
  httpGetWithBaseUrl(self,url,data){
    return new Promise((resolve, reject) => {
      axios.get(encodeURI(this.baseUrl + url + "?" + this.getHttpData(data))).then((res)=>{
          if(res.data.status == 1){
            resolve(res.data)
          }else {
            this.error(self,res.data.message,'')
            reject(res.data.message)
          }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpGetWithToken(self,url,data){
    return new Promise((resolve, reject) => {
      axios.get(this.baseUrl + url + "?token="+this.getToken() + this.getHttpData(data)).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpVideoPost(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrlv + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPost(self,url,data,config){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrls + url,data,config).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpKeyWord(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrls + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPostKey(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrls + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPostaddTask(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrls2 + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpGet(self,url,data){
    return new Promise((resolve, reject) => {
      axios.get(this.baseUrl + url,data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((res)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  httpPostWithToken(self,url,data){
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + url + "?token="+this.getToken(),data).then((res)=>{
        if(res.data.status == 1){
          resolve(res.data)
        }else {
          this.error(self,res.data.message,'')
          reject(res.data.message)
        }
      }).catch((error)=>{
        this.error(self,'网络错误','')
      })
    })
  },
  getToken: function () {
    return localStorage.getItem('syswtoken')
  },
  setToken: function (token) {
    localStorage.setItem('syswtoken', token)
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('syswuser'))
  },
  setUser: function (caruser) {
    localStorage.setItem('syswuser', JSON.stringify(caruser))
    this.setToken(caruser.token)
  },
  logout: function () {
    localStorage.removeItem('cyguser')
    localStorage.removeItem('cygtokentime')
    localStorage.removeItem('cygtoken')
  },
  convertData(data,geoCoordMap) {
      console.log(geoCoordMap)
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push(geoCoord.concat(data[i].value));
          }
      }
      return res;
  },
  getDate(date) {
    return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+" "+date.getHours()+":"+(date.getMinutes()>9 ? date.getMinutes(): '0'+date.getMinutes())+":"+(date.getSeconds()>9 ? date.getSeconds():'0'+date.getSeconds())
  },
}
