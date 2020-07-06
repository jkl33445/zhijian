<!-- html部分 -->
<template>
  <div style="width: 70%;margin: 0px auto;">
    <div style="text-align: left;margin-bottom: 25px;">
      <span>产品名称&nbsp;&nbsp;</span>
      <el-input style='width: 200px;' v-model="cname" placeholder="" clearable></el-input>&nbsp;&nbsp;
      <el-button @click='add'>新增任务</el-button>
    </div>
    <el-table :data="json" border="">
      <template slot="empty">
      	<span v-if="isshow">暂无数据</span>
      	<span v-if="!isshow"></span>
      </template>
      <el-table-column align='center' prop="number" label="任务编号"></el-table-column>
      <el-table-column align='center' prop="name" label="任务名称"></el-table-column>
      <el-table-column align='center' prop="process" label="所属环节"></el-table-column>
      <el-table-column align='center' prop="subTaskCount" label="子任务数"></el-table-column>
      <el-table-column align='center' prop="taskTime" label="任务时长"></el-table-column>
      <el-table-column align='center' prop="intro" label="任务描述"></el-table-column>
      <el-table-column align='center' v-if="json.length!=0">
      	<template slot-scope="scope">
      		<el-button size='small' type="text" @click='add2(scope.row)'>新增子任务</el-button><br>
      		<el-button size='small' type="text" style="margin-left: 0px;" @click='search(scope.row,"click")'>查看子任务</el-button>
      	</template>
      </el-table-column>
    </el-table>
    <el-table :data="data2" border="" style="margin-top: 60px;">
      <template slot="empty">
      	<span v-if="isshow2">暂无数据</span>
      	<span v-if="!isshow2"></span>
      </template>
      <el-table-column align='center' prop="number" label="子任务编号"></el-table-column>
      <el-table-column align='center' prop="type" label="子任务类型"></el-table-column>
      <el-table-column align='center' prop="name" label="子任务名称"></el-table-column>
      <el-table-column align='center' prop="name1" label="所属任务"></el-table-column>
      <el-table-column align='center' prop="content" label="检测内容"></el-table-column>
     <!-- <el-table-column align='center' prop="contentType" label="主要内容类型">
        <template slot-scope="scope">
        	<span v-if="scope.row.contentType===0">陈述句</span>
        	<span v-else-if="scope.row.contentType===1">对话</span>
        </template>
      </el-table-column> -->
      <el-table-column align='center' prop="role" label="角色"></el-table-column>
      <el-table-column align='center' prop="keywords" label="比对内容"></el-table-column>
      <el-table-column align='center' prop="acThreshold" label="相似度阀值"></el-table-column>
      <el-table-column align='center' prop="answer" label="期望结果"></el-table-column>
      <el-table-column align='center' v-if="data2.length!=0">
      	<template slot-scope="scope">
      		<el-button size='small' type="text" @click='edit(scope.row)'>修改</el-button>
      		<el-button size='small' type="text" @click='del(scope.row)'>删除</el-button>
      	</template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 40px;">
    	<el-col :span="24">
    		<el-button @click='save'>保存产品</el-button>
    		<el-button @click='cancel'>取消保存</el-button>
    	</el-col>
    </el-row>
  </div>
</template>
<!-- js部分 -->
<script>
  export default {
    data() {
      return {
        cname: '',
        number: '',
        list: [],
        json: [],
        json2: [],
        acThreshold:[],
        data:'',
        data1:'',
        data2:[],
        name1:null,
        isshow:false,
        isshow2:false
      };
    },
    methods: {
      add(){
      	//路由跳转增加任务
      	this.$router.push({path:'/index5add1'});
      },
      add2(row){
      	//路由跳转到增加子任务
      	this.$router.push({name:'index5add2',params:{name:row.name}});
      },
      //查询子任务
      search(row,v){
        for (var i = 0; i < this.data1.length; i++) {
          if(this.data1[i].name===this.name1){
            this.data2 = this.data1[i].subTasks
            this.name1 = null
          }else if(row!=undefined){
            if(this.data1[i].name === row.name){
              this.data2 = this.data1[i].subTasks
            }
          }

        }
        if(v==='click'){
          this.isshow2=true
        }

      },
      //修改子任务
      edit(row){
        var a
        for (var i = 0; i < this.data2.length; i++) {
          if(this.data2[i].number===row.number){
            for (var j = 0; j < this.json2.length; j++) {
              if(this.data2[i].number===this.json2[j].number){
                a = j
              }
            }
          }
        }
        row.a = a
        console.log(row)
        this.$router.push({name:'index5edit',params:{row:row}})
      },
      //删除子任务
      del(row){
        for (var i = 0; i < this.data2.length; i++) {
          if(this.data2[i].number===row.number){

            for (var j = 0; j < this.json2.length; j++) {
              if(this.data2[i].number===this.json2[j].number){
                this.json2.splice(j,1)
                var a = j
                this.$store.commit('del',a)
              }
            }
            this.data2.splice(i,1)

          }
        }
      },
      //子任务编号
      subtaskNumber(){
        for (var j = 0; j < this.json.length; j++) {
          this.json[j].subTaskCount=0
          var a=1
          var b=1
          for (var i = 0; i < this.json2.length; i++) {
            if(this.json[j].name==this.json2[i].name1){
              this.json[j].subTaskCount = b;
              b++
              this.json2[i].number = j+1+"."+a++
            }
          }
        }
      },
      //整合数组
      array(){
        //深复制 子任务传给主任务
        this.data1 = JSON.parse(JSON.stringify(this.json));
        let data2 = JSON.parse(JSON.stringify(this.json2));
        for (var j = 0; j < this.data1.length; j++) {
          for (var i = 0; i < data2.length; i++) {
            if(this.data1[j].name==data2[i].name1){
              this.data1[j].subTasks.push(data2[i])
            }
          }
        }
        // console.log(this.data1)
      },
      save() {
        if(this.cname===null||this.cname===""){
          this.$message.error('产品名称不能为空');
        }else{
          this.$confirm('请确定是否保存此产品', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            var data = {
              "number": this.data1.length,
              "name": this.cname,
              "tasks": this.data1
            }
            //给后端传值
            this.$global.httpPostaddTask(this, '/api/v1/task/addProduct ',data).then(res => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            })
            //返回到主页面之前进行销毁数据
            this.$store.commit('xiaoh')
            this.$router.push({
              path: 'task'
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            });
          });
        }

      },
      //返回到查询
      cancel() {
        this.$confirm('是否返回到主页面？选择确定后当前任务将无法保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$store.commit('xiaoh')
          this.$router.push({
            path: 'task'
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });


      }
    },
    mounted: function() {
      this.name1 = this.$route.params.name1
      //vuex接收
      var count = this.$store.state.count
      var count2 = this.$store.state.count2
      this.cname = this.$store.state.cname
      for (var i = 0; i < count.length; i++) {
        count[i].number = i+1;
        this.json.push(count[i])
      }
      for (var i = 0; i < count2.length; i++) {
        this.json2.push(count2[i])
      }
      this.subtaskNumber()
      this.array()
      this.search()
    },
    destroyed:function(){
      var cname = this.cname
      this.$store.commit('updt',cname)
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
  .el-message-box button{
    color: #606266 !important;
    background-color: #FFF !important;
    border: 1px solid #DCDFE6;
  }
  .el-message-box button:hover{
    border: 1px solid #c6e2ff;
    background-color: #ecf5ff;
  }
</style>
