<template>
  <div class="box-tb box-align-center box-pack-center navBox">
    <!--title-->
    <div class="box box-lr navBox box-align-center " style="">
      <div class="box box-lr box-align-center" style="margin:10px;padding-bottom:20px">
        <a href="">
          <img src="./assets/logo.png" style="width:140px;height:60px;">
        </a>
      </div>
      <div class="box box-lr box-align-center box-pack-around fs16" style="width:80%">
        <div class="" style="margin:15px">
          <a href="">首页</a>
        </div>
        <div class="" style="margin:15px">
          <a href="#popular">热门活动</a>
        </div>
        <div class="" style="margin:15px">
          <a href="#appointment">预约下单</a>
        </div>
        <div class="" style="margin:15px">
          <a href="">优质服务</a>
        </div>

      </div>
    </div>
    <!--轮播图-->
    <div class="" style="width:100%;">
      <el-carousel trigger="click" :interval="4000" height="500px">
        <el-carousel-item v-for="(item, index) in banner" :key="index" class="box box-pack-center">
          <img :src="item.url" style="width:900px;height:100%;margin:0px" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--热门维修-->
    <div id="popular" class="box box-tb box-pack-center box-align-center navBox main-background">
      <div class="fs36" style="color:white;margin:40px">热门维修故障</div>
      <div class="box box-lr box-wrap" >
        <a href="#appointment" class="inline-box" >
          <div class="box box-tb" v-for="(item,index) in popular" @click="popularClick(item)" :key="index" style="background:white;width:200px;margin:20px;border-radius:10px;padding:10px;">
            <p class="fs28" style="margin:5px">{{item.fields._modelName}}</p>
            <p style="margin:5px">{{item.fields._name}}</p>
            <p class="box" style="margin:5px">
              <span class="inline-box" style="color:#c9c9c9;font-size:14px;line-height:30px;">￥</span>
              <span class="inline-box main-color fs24" style="line-height: 24px;">{{item.fields._price}}</span>
              <span style="display: inline-block;float:right;color: #c9c9c9;font-size: 14px;line-height: 28px;cursor: pointer;margin-left:50px">立即下单 ></span>
            </p>
          </div>
        </a>
      </div>
    </div>

    <div id="appointment" class="box box-tb navBox box-align-center">
      <p class="fs36" style="margin-top:40px;">我要预约</p>
      <ul class="show">
        <li>
          手机型号
          <span>{{modelLable}}</span>
        </li>
        <li>
          故障详情
          <span>{{detailLable}}</span>
        </li>
        <li>
          预计费用
          <span class="fs24 main-color">{{priceLable}}</span>
          <span>（维修完成后付款）</span>
        </li>
      </ul>

      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;">
        <p style="margin:10px">机型选择</p>
        <el-select class="inline-box mg10" v-model="brandLable" clearable placeholder="品牌" @change="brandSelect">
          <el-option  v-for="(item,index) in brands" :key="index" :label="item.fields._name" :value="item.pk">
          </el-option>
        </el-select>
        <el-select class="inline-box mg10" v-model="modelLable" clearable placeholder="型号" @change="modelSelect" no-data-text="请先选择手机品牌"	>
          <el-option  v-for="(item,index) in models" :key="item.pk" :label="item.fields._name" :value="item.pk">
          </el-option>
        </el-select>
        <el-select class="inline-box mg10" v-model="detailLable" clearable placeholder="故障选择" @change="detailSelect" no-data-text="请先选择手机型号">
          <el-option v-for="item in details" :key="item.pk" :label="item.fields._name" :value="item.pk">
          </el-option>
        </el-select>
      </div>
      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;margin-left:0px">
        <p style="margin:10px">维修方式</p>
        <el-select class="inline-box mg10" v-model="order.orderType" clearable placeholder="上门维修" @change="orderTypeSelect">
          <el-option v-for="item in orderTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;">
        <p v-if="telLegal" style="margin:10px">预留信息</p>
        <p v-else class="mg10" style="margin-bottom:25px">预留信息</p>
        <el-input v-if="telLegal" class="mg10" v-model="order.name" placeholder="姓名（必填）" style="width:195px"></el-input>
        <el-input v-else class="mg10" v-model="order.name" placeholder="姓名（必填）" style="width:195px;margin-bottom:25px"></el-input>
        <el-input v-if="telLegal" class="mg10" v-model="order.tel" placeholder="电话号码（必填）" style="width:400px"></el-input>
        <div v-else>
          <el-input class="mg10 illegal" v-model="order.tel" placeholder="电话号码（必填）" style="width:400px;"></el-input>
          <p style="font-size:12px;color:red;margin-top:0;margin-bottom:0;margin-left:14px;">请输入正确的手机号</p>
        </div>
      </div>
      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;">
        <p style="margin:10px">您的地址</p>
        <el-cascader :options="CityInfo" style="margin-left:10px;" v-model="form.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true" @change="handleChange">
        </el-cascader>
      </div>
      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;">
        <p style="margin:10px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <el-input class="mg10" v-model="detailAddress" placeholder="具体街道地址" style="width:625px"></el-input>
      </div>
      <div class="box box-align-center box-pack-start" style="margin-top:10px;width: 750px;">
        <p style="margin:10px">备注信息</p>
        <el-input class="mg10" v-model="order.comment" placeholder="备注：部分机型课提供贴膜" style="width:625px"></el-input>
      </div>
      <button class="submitbtn" @click="orderSubmit">提交订单</button>
    </div>

  </div>
