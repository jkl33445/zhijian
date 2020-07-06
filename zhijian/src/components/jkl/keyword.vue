<!-- html部分 -->
<template>
	<div id="app" class="app">
    <div class="t1">
      <el-input class="input" v-model="name1" placeholder="" clearable></el-input>
      <el-button @click='add1'>新增关键字</el-button>
      <table cellspacing="0" cellpadding="0">
        <h3 class="vv">关键字</h3>
        <tr v-for='obj in aa' :key="obj.id">
          <td>{{obj.answerString}}
            <el-button type="text" class="btn" icon="el-icon-delete" @click="del1(obj.id)" circle></el-button>
            <el-button type="text" class="btn" icon="el-icon-search" @click="search2(obj.id,obj.answerString)" circle></el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="t2">
      <el-input class="input" v-model="name2" placeholder="" clearable></el-input>
      <el-button @click='add2'>新增同义词</el-button>
      <table cellspacing="0" cellpadding="0">
        <h3 class="vv">关键字关联同义词{{answerString}}</h3>
        <tr v-for='obj in bb' :key="obj.id">
          <td>{{obj.synonym}}
            <el-button type="text" class="btn" icon="el-icon-delete" @click="del2(obj.id)" circle></el-button>
          </td>
        </tr>
      </table>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
        name1:'',
        name2:'',
        id:'',
        cid:'',
        answerString:'',
        aa:[],
        bb:[]

			};
		},
		methods:{
      search1(){
        var data = {type:3}
        this.$global.httpKeyWord(this, '/api/v1/answer_control/query_answerControl',data).then(res => {
          this.aa = res.data
        })
      },
      del1(id){
        this.$global.httpKeyWord(this, '/api/v1/answer_control/delete_answerControl/'+id).then(res => {
          this.search1()
        })
      },
      add1(){
        if(this.name1==""){
          this.$message.error('新增不能为空');
        }else{
          var data = {
            answerString:this.name1,
            type:3
          }
          this.$global.httpPostKey(this, '/api/v1/answer_control/add_answerControl',data).then(res => {
            this.aa = res.data
            this.search1()
          })
          this.name1=""
        }
      },
      search2(id,answerString){
        if(answerString!=undefined){
          this.answerString = answerString
        }
        var data
        if(id!=undefined){
          data = {keywordId:id}
        }else{
          data = {keywordId:this.cid}
        }
        // this.id = this.$route.params.id
        this.bb=[]
        this.cid = data.keywordId
        this.$global.httpKeyWord(this, '/api/v1/answer_control/query_keyword_synonym',data).then(res => {
          if(res.data[0]!=null){
            this.bb = res.data[0].synonymList
          }
        })
      },
      add2(){
        if(this.name2==""){
          this.$message.error('新增不能为空');
        }else{
          var data = {
            keywordId:this.cid,
            synonym:this.name2
          }
          this.$global.httpPostKey(this, '/api/v1/answer_control/add_keyword_synonym',data).then(res => {
            this.aa = res.data
            this.search1()
            this.search2()
          })
          this.name2=""
        }
      },
      del2(id){
        // this.$global.httpKeyWord(this, '/api/v1/answer_control/delete_answerControl/'+id).then(res => {
        //   this.search1()
        // })
      },
		},
    mounted:function(){
      this.search1()
    }
	}
</script>
<!-- css部分 -->
<style>
.t1 td{
  height: 40px;
  width: 400px;
  border: black 1px solid;
  text-align: left;
  line-height: 40px;
  padding-left: 20px;
}
.t2 td{
  height: 40px;
  width: 400px;
  border: black 1px solid;
  text-align: left;
  line-height: 40px;
  padding-left: 20px;
}
.t1{
  width: 400px;
  float: left;
  margin-left: 20%;
}
.t2{
  width: 400px;
  float: right;
  margin-right: 20%;
}
.vv{
  margin-top: 20px;
  float: left;
}
.input{
  width: 200px;
}
.btn{
  float: right;
}
</style>
