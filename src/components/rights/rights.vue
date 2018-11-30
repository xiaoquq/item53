<template>
<el-card>
    <!-- 面包屑 -->
    <my-bread leav1="权限管理" leav2="权限列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="tableData3" height="500" border style="width: 100%">
        <el-table-column type="index" label="#" width="180">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="300">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="300">
        </el-table-column>
        <el-table-column  label="层级">
            <template slot-scope="scope">
                <span v-if="scope.row.level=== '0'">一级</span>
                <span v-if="scope.row.level=== '1'">二级</span>
                <span v-if="scope.row.level=== '2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            tableData3: []
        }
    },
    created() {
        this.getrights()
    },
    methods: {

        async getrights() {
            //  const AUTH_TOKEN = localStorage.getItem("token");
            // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get('rights/list');
            console.log(res)
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                this.tableData3 = res.data.data
            }
        }
    }
}
</script>

<style>

</style>
