<!-- html部分 -->
<template>
  <div style="width: 90%;margin: 0px auto;">
    <div style="text-align: left;margin-bottom: 25px;">
      <span>销售产品查询:</span>
      <el-input style='width: 200px;' v-model="name" placeholder="" clearable></el-input>
      <span>录像文件ID:</span>
      <el-input style='width: 200px;margin-right: 10px;' v-model="id" placeholder="" clearable></el-input>
      <el-button @click='search'>查询</el-button>
      <div>
        <h4>录像文件ID:{{id1}}</h4>
      </div>
    </div>

    <el-table :data="json" border="">
      <el-table-column align='center' prop="date" label="检测日期"></el-table-column>
      <el-table-column align='center' prop="name" label="所属任务名称"></el-table-column>
      <el-table-column align='center' prop="type" label="子任务类型"></el-table-column>
      <el-table-column align='center' prop="cname" label="子任务名称"></el-table-column>
      <el-table-column align='center' prop="telno" label="关键内容识别结果(正确/错误)">
        <template slot-scope="scope">
          <el-button size="mini" @click="row" v-if="scope.row.telno=='false'">错误详情</el-button>
          <span v-else="">{{scope.row.telno}}</span>
        </template>
      </el-table-column>
      <el-table-column align='center' prop="email" label="相似度"></el-table-column>
      <el-table-column align='center' prop="sex" label="期望结果是否匹配">
        <template slot-scope="scope">
          <el-button size="mini" @click="row" v-if="scope.row.sex=='false'">错误详情</el-button>
          <span v-else="">{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<!-- js部分 -->
<script>
  export default {
    data() {
      return {
        id: '',
        id1: '',
        name: '',
        list: [],
        tabledata: [{
            id: '001',
            date: '2016-05-02',
            name: '王小虎',
            type: '类型',
            cname: '子名称',
            telno: 'false',
            email: '50%',
            sex: 'false'
          },
          {
            id: '002',
            date: '2016-05-02',
            name: '王小虎2',
            type: '类型',
            cname: '子名称1',
            telno: 'true',
            email: '50%',
            sex: 'false'
          },
          {
            id: '003',
            date: '2016-05-02',
            name: '王小虎3',
            type: '类型',
            cname: '子名称',
            telno: 'false',
            email: '50%',
            sex: 'true'
          },
          {
            id: '004',
            date: '2016-05-02',
            name: '王小虎',
            type: '类型',
            cname: '子名称',
            telno: 'false',
            email: '50%',
            sex: 'true'
          }
        ],
        json: []
      };
    },
    methods: {
      search() {
        this.json = new Array;
        for (var i = 0; i < this.tabledata.length; i++) {
          //id和名字同时成立
          if (this.tabledata[i].id == this.id && this.tabledata[i].name == this.name) {
            this.json.push(this.tabledata[i])
            break
            //id成立名字为空
          } else if (this.tabledata[i].id == this.id&&this.name == "") {
            this.json.push(this.tabledata[i])
            break
            //名字成立id为空
          } else if (this.tabledata[i].name == this.name && this.id == "") {
            this.json.push(this.tabledata[i])
            //同时为空
          } else if (this.name == "" && this.id == "") {
            this.json.push(this.tabledata[i])
          }
        }
        this.id1 = this.id
        // 后端网址
        // var url = "/gj/audio/findAll"
        // // 传递给后端的数据
        // // var data = {compid:this.compid,username:this.username,cname:this.cname};
        // this.$axios.get(url,this.$qs.stringify(),{
        // 	headers: {
        // 		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        // 	}
        // }).then(res=>{
        // 	this.list = res.data;
        // })
        // console.log(this.list)
      },
      row() {
        this.$router.push({
          name: 'index2'
        });
      }
    },
    mounted: function() {
      this.search();
    }
  }
</script>
<!-- css部分 -->
<style>

</style>
