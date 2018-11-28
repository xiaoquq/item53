<template>
     <div class="login-wrap">
        
  <el-form label-position="top" label-width="80px" :model="formdata" class="login-form"> 
      <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-button type="primary"  @click.prevent="loginout()"  class="login-btn" >登录</el-button>
</el-form>

     </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginout() {
    
        this.$http.post("login", this.formdata)
        .then(res => {
          console.log(res);
          const { data, meta: { status, msg } } = res.data;
          if (status === 200) {
            //  成功提示信息   保存token   跳转到首页
            localStorage.setItem("token", data.token);
            this.$message.success(msg);
            this.$router.push({ name: "home" });
          } else {
            this.$message.warning(msg);
          }
        });
    }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  height: 350px;
  background-color: #fff;
  padding: 20px;
}
.login-btn {
  width: 100%;
}
</style>
