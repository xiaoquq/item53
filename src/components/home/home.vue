<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="@/assets/logo.png" alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light header-title">
                    <h2>电商后台管理系统</h2>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <a @click.prevent="droOut()" class="loginout">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">
            <el-menu :router="true" :unique-opened="true">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="user">
                        <i class="el-icon-circle-check"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 2 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="role">
                        <i class="el-icon-location"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="rights">
                        <i class="el-icon-location"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 3 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="goods">
                        <i class="el-icon-location"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 4 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 5 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>数据报表</span>
                    </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            meanus:[]
        }
       
    },
    //   new Vue实例之前自动触发
    beforeCreate() {
        // 获取token
        const token = localStorage.getItem("token");

        if (!token) {
            this.$router.push({
                name: "login"
            });
        }
    },
    created() {
       this.getHome()
    },
    methods: {
        droOut() {
            localStorage.clear();
            this.$router.push({
                name: 'login'
            })

        },
       async getHome() {
          const res = await this.$http.get('menus');
          console.log(res);
        }
    }

};
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.header-title {
    text-align: center;
    color: #fff;
    line-height: 60px;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
}

.loginout {
    line-height: 60px;
    cursor: pointer;
}
</style>
