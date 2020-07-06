<!-- html部分 -->
<template>
  <div id="app">
    <h1>新建任务</h1>
    <div style="width: 40%;margin: 40px auto;border: 1px solid #C9C9C9;padding-top: 20px;">
      <div style="width: 70%;height: 330px; margin: 0 auto;">
        <span class="s1"><span>任务名称&#12288;&#12288;&#12288;</span><el-input style='width:70%' v-model='name'></el-input></span><br>
        <span class="s1"><span>所属工作环节&#12288;</span><el-input style='width:70%' v-model='process'></el-input></span><br>
        <span class="s1" style="height: 60px;margin-bottom: 15px;">
          <span style="display: inline-block;line-height: 60px;">任务描述</span>&#12288;&#12288;&nbsp;&nbsp;&nbsp;
          <el-input type="textarea" :rows="2" :autosize='false' v-model="intro" style='width:70%'></el-input></span><br>
        <span class="s1"><span>任务时长(秒)&nbsp;&#12288;</span><el-input style='width:70%' v-model='taskTime'></el-input></span><br>
        <div style="margin-top: 20px;margin-bottom: 40px;">
          <el-button @click='save' style="width: 47%;float: left;">保存</el-button>
          <el-button @click='cancel' style="width: 47%;float: right;">取消</el-button>
        </div>
      </div>


    </div>

  </div>
</template>
<!-- js部分 -->
<script>
  export default {
    name: '',
    data() {
      return {
        name: '',
        taskTime: '',
        process: '',
        intro: '',
        list: ''
      };
    },
    methods: {
      save() {
        this.list={name:this.name, taskTime :this.taskTime , process :this.process , intro :this.intro ,subTasks:[]}
        var list = this.list
        var count = this.$store.state.count
        var isflg = true;
        for (var i = 0; i < count.length; i++) {
          if(count[i].name==list.name){
            isflg = false
            this.$message.error('不能输入已有任务名');
            break
          }
        }
        if(list.name==''){
          isflg = false
          this.$message.error('任务不能为空');
        }
        if(isflg == true){
          this.$store.commit('add',list)
          this.$router.push({path: '/index5',});
        }
      },
      cancel() {
        this.$router.go(-1);
      },
    }
  }
</script>
<!-- css部分 -->
<style scoped>
.col{
  float: left;
}
.s1{
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  height: 40px;
}
.s1 span{
  display: inline-block;
  float: left;
  line-height: 40px;
}
.s1 .el-input{
  float: right;
}
.s1 .el-textarea{
  float: right;
}
</style>
