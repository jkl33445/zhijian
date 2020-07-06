<!-- html部分 -->
<template>
	<div id="app">
    <div id='dd'>
      <h3>双录智能质检演示接口</h3>
        <a class='a' href="/#/task">规则设置</a>
        <a class='a' href="/#/video">双录资料</a>
        <a class='a' href="/#/home">质检结果</a>
   </div>
                <!-- <img :src="tu1" alt="">
                <img :src="tu2" alt=""> -->
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
        // tu1:'',
        // tu2:''
			};
		},
		methods:{
      // ss(){
      //   this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryVideoFaceImg/'+"").then(res => {
      //       this.tu1 = 'data:image/jpg;base64,' + res.data.imagelist[0];
      //       this.tu2 = 'data:image/jpg;base64,' + res.data.imagelist[0];
      //       // this.newdata.push(tempdata);
      //       // console.log(tempdata)
      //   })
      // }
		},
    mounted(){
      // this.ss()
    }
	}
</script>
<!-- css部分 -->
<style>
  .a{
    margin-left: 50px;
    margin-right: 50px;
    color: black;

    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    text-decoration:underline;
  }
  h3{
    margin-bottom: 100px;
  }
</style>
