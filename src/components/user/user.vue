<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">用户</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="search-box">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" clearable class="input-with-select input-search" @clear="loadUser()">
                <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click.prevent="showAddUser()">添加用户</el-button>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column type="index" label="#" width="60"> </el-table-column>

        <el-table-column prop="username" label="姓名" width="60"></el-table-column>

        <el-table-column prop="email" label="邮箱"></el-table-column>

        <el-table-column prop="mobile" label="电话"> </el-table-column>

        <el-table-column label="创建时间">
            <template slot-scope="scope">
                {{scope.row.create_time |fmData}}
            </template>
        </el-table-column>

        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch @change="userMgState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-row>
                    <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showAddUserEdit(scope.row)"></el-button>
                    <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="showdeleteBox(scope.row.id)"></el-button>
                    <el-button type="success" size="mini" plain icon="el-icon-check" circle @click="showCheckCurr(scope.row)"></el-button>
                </el-row>
            </template>
        </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser(form.id,form.email,form.mobile)">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleCurr">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
        {{currName}}
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
        <!-- {{currRoleId}} -->
      <el-select v-model="currRoleId" placeholder="请选择活动区域">
        <el-option label="请选择" :value="-1 "></el-option>
        <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in currlist " :key="i"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            // 获取的数据存储
            tableData: [],
            // 分页相关的数据
            pagenum: 1,
            pagesize: 2,
            total: 2,

            // 定义添加用户数据
            dialogFormVisibleAdd: false, // 添加对话框隐藏
            dialogFormVisibleEdit: false, // 编辑对话隐藏
            dialogFormVisibleCurr: false, // 分配角色对话隐藏
            dialogTableVisible: false,
            formLabelWidth: "120px",
            form: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            // 分配角色数据
           currRoleId:0,
        //    存储角色分类
           currlist:[],
        //    用户名
           currName:'',
        //    用户id
        currUserId:-1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 发送请求获取数据
        // 查询参数query  当前页码pagenum  每页显示条数pagesize\
        async getData() {
            // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            // 获取token
            const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
            );
            console.log(res);
            const {
                data: {
                    users,
                    total
                },
                meta: {
                    status,
                    msg
                }
            } = res.data;
            if (status === 200) {
                // 将表格数据赋值
                this.tableData = users;
                // 给 total赋值
                this.total = total;
            }
        },

        // 分页相关的方法
        //每页条数变化出发的方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // 改变pagesize的值
            this.pagesize = val;
            // 重置pagenum = 1
            this.pagenum = 1;
            // 重新加载数据
            this.getData();
        },
        // 点击页数触发的方法
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getData();
        },

        // 点击搜索查询数据
        searchUser() {
            this.getData();
        },

        //  点击x重新加载页面数据
        loadUser() {
            this.getData();
        },

        // 显示添加用户界面
        showAddUser() {
            this.dialogFormVisibleAdd = true;
        },

        //  添加用户
        async addUser() {
            // 关闭对话框
            this.dialogFormVisibleAdd = false;

            const res = await this.$http.post("users", this.form);
            // console.log(res);
            const {
                data,
                meta: {
                    status,
                    msg
                }
            } = res.data;
            if (status === 201) {
                // 提示信息
                this.$message.success(msg);
                // 刷新页面
                this.getData();
                // 清空表单数据
                this.form = {};
            } else {
                this.$message.warning(msg);
            }
        },

        // 删除用户
        showdeleteBox(userID) {
            // 添加提示信息
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(async () => {
                    // 发送请求
                    const res = await this.$http.delete(`users/${userID}`);
                    console.log(res);
                    const {
                        data,
                        meta: {
                            status
                        }
                    } = res.data;
                    if (status === 200) {
                        // 更新数据
                        this.getData();
                        //  提示信息
                        this.$message({
                            type: "success",
                            message: res.data.meta.msg
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        // 编辑用户
        async showAddUserEdit(user) {
            this.dialogFormVisibleEdit = true;

            this.form = user
        },

        // 编辑用户完成提交数据
        async editUser() {
            // 关闭对话框
            this.dialogFormVisibleEdit = false;
            const res = await this.$http.put(`users/${this.form.id}`, this.form);
            // console.log(res);
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                this.getData();
            } else {
                this.$message.error(res.data.meta.msg)
            }
        },

        // 改变switch按钮的状态
        async userMgState(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
            console.log(res);
            if (res.data.meta.status === 200) {
                // 提示信息
                this.$message.success(res.data.meta.msg);

            }
        },

        // 显示分配角色对话框
        async showCheckCurr(user) {
            this.dialogFormVisibleCurr = true
            // 获取用户名
            this.currName = user.username;
            // 发送请求获取角色分类
            const res = await this.$http.get('roles');
            console.log(res)
            this.currlist = res.data.data
            // 给用户id赋值
            this.currUserId =user.id

        //    根据id获取用户信息
        const res1 = await this.$http.get(`users/${user.id}`);
        // console.log(res1)
        this.currRoleId = res1.data.data.rid
        },

        // 分配用户角色
        async setRole() {
            const res = await this.$http.put(`users/${this.currUserId}/role`,{rid:this.currRoleId})
            // console.log(res)
            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
            }
            // 关闭对话框
            this.dialogFormVisibleCurr = false;
        }
    }
};
</script>

<style>
.box-card {
    height: 100%;
}

.input-search {
    width: 400px;
}

.search-box {
    margin-top: 20px;
}
</style>
