<template>
  <div id="app">
      <!-- 配置了程序唯一的出口 -->
    <router-view/>
  </div>
</template>

<style>
/* 样式初始化 
  <style scoped> 加上scoped 样式只会在本组件生效
*/
html,body,div,section,span,p,h1,h2,h3,h4,h5,h6,p{
  margin: 0;padding: 0;box-sizing: border-box;
}
</style>
