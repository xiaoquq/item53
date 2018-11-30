
<template>
    <!-- 封装面包屑 -->
 <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{leav1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{leav2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name:'my-bread',
  data() {
      return {

      }
  },
  props:['leav1','leav2']
}
</script>

<style>

</style>
