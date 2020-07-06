<!-- html部分 -->
<template>
	<div id="app">
    <h1 style="margin-bottom: 40px;">修改子任务</h1>
    <div style="width: 40%;margin: 40px auto;border: 1px solid #C9C9C9;padding-top: 20px;">
      <div style="width: 70%;height: 630px; margin: 0 auto;">
        <span class="s1"><span>所属任务&#12288;&#12288;</span><el-input style='width:70%' v-model='row.name1' :disabled="true"></el-input></span><br>
        <span class="s1"><span>子任务名称&#12288;</span><el-input style='width:70%' v-model='row.name '></el-input></span><br>
        <span class="s1" style="height: 90px;margin-bottom: 5px;">
          <span style="display: inline-block;line-height: 90px;">检测内容</span>&#12288;&nbsp;&nbsp;&nbsp;
          <el-input v-model="row.content " type="textarea" :rows="3" :autosize='false' style='width:70%'> </el-input></span><br>
        <span class="s1"><span>角色&#12288;&#12288;&#12288;&#12288;</span><el-select v-model="row.role " style='width:70%' placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </span><br>
        <span class="s1"><span>子任务类型&#12288;</span><el-select v-model="row.type " style='width:70%' placeholder="请选择" @change="fn(row.type)">
            <el-option
              v-for="item in options4"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </span><br>
        <span class="s1"><span>比对内容&#12288;&#12288;</span><el-input style='width:70%' v-model='row.keywords '></el-input></span><br>
        <span class="s1"><span>相似度阀值&#12288;</span><el-input style='width:70%' v-model='row.acThreshold '></el-input></span><br>
        <span class="s1"><span>期望结果&#12288;&#12288;</span><el-select v-model="row.answer " style='width:70%' placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </span><br>
        <span class="s1"><span>时长(秒)&nbsp;&#12288;&#12288;</span><el-input style='width:70%' v-model='row.time '></el-input></span><br>
        <div style="margin-top: 20px;margin-bottom: 35px;">
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
		name:'',
		data() {
			return {
        // name1:'',
        // role :'',
        // answer :'',
        // time:'',
        // type :'',
        // // contentType:'',
        // keywords :'',
        // content  :'',
        // name :'',
        // acThreshold :'',
        // options: [{value: '0',label: '陈述句'}, {value: '1',label: '对话'}],
        options2: [{value: '选项1',label: '销售员'}, {value: '选项2',label: '客户'}],
        options3: [{value: '选项1',label: '肯定'}, {value: '选项2',label: '否定'}],
        options4: [{value: '选项1',label: '客户身份识别'}, {value: '选项2',label: '销售员身份识别'},
            {value: '选项3',label: '对话'}, {value: '选项4',label: '陈述'}],
        // list:'',
        row:{
          name1:'',
          role :'',
          answer :'',
          time:'',
          type :'',
          // contentType:'',
          keywords :'',
          content  :'',
          name :'',
          acThreshold :'',
        }
			};
		},
		methods:{
      save(){
        // this.list={name1:this.name1, role :this.role , answer :this.answer , time :this.time ,
        //   type :this.type, keywords :this.keywords, content :this.content, name :this.name, acThreshold :this.acThreshold}
        var list2 = this.row
        // console.log(this.list)
        this.$store.commit('edit',list2)
      	this.$router.push({name:'index5',params:{name1:list2.name1}});
      },
      cancel(){
      	this.$router.go(-1);
      },
      fn(type){
        if(type  == "客户身份识别"){
          this.row.role = "客户"
        }else if(type  == "销售员身份识别"){
          this.row.role = "销售员"
        }else if(type== "陈述"){
          this.row.contentType=0
        }else if(type== "对话"){
          this.row.contentType=1
        }
      }
		},
    mounted:function(){
      if(this.$route.params.row!=null){
        this.row = this.$route.params.row
      }

      // console.log(this.row)
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
.s1 .el-select{
  float: right;
}
</style>
