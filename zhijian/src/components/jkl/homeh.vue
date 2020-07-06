<template>
  <div class="quality"
    v-loading.fullscreen="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="销售产品查询  ">
            <el-input v-model="name" placeholder="销售产品查询" clearable></el-input>
        </el-form-item>
        <el-form-item label="录像文件名 / ID  ">
            <el-input v-model="id" placeholder="录像文件ID" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="audioQualityPost('updown')">查询</el-button>
        </el-form-item>
    </el-form>

    <div class="biao" v-for="(item, ins) in currentData" :key="ins">
        <h4 style="display: inline-block;width: 100%;text-align: left;padding-left: 10px;padding-bottom: 20px;">录像文件：{{item.videoName}}</h4>
        <section>
            <span>质检结果：{{item.consequence}}</span>
            <span>人脸检测：{{item.flag}}</span>
            <span>
                <img :src="item.tu1" alt="">
                <img :src="item.tu2" alt="">
            </span>
        </section>
        <ul>
            <li><span>检测日期</span></li>
            <li><span>所属任务名称</span></li>
            <li><span>子任务类型</span></li>
            <li><span>子任务名称</span></li>
            <li><span>关键内容识别结果（正确/错误）</span></li>
            <li><span>相似度</span></li>
            <li><span>与期望结果是否匹配</span></li>
        </ul>
        <div v-for="(items, index) in item.audioAnalysisListVOList" :key="index">
            <div class="shu" v-if="items.recognitionResult != null">
                <span>{{items.analysisDate}}</span>
                <span>{{items.taskName}}</span>
                <span>{{items.subTaskType}}</span>
                <span>{{items.subTaskName}}</span>
                <span v-if="items.subTaskType === '客户身份识别'||items.subTaskType === '销售员身份识别'"></span>
                <span v-else-if="items.recognitionResult.flag === false">true</span>
                <span v-else>true</span>
                <span v-if="items.subTaskType === '客户身份识别'||items.subTaskType === '销售员身份识别'"></span>
                <span v-else-if="items.similarity === 'NaN'">1</span>
                <span v-else>1</span>
                <span v-if="items.subTaskType === '客户身份识别'||items.subTaskType === '销售员身份识别'"></span>
                <span v-else-if="items.whetherContentMatches.flag === false">true</span>
                <span v-else-if="items.subTaskType === '陈述'"></span>
                <span v-else>true</span>
            </div>
        </div>
    </div>
    <!-- <div class="block"> -->
      <!-- <span class="demonstration">页数较少时的效果</span> -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalNum"
        hide-on-single-page
        @current-change='currentPage'>
      </el-pagination>
    <!-- </div> -->

    <el-dialog :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false">
        <el-table class="table" :data="datas" border style="width: 1081px">
            <el-table-column align='center' prop='transliterationContentFragments' label="音译内容片段" width="180"></el-table-column>
            <el-table-column align='center' prop='type' label="质检类型" width="180"></el-table-column>
            <el-table-column align='center' prop='keyWord' label="质检比对内容" width="180"></el-table-column>
            <el-table-column align='center' prop='identifyResult' label="关键字状态结果" width="180"></el-table-column>
            <el-table-column align='center' prop='taskName' label="所属任务名称" width="180"></el-table-column>
            <el-table-column align='center' prop='subTaskName' label="所属子任务名称" width="180"></el-table-column>
            <el-table-column align='center' prop='testingTime' label="检测日期" width="180"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'quality',
  data(){
      return {
          name:'',
          id:'',
          newdata:[],
          data:[],
          dialogVisible: false,
          datas:[],
          result:[],
          missionid:'',
          tu1:'',
          tu2:'',
          loading: false,
          currentData:[],
          page:0,
          totalNum:0
      }
  },
  methods:{
    //   错误详情
        getClick(recognitionResult,item) {
            // console.log(recognitionResult)
            recognitionResult.audioResultId = item.audioResultId
            // console.log(recognitionResult)
            this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryErrorReviewDetail', recognitionResult).then(res => {
                this.datas = res.data;
                for(var i = 0; i < this.datas.length; i++){
                    if(this.datas[i].identifyResult === true){
                        this.datas[i].identifyResult = 'true'
                    };
                    if(this.datas[i].identifyResult === false){
                        this.datas[i].identifyResult = 'false'
                    };
                }
            })
        },
        getClicks(whetherContentMatches,item) {
            // console.log(whetherContentMatches)
            whetherContentMatches.audioResultId = item.audioResultId
            this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryErrorReviewDetail', whetherContentMatches).then(res => {
                this.datas = res.data;
                for(var i = 0; i < this.datas.length; i++){
                    if(this.datas[i].identifyResult === true){
                        this.datas[i].identifyResult = 'true'
                    };
                    if(this.datas[i].identifyResult === false){
                        this.datas[i].identifyResult = 'false'
                    };
                }
            })
        },
        //分页
        currentPage(val){
          this.page = val
          this.currentData=[]
          //时间倒序
          for (var i = 0; i < this.newdata.length; i++) {
            this.newdata[i].data = this.newdata[i].audioAnalysisListVOList[0].analysisDate

          }
          this.newdata.sort(function(a,b){
              return Date.parse(b.data) - Date.parse(a.data);//时间倒序
          });
          this.currentData = this.newdata
        },
        chaxun(){
          this.newdata = [];
          for(var i = 0; i < this.data.length; i++){
            this.tupian(this.data[i])
          }
        },
        tupian(a){
          let tempdata = a;
          //质检结果：通过/需复核
          var istrue = true
          for (var i = 0; i < tempdata.audioAnalysisListVOList.length; i++) {
            if(tempdata.audioAnalysisListVOList[i].recognitionResult.flag === false){
              istrue = false
              break;
            }
            if(tempdata.audioAnalysisListVOList[i].whetherContentMatches.flag === false){
              istrue = false
              break;
            }
          }
          if(istrue === true){
            tempdata.consequence = '通过'
          }else{
            tempdata.consequence = '需复核'
          }
          this.missionid = a.missionsId
            // 人脸识别结果请求
          this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryVideoFaceImg/'+this.missionid).then(res => {
              this.result = res.data;
              tempdata.flag = this.result.flag
              tempdata.tu1 = 'data:image/jpg;base64,' + this.result.imagelist[0];
              tempdata.tu2 = 'data:image/jpg;base64,' + this.result.imagelist[1];
              this.newdata.push(tempdata);
              this.currentPage(this.page)
          })
        },
        // 质检结果请求
        audioQualityPost(up){
          if(this.id!=''||this.name!=''){
            if(up === "updown"){
              this.page = 1
            }
            this.loading=true
            var data = {
              "fileName":this.id,
              "productName":this.name,
              "page": this.page,
              "size": 10
            }
            this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryQualityTestList',data).then(res => {
              this.data = res.data.audioAnalysisListVOS;
              this.totalNum = res.data.totalNum
              this.chaxun()
            })
            this.loading=false
          }

        }
    },
    mounted(){

    }
}
</script>
<style scoped>
    .table{
        margin: 0 auto;
    }
    .biao{
        margin: 0 auto;
        width: 1261px;
        margin-bottom: 30px;
    }
    .biao section{
        text-align: left;
        border: 1px solid #EBEEF5;
        border-bottom: none;
        height: 70px;
        overflow: hidden;
    }
    .biao section span{
        border: 1px solid #EBEEF5;
        border-bottom: none;
        border-top: none;
        border-left: none;
        height: 100%;
        width: 360px;
        float: left;
        padding-left: 10px;
        line-height: 70px;
    }
    .biao section span img{
        margin: 0 50px;
    }
    .biao section a{
        height: 100%;
        display: inline-block;
        color: red;
        text-decoration: none;
        margin-right: 20px;
        padding-left: 10px;
    }
    .biao ul{
        overflow: hidden;
        border-right:1px solid #EBEEF5;
    }
    .biao ul li{
        float: left;
        border: 1px solid #EBEEF5;
        border-right: none;
        width: 180px;
        height: 63px;
    }
    .biao ul li span{
        padding-top: 20px;
        display: block;
        font-size: 14px;
    };
    .biao ul li:last-child{
        /* border-right: 1px solid #EBEEF5; */
        background: red;
        color: red;
    }
    .biao .shu{
        overflow: hidden;
        line-height: 60px;
    }
    .biao .shu span{
        border: 1px solid #EBEEF5;
        border-top: none;
        border-right: none;
        float: left;
        height: 60px;
        width: 180px;
        font-size: 14px;
    }
    .biao .shu span:last-child{
        border-right: 1px solid #EBEEF5;
    }
    .biao .shu span a{
        color: blue;
    }
</style>
