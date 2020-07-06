<!-- html部分 -->
<template>
	<div style="width: 830px;margin: 0px auto;">
		<el-table :data="list" style='width: 830px;'>
			<el-table-column align='center' prop="userid" label="音译内容片段"></el-table-column>
			<el-table-column align='center' prop="cname" label="质检类型"></el-table-column>
			<el-table-column align='center' prop="username" label="质检比对内容"></el-table-column>
			<el-table-column align='center' prop="password" label="所属任务名称"></el-table-column>
			<el-table-column align='center' prop="telno" label="所属子任务名称"></el-table-column>
			<el-table-column align='center' prop="email" label="检测日期"></el-table-column>
		</el-table>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				compid:'',
				cname:'',
				username:'',
				list:[]
			};
		},
		methods:{
			search(){
				// // 后端网址
				// var url = this.baseUrl+"/baseUser/search"
				// // 传递给后端的数据
				// var data = {compid:this.compid,username:this.username,cname:this.cname};
				// this.$axios.post(url,this.$qs.stringify(data),{
				// 	headers: {
				// 		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				// 	}
				// }).then(res=>{
				// 	this.list = res.data;
				// })
			}
		},
		mounted:function(){
			// this.search();
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
