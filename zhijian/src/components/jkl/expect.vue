<!-- html部分 -->
<template>
	<div id="app">
    <div class="t1">
      <el-input class="aa" v-model="name1" placeholder="" clearable></el-input>
      <el-button @click='add1'>新增肯定回答</el-button>
      <table cellspacing="0" cellpadding="0">
        <h3>肯定回答</h3>
        <tr v-for='obj in aa' :key="obj.id">
          <td v-if="obj.type=='1'">{{obj.answerString}}
            <el-button type="text" class="btn" icon="el-icon-delete" @click="del(obj.id)" circle></el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="t2">
      <el-input class="aa" v-model="name2" placeholder="" clearable></el-input>
      <el-button @click='add2'>新增否定回答</el-button>
      <table cellspacing="0" cellpadding="0">
        <h3>否定回答</h3>
        <tr v-for='obj in aa' :key="obj.id">
          <td v-if="obj.type=='0'">{{obj.answerString}}
            <el-button type="text" class="btn" icon="el-icon-delete" @click="del(obj.id)" circle></el-button>
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
        aa:[]
			};
		},
		methods:{
      search(){
        var data = {type:2}
        this.$global.httpPostKey(this, '/api/v1/answer_control/query_answerControl',data).then(res => {
          this.aa = res.data
        })
      },
      add1(){
        if(this.name1==""){
          alert("新增不能为空")
        }else{
          var data = {
            answerString:this.name1,
            type:1
          }
          this.$global.httpPostKey(this, '/api/v1/answer_control/add_answerControl',data).then(res => {
            this.aa = res.data
            this.search()
          })
          this.name1=""
        }
      },
      add2(){
        if(this.name2==""){
          alert("新增不能为空")
        }else{
          var data = {
            answerString:this.name2,
            type:0
          }
          this.$global.httpPostKey(this, '/api/v1/answer_control/add_answerControl',data).then(res => {
            this.aa = res.data
            this.search()
          })
          this.name2=""
        }
      },
      del(id){
        this.$global.httpPostKey(this, '/api/v1/answer_control/delete_answerControl/'+id).then(res => {
          this.search()
        })
      }
		},
    mounted:function(){
      this.search()
    }
	}
</script>
<!-- css部分 -->
<style>
.t1 td{
  height: 40px;
  width: 200px;
  border: black 1px solid;
  text-align: left;
  line-height: 40px;
  padding-left: 20px;
}
.t2 td{
  height: 40px;
  width: 200px;
  border: black 1px solid;
  text-align: left;
  line-height: 40px;
  padding-left: 20px;
}
.t1{
  float: left;
  margin-left: 20%;
}
.t2{
  float: right;
  margin-right: 20%;
}
.aa{
  width: 200px;
}
.btn{
  float: right;
}
</style>
