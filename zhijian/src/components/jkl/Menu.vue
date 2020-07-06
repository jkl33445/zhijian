<!-- html部分 -->
<template>
	<div id="app" style="margin-top: -40px;">
    <div style="height: 60px;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        style="float: right;"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <span v-for="obj in arr" style="display: inline-block;width: 150px;">

        	<el-submenu v-show='obj.children' :index='obj.index'>
        		<template slot="title">
        			<span>{{obj.text}}</span>
        		</template>
        		<el-menu-item-group>
        			<el-menu-item :index='item.index' v-for="item in obj.children" :key='item.text' @click='fn(item)'>{{item.text}}</el-menu-item>
        		</el-menu-item-group>
        	</el-submenu>
          <el-menu-item v-show='!obj.children' :index='obj.index' @click='fn(obj)'>
          	<span slot="title">{{obj.text}}</span>
          </el-menu-item>
        </span>
      </el-menu>
    </div>


	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
				activeIndex:'103',
        arr:[
        	{text:'质检规则',index:'101',children:[
        		{text:'规则查询',index:'1011',url:'/task'},
        		{text:'规则设置',index:'1012',url:'/index5'}
        	]},
        	{text:'双录资料',index:'102',children:[
        		{text:'资料查询',index:'1021',url:'/video'},
        		{text:'资料上传',index:'1022',url:'/upload2'}
        	]},
        	{text:'质检结果',index:'103',url:'/home'}
        ]
			};
		},
		methods:{
			fn(obj){
				this.$router.push({path:obj.url});
			}
		},
    mounted:function(){
      var obj={}
      obj.url='/home'
      this.fn(obj)
    }
	}
</script>
<!-- css部分 -->
<style>

</style>
