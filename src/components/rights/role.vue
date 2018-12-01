<template>
<el-card>
    <my-bread leav1="权限管理" leav2="角色列表"></my-bread>
    <el-button type="success" class="add_btn" @click="addRole()">添加角色</el-button>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand" width="150">
            <template slot-scope="scope">
                <el-row v-for="(item,i) in scope.row.children" :key="i">
                    <el-col :span="4">
                        <el-tag @close="deleRole(scope.row,item.id)" closable>{{item.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="(item2,i) in item.children" :key="i">
                            <el-col :span="4">
                                <el-tag @close="deleRole(scope.row,item2.id)" closable type="warning">{{item2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>

                            </el-col>
                            <el-col :span="20">
                                <!-- <el-row > -->
                                <el-tag @close="deleRole(scope.row,item3.id)" v-for="(item3,i) in item2.children" :key="i" closable type="success">{{item3.authName}}</el-tag>
                                <!-- </el-row> -->
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <span v-if="scope.row.children.length === 0">{{'未分配权限'}}</span>
            </template>
        </el-table-column>

        <el-table-column type="index" label="#" width="180">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size='mini' plain icon="el-icon-edit" circle @click="editRole(scope.row)"></el-button>
                <el-button type="danger" size='mini' plain icon="el-icon-delete" circle @click="deleteRole(scope.row)"></el-button>
                <el-button type="success" size='mini' plain icon="el-icon-check" circle @click="checkRole(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 添加按钮显示对话框 -->
    <el-dialog title="添加角色" :visible.sync="dialogTableVisibleRole">
        <el-form :model="addForm">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth">
                <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addForm_btn(scope.row)">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑按钮显示对话框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogTableVisibleEditRole">
        <el-form :model="addForm">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth">
                <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editForm_btn()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配权限显示对话框 -->
    <!-- 树形结构
          data->数据源 []
          show-checkbox -> 选择框
          node-key 每个节点的唯一标识 通常时data数据源中key名id
          default-expanded-keys 默认展开 [要展开的节点的id]
          default-checked-keys [要选择的节点的id]
          props 配置项 {label,children}
          label节点的文字标题和children节点的子节点
          值都来源于data绑定的数据源中的该数据的key名 'label'和'children' 
           :default-expanded-keys="[2, 3]" 
        :default-checked-keys="[5]" -->
    <el-dialog title="添加角色" :visible.sync="dialogTableVisibleCheckRole">
        <el-tree 
        ref="tree"
        :data="data2" 
        show-checkbox 
        node-key="id" 
        default-expand-all 
        :default-checked-keys='arrcheck' 
        :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addForm_btn()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            tableData: [], //保存表格数据
            addForm: {
                roleName: '',
                roleDesc: ''
            }, // 保存添加角色对话框数据
            formLabelWidth: '120px',
            dialogTableVisibleRole: false, // 添加角色对话框
            dialogTableVisibleEditRole: false, // 编辑角色对话框
            dialogTableVisibleCheckRole: false, // 分配角色对话框
            editId: -1, // 定义编辑用户时所需要的id

            // 树结构的数据
            data2: [], // 保存树状结构数据
            defaultProps: { //  props 配置项 {label,children}
                label: 'authName',
                children: 'children'
            },
            // 保存当前角色拥有权限的id
            arrcheck: [],
            currRoleId:-1   // 角色授权所需要的ID

        }
    },
    created() {
        this.getRolelist();
    },
    methods: {
        async getRolelist() {
            const res = await this.$http.get('roles');
            console.log(res)
            this.tableData = res.data.data;
        },

        // 添加角色
        async addRole() {
            // 打开对话框
            this.dialogTableVisibleRole = true;
        },

        async addForm_btn() {
            const res = await this.$http.post('roles', this.addForm);
            console.log(res)
            if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg);
                //   关闭对话框
                this.dialogTableVisibleRole = false
                // 更新视图
                this.getRolelist();
            }

        },

        // 删除角色
        async deleteRole(role) {
            const res = await this.$http.delete(`roles/${role.id}`);
            //   console.log(res);
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                //   更新视图
                this.getRolelist()
            }
        },

        //  编辑角色
        async editRole(role) {
            this.dialogTableVisibleEditRole = true

            const res = await this.$http.get(`roles/${role.id}`);
            // console.log(res)
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                this.addForm = res.data.data
                this.editId = res.data.data.roleId
            }
        },

        async editForm_btn() {
            const res = await this.$http.put(`roles/${this.editId}`, this.addForm);
            //    console.log(res);
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg); // 提示信息
                this.dialogTableVisibleEditRole = false; //关闭对话框
                this.getRolelist(); //更新视图
            }
        },

        //   删除角色指定权限
        async deleRole(role, rightId) {
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
            // console.log(res)
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);

                role.children = res.data.data;
            }
        },

        // 分配权限
        async checkRole(role) {
            this.dialogTableVisibleCheckRole = true

            const res = await this.$http.get('rights/tree');
            console.log(res);
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                this.data2 = res.data.data
            }


            // 获取当前用户拥有权限的id
            var arritem2 = [];
            role.children.forEach(item => {
                arritem2.push(item.id);
                item.children.forEach(item2 => {
                    arritem2.push(item2.id)
                    item2.children.forEach(item3 => {
                        arritem2.push(item3.id)
                    });
                });
            });
            // console.log(arritem2)
            this.arrcheck = arritem2

            // 给角色授权id赋值
            this.currRoleId = role.id;
            
        },

        async addForm_btn() {
            // 获取全选id的数组 arr1   getCheckedKeys()
            let arr1 = this.$refs.tree.getCheckedKeys();
            
            // 获取半选id的数组 arr2   getHalfCheckedKeys()
            let arr2 = this.$refs.tree.getHalfCheckedKeys();
            // console.log(arr1,arr2)
            let arr = [...arr1,...arr2];
            
            const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')});
            // console.log(res)
            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);

                // 关闭对话框
                this.dialogTableVisibleCheckRole = false;

                // 更新视图
                this.getRolelist()
            }


        }

    }
}
</script>

<style>
.add_btn {
    margin-top: 20px
}
</style>
