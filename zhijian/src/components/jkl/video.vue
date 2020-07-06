<!-- html部分 -->
<template>
  <div style="width: 70%;margin: 0px auto;">
    <div style="text-align: left;margin-bottom: 25px;">
      <span>绑定产品查询&nbsp;&nbsp;</span>
      <el-input style="width: 200px;" v-model="cname" placeholder clearable></el-input>&nbsp;&nbsp;
      <span>录像文件ID/名称&nbsp;&nbsp;</span>
      <el-input style="width: 200px;margin-right: 10px;" v-model="id" placeholder clearable></el-input>
      <el-button @click="search('click')">查询</el-button>

      <!-- <el-button @click="dialogVisible = true">上传新文件</el-button> -->

      <!-- 文件上传 -->
      <!-- <el-form>
        <el-dialog :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
          <div class="fileInput">
            <a class="filea">
              浏 览
              <input type="file" class="file" @change="getFile($event)" />
            </a>
            <input type="text" class="input" v-model="inputName" placeholder="未选择文件" />
            <br />
          </div>请输入产品&nbsp;
          <el-select v-model="form.productId" placeholder="请选择" style="margin-left:5px">
            <el-option v-for="item in ott" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="postFile">上 传</el-button>
          </span>
        </el-dialog>
      </el-form> -->
    </div>
    <div v-if="isupload">
      <span>正在上传，请耐心等待。。。</span><br>
      <el-progress type="circle" :percentage="progress"></el-progress>
    </div>
    <el-table :data="currentData" border>
      <template slot="empty">
      	<span v-if="isshow">暂无数据</span>
      	<span v-if="!isshow"></span>
      </template>
      <el-table-column align="center" prop="fileId" label="录像文件ID"></el-table-column>
      <el-table-column align="center" prop="fileName" label="录像文件名称"></el-table-column>
      <el-table-column align="center" prop="productName" label="绑定产品"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="json.length"
      hide-on-single-page
      @current-change='currentPage'>
    </el-pagination>
  </div>
</template>
<!-- js部分 -->
<script>
export default {
  data() {
    return {
      id: "",
      cname: "",
      // dialogVisible: false,
      json: [],
      inputName: "",
      progress: 0,
      form: {
        file: {},
        productId: "",
        type: ""
      },

      options: [],
      ott: [],
      isupload:false,
      currentData:[],
      isshow:false
    };
  },
  methods: {

    search(v) {
      if(this.id===""&&this.cname!=""){
        var data = {
          productName:this.cname,
          page: 1,
          size: 100000,
        };
      }else if(this.cname===""&&this.id!=""){
        var data = {
          fileIdOrName:this.id,
          page: 1,
          size: 100000,
        };
      }else if(this.id===""&&this.cname===""){
        var data = {
          page: 1,
          size: 100000,
        };
      }else if(this.id!=""&&this.cname!=""){
        var data = {
          productName:this.cname,
          fileIdOrName:this.id,
          page: 1,
          size: 100000,
        };
      }

      this.$global
        .httpPost(this, "/api/v1/file/queryFileProductList", data)
        .then(res => {
          this.options = res.data;
          this.json = [];
          for (var i = 0; i < this.options.length; i++) {
              this.json.push(this.options[i]);
          }
          this.currentPage(1,v)
        });

    },
    //分页
    currentPage(val,v){
      this.currentData=[]
      let a = val*10
      for (var i = a-10; i < a; i++) {
        if(this.json.length>i){
          this.currentData.push(this.json[i])
        }
      }
      if(v==='click'){
        this.isshow=true
      }
    },
    // cancelData() {
    //   this.cancel()
    // }
  },
  mounted: function() {
    // this.search();
  }
};
</script>
<!-- css部分 -->
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.fileInput {
  margin-bottom: 10px;
  /* margin-left: 10px; */
}
.filea {
  width: 70px;
  margin-left: 0px;
  line-height: 37px;
  /* background: #409eff; */
  border-radius: 5px;
  border: #C9C9C9 1px solid;
  display: inline-block;
  position: relative;
  color: black;
  text-align: center;
}
.file {
  width: 60px;
  height: 40px;
  opacity: 0;
  position: absolute;
  left: 0;
}
.input {
  margin-left: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  height: 40px;
  color: #606266;
  padding-left: 15px;
}
.file:hover {
  cursor: pointer;
}
</style>
