import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//state对象用来存储数据
var state = {
  count:[],
  count2:[],
  cname:'',
  id:''
}
//mutations对象用来存储方法
var mutations = {
  add(state,list){
    state.count.push(list)
  },
  add2(state,list2){
    state.count2.push(list2)
  },
  updt(state,cname){
    state.cname=cname
  },
  xiaoh(state){
    state.count = new Array
    state.count2 = new Array
    state.cname = ''
  },
  del(state,a){
    state.count2.splice(a,1)
  },
  edit(state,list2){
    state.count2[list2.a]=list2
  }
}
// 创建一个store对象,并暴露出去 store对象有两个属性,state和mutations
export default new Vuex.Store({
	state,
	mutations
})
