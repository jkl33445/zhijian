<!-- html部分 -->
<template>
  <div style="width: 70%;margin: 0px auto;">
    <div style="text-align: left;margin-bottom: 25px;">
      <span>绑定产品查询:</span>
      <el-input style='width: 200px;' v-model="cname" placeholder="" clearable></el-input>
      <span>录像文件ID:</span>
      <el-input style='width: 200px;margin-right: 10px;' v-model="id" placeholder="" clearable></el-input>
      <el-button @click='search'>查询</el-button>
      <el-button @click="dialogVisible = true">上传新文件</el-button>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%">
        <span>&nbsp;录像文件名:</span>
        <!-- <el-upload
          class="upload-file"
          drag
          :action="uploa"
          :before-upload="beforeUpload"
          ref="newupload"
          multiple
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload> -->
        <input type="file" @change="getFile($event)"><br />
        <span>请输入产品:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="fn">保 存</el-button>
        </span>
      </el-dialog>
    </div>

    <el-table :data="json" border="">
      <el-table-column align='center' prop="id" label="录像文件ID"></el-table-column>
      <el-table-column align='center' prop="name" label="录像文件名称"></el-table-column>
      <el-table-column align='center' prop="cname" label="绑定产品"></el-table-column>
    </el-table>
  </div>
</template>
<!-- js部分 -->
<script>
  export default {
    data() {
      return {
        id: '',
        cname: '',
        dialogVisible: false,
        file: '',
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        json: []
      };
    },
    methods: {
      search() {
        this.json = new Array;
        for (var i = 0; i < this.tabledata.length; i++) {
          if (this.tabledata[i].id == this.id || this.tabledata[i].name == this.id) {
            this.json.push(this.tabledata[i])
          } else if (this.tabledata[i].cname == this.cname) {
            this.json.push(this.tabledata[i])
          } else if (this.cname == "" && this.id=="") {
            this.json.push(this.tabledata[i])
          }
        }
      },
      fn(){
        this.dialogVisible = false
        //后端网址
        // var url = "/upload/api/v1/file/upload_file "
        // 传递给后端的数据
        var data = new FormData();
        data.append('file',this.file)
        data.append('type',2)
        data.append('productId',1)
        // console.log(data);
//         this.$axios.post(url,this.$qs.stringify(data),{
//         	headers: {
//         		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
//         	}
//         }).then(res=>{
//         	this.list = res.data;
//         })
//
         console.log(data);
         this.$global.httpPost(this, '/api/v1/file/upload_file',data).then(res => {
        })
        console.log(this.list)
      },
      getFile(event) {
        this.file = event.target.files[0];
      },
    },
    mounted: function() {
      this.search();
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
