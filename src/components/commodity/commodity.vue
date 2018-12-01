<template>
<el-card>
    <!-- 面包屑 -->
    <my-bread leav1="商品管理" leav2="商品列表"></my-bread>

    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select search">
        <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加商品</el-button>

    <!-- 表格 -->
    <el-table :data="tableData" height="500" border style="width: 100%">
         <el-table-column type="index" label="#" width="100">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_number" label="商品重量">
        </el-table-column>
        <el-table-column  label="创建日期" width="180">
            <template slot-scope="scope">
                {{scope.row.add_time | fmData}}
            </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
            <template slot-scope="scope">
                 <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
                <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '', //搜索框数据
            tableData: [], //表格数据
            pagenum:5,
            pagesize:6
        }
    },
    created() {
        this.getGoods();
    },
    methods:{
       async getGoods() {
           const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
           console.log(res)
           this.tableData = res.data.data.goods;
           console.log(this.tableData)
        }
    }
}
</script>

<style>
.search {
    margin-top: 20px;
    width: 400px;
}
</style>
