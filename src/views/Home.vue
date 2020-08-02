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
    <div class="home-cont-middle">
      <div class="cont-middle-top">
        <section class="middle-top-tab">
          <section :class="['top-tab-item',{'active':activeTab === tab.type}]"
          v-for="tab in tabs"
          @click="handleTabChange(tab.type)"
          :key="tab.id"
          >
          {{tab.text}}
          </section>
        </section>
      </div>
      <!-- 显示发头条编辑部分的开始 -->
      <div class="cont-middle-mid">
        <section v-show="activeTab==='tt'">
          <textarea name="" id="" 
          placeholder="写点什么吧"
          v-model="content"
          cols="30" rows="10"></textarea>
          <section class="mid-bottom">
            <section class="left">
              <span class="title">图片</span>
            </section>
            <section class="right"
            @click.stop="publishTT"
            >
              发布
            </section>
          </section>
        </section>
        <section class="article-cont" v-show="activeTab==='article'">
          <input class="article-input" 
          v-model="title"
          type="text">
          <vue-editor id="editor"  
          use-custom-image-handler @image-added="handleImageAdded"
          v-model="html_cont"> </vue-editor>
          <section class="article-publish">
            <span class="publish-title"
            @click="publishArticle"
            >发布</span>
            </section>
        </section>
      </div>
      <!-- 显示发头条编辑部分的结束 -->
      <div class="cont-middle-bottom"></div>
    </div>
    <div class="home-cont-right">右边</div>
  </div>
<!-- 主页内容结束 -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Nav from "../components/Nav"
// 引入富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Nav,VueEditor,
},
data() {
//这里存放数据
return {
  tabs:[
    {id:1,text:"发微头条",type:"tt"},
    {id:2,text:"写文章",type:"article"}
  ],
  activeTab:"article",  //tt 头条  article 文章
  content:'',
  title:'',   //富文本标题
  html_cont:''  //富文本编辑内容
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  // 切换激活的tab
  handleTabChange:function(activeTab){
    this.activeTab = activeTab
  },
  publishTT:function(){
    let content = this.content
    if(!content){
      // 内容为空，alert
      // todo 换成elementUI message
      // alert("输入不能为空")
      this.$message({
        message:"输入不能为空!",
        type:"warning"
      });
      return
    }
    this.$axios.post("/createTT",{
      content:content,
      imgs:'',
      oauth_token:""
    }).then(res=>{
      console.log(res)
    }).catch(err=>console.log(err))

    this.content = ''
  },
  publishArticle:function(){
    let title = this.title
    let html_cont = this.html_cont
    if(!title || !html_cont){
      // 内容为空，alert
      // todo 换成elementUI message
      // alert("输入不能为空")
      this.$message({
        message:"输入不能为空!",
        type:"warning"
      });
      return
    }
    this.$axios.post("createArticle",{
      content:html_cont,
      img:'',
      title:title
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  // 添加图片上传的方法
  handleImageAdded: function(f, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      // 往表单数据中填充 file:file 数据
      formData.append("file", f);
      // console.log(file)
      this.$axios({
        url:"/aliossUpload",
        method:"POST",
        data:formData,
      }).then(res=>{
        let url = res.url; // Get url from response
        // Editor是富文本编辑器的实例
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      }).catch(err=>{
        console.log(err)
      })
      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
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
    .home-cont-middle {
      flex: 3;
    .cont-middle-top {
      .middle-top-tab {
        display: flex;
        .top-tab-item {
          height: 50px;
          line-height: 50px;
          width: 150px;
          text-align: center;
        }
        .active{
          color:#b1e5ff;
          border-bottom: 2px solid #f1545a;
        }
      }
    }


   .cont-middle-mid {
      section {
        textarea {
          width: 100%;
          margin-top: 15px;
        }

        section.mid-bottom {
          display: flex;
          justify-content: space-between;
          height: 40px;
          align-items: center;
          section.left {
            span.title {
              color: #000;
            }
          }

          section.right {
            width: 100px;
            height: 30px;
            background: #ea4245;
            color: #fff;
            line-height: 30px;
            text-align: center;
          }
        }
      }
      .article-cont {
        margin-top: 15px;
        input.article-input {
          width: 100%;
          height: 30px;
          margin-bottom: 10px;
        }

        #editor {
          width: 100%;
        }

        .article-publish {
          display: flex;
          justify-content: flex-end;
          .publish-title{
            margin-top: 5px;
            display: inline-block;
            width: 120px;
            height: 40px;
            color: #fff;
            background-color: #ea4245;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
          }
        }
      }
    }
    .cont-middle-bottom {
      color: #fff;
    }
  }
    .home-cont-right{
      flex: 2;
    }
  }
</style>