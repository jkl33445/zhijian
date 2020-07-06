<!-- html部分 -->
<template>
  <div style="width: 70%;margin: 0px auto;">
    <div style="text-align: left;margin-bottom: 25px;">
      <span>销售产品名称&nbsp;&nbsp;</span>
      <el-input style='width: 200px;' v-model="cname" placeholder="" clearable></el-input>&nbsp;&nbsp;
      <el-button @click='search'>搜索</el-button>
      <!-- <el-button @click='add'>新增销售产品</el-button> -->
    </div>
    <h1 style="margin-bottom: 40px; margin-top: 15px;">任务清单</h1>
    <el-table :data="dataTask" border="">
      <template slot="empty">
      	<span v-if="isshow">暂无数据</span>
      	<span v-if="!isshow"></span>
      </template>
      <el-table-column align='center' prop="number" label="任务编号" ></el-table-column>
      <el-table-column align='center' prop="name" label="任务名称" width="130%"></el-table-column>
      <el-table-column align='center' prop="process" label="所属环节" width="190%"></el-table-column>
      <el-table-column align='center' prop="subTaskCount" label="子任务数"></el-table-column>
      <el-table-column align='center' prop="taskTime" label="任务时长"></el-table-column>
      <el-table-column align='center' prop="intro" label="任务描述" width="400%"></el-table-column>
      <el-table-column align='center' v-if="dataTask.length!=0" width="100%">
      	<template slot-scope="scope">
      		<el-button size='small' type="text" @click='zrw(scope.row)'>查看子任务</el-button>
      	</template>
      </el-table-column>
    </el-table>
    <h1 style="margin-top: 40px;">子任务明细</h1>
    <el-table :data="dataSubTask" border="" style="margin-top: 40px;margin-bottom: 40px;">
      <template slot="empty">
      	<span v-if="isshow2">暂无数据</span>
      	<span v-if="!isshow2"></span>
      </template>
      <el-table-column align='center' prop="number" label="子任务编号" width="91%" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="type" label="子任务类型" width="91%" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="name" label="子任务名称" width="140%" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="name1" label="所属任务" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="content" label="检测内容" width="350%" :resizable="false"></el-table-column>
      <!-- <el-table-column align='center' prop="contentType" label="主要内容类型">
        <template slot-scope="scope">
        	<span v-if="scope.row.contentType==0">陈述句</span>
        	<span v-if="scope.row.contentType==1">对话</span>
        </template>
      </el-table-column> -->
      <el-table-column align='center' prop="role" label="角色" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="keywords" label="比对内容" width="200%" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="acThreshold" label="相似度阀值" width="95%" :resizable="false"></el-table-column>
      <el-table-column align='center' prop="answer" label="期望结果" :resizable="false"></el-table-column>
    </el-table>

  </div>
</template>
<!-- js部分 -->
<script>
  export default {
    data() {
      return {
        cname: '',
        list: [],
        data: [],
        dataTask: [],
        dataSubTask : [],
        isshow:false,
        isshow2:false
      };
    },
    methods: {
      search() {
        this.dataSubTask = new Array
        this.dataTask = new Array
        var data =  {
            keyWord:null,
            page:0,
            size:0
        }
        this.$global.httpPostaddTask(this, '/api/v1/task/queryTasks', data).then(res => {
            this.data = res.data;
            var a = 1
            //将查询到的产品进行解析
            for(var i = 0; i < this.data.length; i++){
              //当搜索栏为空时数据为全部
              // if(this.cname == ""){
              //   var dataTask = this.data[i].tasks
              //   if(dataTask!=undefined){
              //     for (var j = 0; j < dataTask.length; j++) {
              //       dataTask[j].number = a++
              //       this.dataTask.push(dataTask[j])
              //     }
              //   }
              // //数据跟搜索栏保持一致
              // }else
              if(this.data[i].name === this.cname&&this.cname!=""){
                var dataTask = this.data[i].tasks
                if(dataTask!=undefined){
                  for (var j = 0; j < dataTask.length; j++) {
                    dataTask[j].number = a++
                    this.dataTask.push(dataTask[j])
                  }
                }
              }
            }
            this.isshow=true
        })
      },
      add(){
      	//路由跳转到增加产品
        this.$store.commit('xiaoh')
      	this.$router.push({path:'/index5'});
      },
      //查询子任务
      zrw(row){
        this.dataSubTask = new Array
        for (var i = 0; i < row.subTasks.length; i++) {
          this.dataSubTask.push(row.subTasks[i])
          this.dataSubTask[i].name1 = row.name
          this.dataSubTask[i].number = row.number+"."+(i+1)
        }
        this.isshow2=true
      },
    },
    mounted: function() {
      // this.search();
    }
  }
</script>
<!-- css部分 -->
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