</template>

<script>
import { getAllBanner, getPopularMalfunctionDetail,getAllBrands,getElectronicsModelByBrand, getMalfunctionDetailByModel } from './api';
import host from './host'
import CityInfo from './city-data'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: '',
        city: '',
        erae: '',
        minerae: '',
        selectedOptions: [],//地区筛选数组
      },
      CityInfo: CityInfo,
      province: [],
      banner: [],
      popular: [],
      brands: [],
      models: [],
      details: [],
      orderTypes:[{
        value: 0,
        label: "上门维修"
      },{
        value:1,
        label: "到店维修"
      }],
      order: {
        tel: "",
        name: "",
        address: "",
        orderType: "",
        serveTime: "",
        comment: "",
        modelID: "",
        detailID: "",
      },
      brandLable:"",
      modelLable:"",
      detailLable:"",
      priceLable:"",
      orderTypeLable: "",
      detailAddress: "",
      _province: "",
      _city:"",
      _region:"",
      telLegal: true
    }
  },
  methods: {
    getBanner() {
      getAllBanner().then((res) => {
        var pictures = JSON.parse(res.data[0].fields._picture)
        for (var item in pictures) {
          var imgurl = pictures[item].picture
          var dic = {}
          dic.url = imgurl
          this.banner.push(dic)
        }
      });

    },
    getPopular() {
      getPopularMalfunctionDetail().then((res) => {
        console.log(res.data)
        this.popular = res.data
      })
    },
    popularClick(value){
      this.modelLable = value.fields._modelName
      this.detailLable = value.fields._name
      this.priceLable = value.fields._price
      this.brandLable = value.fields._brandName
      order.modelID = value.fields._electronicsModel
      order.detailID = value.pk
    },
    getBrands(){
      getAllBrands().then((res) => {
          console.log(res.data)
          this.brands = res.data;
      })
    },
    handleChange(value) {
      this.form.city = this.form.selectedOptions[0];
      this.form.erae = this.form.selectedOptions[1]
      this.form.minerae = this.form.selectedOptions[2]
    },
    getCityData() {
      for (var item in CityInfo) {
        this.province.push(CityInfo[item])
      }
    },
    brandSelect(e){
      console.log(e)
      var para = {
        brandID: e
      }
      para = JSON.stringify(para)
      getElectronicsModelByBrand(para).then((res) => {
        console.log(res.data)
        this.models = res.data
      })
    },
    getMalfunctionDetail(modelID){
      var para = { modelID: modelID }
      para = JSON.stringify(para)
      getMalfunctionDetailByModel(para).then((res)=> {
        console.log(res)
        this.details = res.data
      })
    },
    modelSelect(e){
      let obj = {};
      obj = this.models.find((item)=>{
        return item.pk === e;
      })
      console.log(obj)
      this.modelLable = obj.fields._name
      this.order.modelID = e
      this.getMalfunctionDetail(e)
    },
    detailSelect(e){
      let obj = {};
      obj = this.details.find((item)=>{
        return item.pk === e;
      })

      this.detailLable = obj.fields._name
      this.order.detailID = e
      this.priceLable = obj.fields._price
    },
    orderTypeSelect(value){
    },
    myAddressCity() {
      var value = this.form.city
      for (var y in this.CityInfo) {
        if (this.CityInfo[y].value == value) {
          this._province = this.CityInfo[y].label
          return value = this.CityInfo[y].label
        }
      }
    },
    myAddressErae() {
      var value = this.form.erae
      for (var y in this.CityInfo) {
        for (var z in this.CityInfo[y].children) {
          if (this.CityInfo[y].children[z].value == value && value != undefined) {
            this._city = this.CityInfo[y].children[z].label
            return value = this.CityInfo[y].children[z].label;
          }
        }
      }
    },
    myAddressMinerae() {
      var value = this.form.minerae
      for (var y in this.CityInfo) {
        for (var z in this.CityInfo[y].children) {
          for (var i in this.CityInfo[y].children[z].children) {
            if (this.CityInfo[y].children[z].children[i].value == value && value != undefined) {
              this._region = this.CityInfo[y].children[z].children[i].label
              return value = this.CityInfo[y].children[z].children[i].label
            }
          }
        }
      }
    },
    orderSubmit(e){
      console.log(this.order)  
      if(this.order.tel.length != 11){
         this.telLegal = false
      } else{
        this.telLegal = true
      }
      this.myAddressCity()
      this.myAddressErae()
      this.myAddressMinerae()
      let address = this._province + this._city + this._region + this.detailAddress
      this.$alert('稍后会有维修工程师电话联系你哒，请保持手机的畅通。', '订单提交成功', {
         
        });
    }
  },
  mounted() {
    this.getBanner()
    this.getPopular()
    this.getCityData()
    this.getBrands()
  },
  computed: {
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: white;
}

