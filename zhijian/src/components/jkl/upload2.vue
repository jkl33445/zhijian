<!-- html部分 -->
<template>
	<div id="app">
    <div style="min-height: 210px;width: 500px;border: 1px solid #e6e6e6;margin: 0 auto;text-align: left;padding: 51px;">
      <el-form>
        <!-- <el-dialog :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false"> -->
          <div class="fileInput">
            <a class="filea">
              浏 览
              <input type="file" class="file" @change="getFile($event)" />
            </a>
            <input type="text" class="input" v-model="inputName" placeholder="选择本地文件" />
            <br />
          </div>请输入产品&nbsp;
          <el-input v-model="name" class="ipt222" placeholder="请输入产品名" style="margin-left:5px;width: 300px;">

          </el-input><br>
          <div style="margin-top: 40px;height: 40px;">
            <span class="dialog-footer" style="display: inline-block;float: right;">
              <el-button @click="cancel">取 消</el-button>&nbsp;
              <el-button @click="postFile" style="width: 80px;">上 传</el-button>
            </span>
          </div>
          <div v-if="isupload">
            <span>正在上传，请耐心等待。。。</span><br>
            <el-progress :percentage="progress"></el-progress>
          </div>
        <!-- </el-dialog> -->
      </el-form>
    </div>

	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
        name: "",
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
        currentData:[]
			};
		},
		methods:{
      getFile(event) {
        this.form.file = event.target.files[0];
        // console.log(this.form.file);
        this.inputName = this.form.file.name;
        var fileType = this.form.file.name
          .substr(this.form.file.name.lastIndexOf(".") + 1)
          .toLowerCase();
        // console.log(fileType);
        // console.log(this.form.productId);
        if (
          fileType === "gif" ||
          fileType === "jpg" ||
          fileType === "png" ||
          fileType === "jpeg"
        ) {
          this.form.type = 2;
        } else if (
          fileType === "mp3" ||
          fileType === "ses"

        ) {
          this.form.type = 1;
        } else if (
          fileType === "avi" ||
          fileType === "rmvb" ||
          fileType === "flv" ||
           fileType === "mov"||
           fileType === "mp4"
        ) {
          this.form.type = 0;
        } else {
          alert("文件格式不正确");
        }
      },
      postProduct() {
        var data = {
          keyWord: null,
          page: 0,
          size: 0
        };
        this.$global
          .httpPostaddTask(this, "/api/v1/task/queryTasks", data)
          .then(res => {
            this.ott = res.data;
            // console.log(this.ott);
          });
      },
      postFile() {
        let isname = false
        // var arr = Object.keys(data);
        // alert(arr.length == 0);
        for (var i = 0; i < this.ott.length; i++) {
          if(this.name===this.ott[i].name&&this.name!=''){
            isname = true
            this.form.productId = this.ott[i].id
            break
          }
        }
        console.log(this.form.file)
        if(isname===true&&this.form.file.name!=null){
          this.progress=0
          // if(Object.keys(this.form.file).length===0||this.form.productId===''){
          //   this.$message.error('文件或产品不能为空');
          // }else{
            this.isupload=true;
            // this.dialogVisible = false;
            var data = new FormData();
            data.append('file', this.form.file);
            data.append('type', this.form.type);
            data.append('productId', this.form.productId);
            var config = {
                onUploadProgress: progressEvent => {
                    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    this.progress = complete
                }
            }
            this.$global.httpPost(this, '/api/v1/file/upload_file', data,config).then(res => {
              // console.log(res.data);
              this.isupload=false

            }).catch(error => {
                 console.log(error);
            });
          // }

        }else{
          this.$message.error('请选择本地文件或输入正确的产品名');
        }

      },
      cancel(){
        this.$router.push({path: '/home'});
      }
		},
    mounted: function() {
      // this.search();
      this.postProduct();
    }
	}
</script>
<!-- css部分 -->
<style>
.fileInput {
  margin-bottom: 10px;
  /* margin-left: 10px; */
}
.filea {
  width: 80px;
  margin-left: 0px;
  line-height: 37px;
  /* background: #409eff; */
  border-radius: 5px;
  border: #DCDFE6 1px solid;
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
  width: 300px;
  color: #606266;
  padding-left: 15px;

}
.input::placeholder{
  color: #909399;
  font-size: 14px;
  }
.ipt222 .el-input__inner::placeholder{
  color: #909399;
  font-size: 14px;
  }
.file:hover {
  cursor: pointer;
}
</style>
