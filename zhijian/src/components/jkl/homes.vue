<template>
  <div class="quality">
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="销售产品查询：">
            <el-input v-model="name" placeholder="销售产品查询" clearable></el-input>
        </el-form-item>
        <el-form-item label="录像文件名 / ID：">
            <el-input v-model="id" placeholder="录像文件ID" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="chaxun">查询</el-button>
        </el-form-item>
    </el-form>

    <div class="biao" v-for="(item, ins) in newdata" :key="ins">
        <section>
            <span>录像文件：{{item.videoName}}</span>
            <span>身份验证：{{result.flag}}</span>
            <span>
                <img :src="item.tu1" alt="">
                <img :src="item.tu2" alt="">
            </span>
        </section>
        <section>
            <span id="s1">关键字</span>
            <span id="s2">期望回答</span>
        </section>
        <ul>
            <li><span>平均得分率</span></li>
            <li><span>平均匹配率</span></li>
            <li><span>平均合格率</span></li>
            <li><span>平均合格率</span></li>
        </ul>
        <div class="shu">
            <span>{{item.suma}}</span>
            <span>{{item.sumb}}</span>
            <span>{{item.sumc}}</span>
            <span>{{item.sumd}}</span>
        </div>
    </div>
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
          tu2:''
      }
  },
  methods:{
        chaxun(){
          this.audioQualityPost();
            this.newdata = [];
            // this.audioQualityPost();
            for(var i = 0; i < this.data.length; i++){
                // console.log(this.data[i].productName)
                // var video = this.data[i].audioAnalysisListVOList;
                if(this.data[i].productName === this.name){
                    if(this.id === ''){
                        this.newdata.push(this.data[i]);
                    }else if(this.data[i].videoName === this.id||this.data[i].audioResultId===this.id){
                        this.newdata.push(this.data[i]);
                    };
                }else if(this.data[i].videoName === this.id||this.data[i].audioResultId === this.id && this.name === ''){
                     this.newdata.push(this.data[i]);
                }
            }
        },
        // 质检结果请求
        audioQualityPost(){
          let data = {
            "page": 1,
            "size": 10000
          }
          this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryQualityTestList',data).then(res => {
                this.data = res.data.audioAnalysisListVOS;
                for(var i = 0; i < this.data.length; i++){
                  let tempdata = this.data[i];
                  let suma = 0;
                  let sumb = 0;
                  let c = 0;
                  let d1 = 0;
                  let d2 = 0;
                  let x = 0;
                  for (var j = 0; j < tempdata.audioAnalysisListVOList.length; j++) {
                    let arr = tempdata.audioAnalysisListVOList[j]
                    if(arr.subTaskType==="对话"||arr.subTaskType==="陈述"){
                      x++
                    }
                    // 平均得分率
                    if(arr.subTaskType==="对话"||arr.subTaskType==="陈述"){
                      suma+=parseFloat(arr.similarity)
                    }
                    // 平均匹配率
                    if((arr.subTaskType==="对话"||arr.subTaskType==="陈述")&&arr.acThreshold!=0){
                      sumb+=(Math.floor(arr.similarity * 100) / 100)/(Math.floor(arr.acThreshold * 100) / 100)
                      console.log(sumb)
                    }
                    // 平均合格率
                    if(arr.subTaskType==="对话"||arr.subTaskType==="陈述"){
                      if(arr.recognitionResult.flag===null){
                        c++
                      }
                    }
                    // 平均合格率
                    if(arr.subTaskType==="对话"){
                      d2++
                      if(arr.whetherContentMatches.flag===null){
                        d1++
                      }
                    }
                  }
                  tempdata.suma = suma/x
                  tempdata.suma = parseFloat(tempdata.suma).toFixed(2)
                  tempdata.sumb = sumb/x
                  tempdata.sumb = parseFloat(tempdata.sumb).toFixed(2)
                  tempdata.sumc = c/x
                  tempdata.sumc = parseFloat(tempdata.sumc).toFixed(2)
                  tempdata.sumd = d1/d2
                  tempdata.sumd = parseFloat(tempdata.sumd).toFixed(2)
                  this.missionid = this.data[i].missionsId
                    // 人脸识别结果请求
                  this.$global.httpVideoPost(this, '/api/v1/audio_analysis/queryVideoFaceImg/'+this.missionid).then(res => {
                      this.result = res.data;
                      tempdata.tu1 = 'data:image/jpg;base64,' + this.result.imagelist[0];
                      tempdata.tu2 = 'data:image/jpg;base64,' + this.result.imagelist[1];
                      this.newdata.push(tempdata);
                      // console.log(tempdata)
                  })
                }
            })
        },
    },
    mounted(){
        // this.audioQualityPost();
    }
}
</script>
<style scoped>
  #s1{
    width: 75%;
  }
  #s2{
    width: 25%;
    border-right: none;
  }
    .table{
        margin: 0 auto;
    }
    .biao{
        margin: 0 auto;
        width: 1261px;
        margin-bottom: 30px;
    }
    .biao section{
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
        float: left;
        width: 360px;
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
        width: 25%;
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
        width: 25%;
        font-size: 14px;
    }
    .biao .shu span:last-child{
        border-right: 1px solid #EBEEF5;
    }
    .biao .shu span a{
        color: blue;
    }
</style>