.box {
  display: flex;
}

.inline-box {
  display: inline-flex;
}

.box-lr {
  flex-direction: row;
}

.box-rl {
  flex-direction: row-reverse;
}

.box-tb {
  flex-direction: column;
}

.box-bt {
  flex-direction: column-reverse;
}

.box-pack-center {
  justify-content: center;
}

.box-pack-start {
  justify-content: flex-start;
}

.box-pack-end {
  justify-content: flex-end;
}

.box-pack-between {
  justify-content: space-between;
}

.box-pack-around {
  justify-content: space-around;
}

.box-align-center {
  align-items: center;
}

.box-align-start {
  align-items: flex-start;
}

.box-align-end {
  align-items: flex-end;
}

.self-align-center {
  align-self: center;
  margin: 0 auto;
}

.self-align-start {
  align-self: flex-start;
}

.self-align-end {
  align-self: flex-end;
}

.self-align-stretch {
  align-self: stretch;
}

.box-wrap {
  flex-wrap: wrap;
}

.box-nowrap {
  flex-wrap: nowrap;
}

.fs16 {
  font-size: 16px;
}

.fs20 {
  font-size: 20px;
}

.fs24 {
  font-size: 24px;
}

.fs28 {
  font-size: 28px;
}

.fs32 {
  font-size: 32px;
}

.fs36 {
  font-size: 36px;
}

.fs40 {
  font-size: 40px;
}

a {
  text-decoration: none;
}

a:link {
  color: black
}

a:visited {
  color: black
}

a:hover {
  color: black
}

a:active {
  color: black
}

.navBar {
  height: 80px;
}

.navBox {
  min-width: 1300px;
  width: 1200px;
  margin: 0 auto;
}

.menu {
  float: left;
  line-height: 80px;
  margin-left: 80px;
}

li {
  list-style: none;
  display: inline-block;
  padding-left: 49px;
  color: #333333;
}

.subtitle {
  float: left;
  font-size: 24px;
  line-height: 80px;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
  padding-left: 36px;
}

img {
  float: left;
  width: 80px;
  height: 36px;
  margin-top: 22px;
}

.main-color {
  color: #b31b10
}

.main-background {
  background: #b31b10
}

.show {
  background-color: #f7f7f7;
  width: 886px;
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom: 20px;
}

.show li {
  list-style: none;
  font-size: 16px;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
  padding-left: 38px;
  padding-top: 20px;
  width: 100%
}

.show li span {
  padding-left: 44px;
}

.modelbox .mode-name {
  font-size: 16px;
  color: #333;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
  width: 110px;
  float: left;
  text-align: left;
  line-height: 54px;
}

.mg10 {
  margin: 10px;
}

.submitbtn {
  width: 250px;
  height: 64px;
  background-color: #b31b10;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
  font-size: 24px;
  border: 0;
  color: #fff;
  outline: none;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 89px;
  display: block;
  margin-top: 48px;
}
.el-cascader-menu__item{
  display: block;
}
.el-select-dropdown__item{
  display: block;
}
.illegal .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff6f6;
    background-image: none;
    border-radius: 4px;
    border: 1px solid red;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}

</style>
