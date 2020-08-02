<!-- 主页的组件 -->
<template>
<div class=''>
  <!-- 主页Header的开始 -->
  <div class="tt-home-header">
    <span>zelin头条</span>
  </div>
  <!-- 主页Header的结束 -->
  <!-- 主页内容开始 -->
  <div class="tt-home-cont">
    <div class="home-cont-left">
      <Nav></Nav>
    </div>
    <div class="home-cont-middle">中间</div>
    <div class="home-cont-right">右边</div>
  </div>
<!-- 主页内容结束 -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Nav from "../components/Nav"

export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Nav
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
  // http://tt.linweiqin.com/api/tt/getArticles?lastid=08&&type="TT"&&page=1&&number=20
  let res = await this.$axios.get('getArticles',{
    params:{
      lastid:0,
      type:"TT",
      page:1,
      number:20
    }
  })
  console.log(res)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
  .tt-home-header{
    height: 30px;
    line-height: 30px;
    background: #000;
    padding-left: 5px;
    span{
      color: #fff;
    }
  }
  .tt-home-cont{
    width: 80vw;

    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .home-cont-left{
      flex: 1;
    }
    .home-cont-middle{
      flex: 3;
    }
    .home-cont-right{
      flex: 2;
    }
  }
</style>