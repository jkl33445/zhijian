<!-- html部分 -->
<template>
	<div id="app">
    <Menu></Menu>
    <Main2 style="min-height: 650px;"></Main2>
    <div style="text-align: left;margin-left: 40px;color: #909399;font-size: 14px;">
      <span>{{week}}&nbsp;&nbsp;{{gettime}}</span><br>
      <span>双录智能质检演示接口</span>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
  import Menu from './Menu'
  import Main2 from './Main2'
	export default {
    components:{Menu,Main2},
		name:'',
		data() {
			return {
        gettime:'',
        week:'',
			};
		},
		methods:{
      getTime:function(){
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        //星期几
        var now = new Date();
        var day = now.getDay();
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        this.week = weeks[day];
      },
		},
    mounted:function(){
      this.getTime()
    }
	}
</script>
<!-- css部分 -->
<style>

</style>
