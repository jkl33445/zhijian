import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/jkl/index'
// import index2 from '@/components/jkl/index2'
// import index4 from '@/components/jkl/index4'
import video from '@/components/jkl/video'
import index5 from '@/components/jkl/index5'
import task from '@/components/jkl/task'
import index5add1 from '@/components/jkl/index5add1'
import index5add2 from '@/components/jkl/index5add2'
import index5edit from '@/components/jkl/index5edit'
import home from '@/components/jkl/home'
import homeh from '@/components/jkl/homeh'
import homes from '@/components/jkl/homes'
import keyword from '@/components/jkl/keyword'
import expect from '@/components/jkl/expect'
import hhome from '@/components/jkl/hhome'
import homehome from '@/components/jkl/homehome'
import homehome2 from '@/components/jkl/homehome2'
import Menu from '@/components/jkl/Menu'
import Main from '@/components/jkl/Main'
import Main2 from '@/components/jkl/Main2'
import upload from '@/components/jkl/upload'
import upload2 from '@/components/jkl/upload2'
// import homeDemo1 from '@/components/jkl/homeDemo1'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/index',name: 'index',component: index},
    // {path: '/index2',name: 'index2',component: index2},
    // {path: '/index4',name: 'index4',component: index4},
    {path: '/',name: 'Main',component: Main,children:[
      {path: '/video',name: 'video',component: video},
      {path: '/index5',name: 'index5',component: index5},
      {path: '/task',name: 'task',component: task},
      {path: '/index5add1',name: 'index5add1',component: index5add1},
      {path: '/index5add2',name: 'index5add2',component: index5add2},
      {path: '/index5edit',name: 'index5edit',component: index5edit},
      {path: '/home',name: 'home',component: home},
      {path: '/homeh',name: 'homeh',component: homeh},
      {path: '/expect',name: 'expect',component: expect},
      {path: '/hhome',name: 'hhome',component: hhome},
      {path: '/homehome',name: 'homehome',component: homehome},
      {path: '/home2',name: 'homehome2',component: homehome2},
      {path: '/Menu',name: 'Menu',component: Menu},
      {path: '/Main2',name: 'Main2',component: Main2},
      {path: '/upload2',name: 'upload2',component: upload2},


    ]},
    {path: '/homes',name: 'homes',component: homes},
    {path: '/keyword',name: 'keyword',component: keyword},
    {path: '/upload',name: 'upload',component: upload},
    // {path: '/homeDemo1',name: 'homeDemo1',component: homeDemo1},

  ]
})
