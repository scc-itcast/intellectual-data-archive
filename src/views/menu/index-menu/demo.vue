<el-table
v-loading="loading"
ref="refTable"
:data="eqTableData"
:max-height="hight"
:row-key="getRowKeys"   //获取当前行id
:expand-row-keys="expands"    //只展开一行放入当前行id
@expand-change="exChange"
>
<el-table-column type="expand">
  <template slot-scope="scope">
    <el-table
      ref="tableChild"
      :data="dataList"
      align="center"
    >
      <el-table-column
        align="center"
        label="时间"
        prop="recordDate"
      />
      <el-table-column
        label="参数"
        prop="param"
        min-width="50%"/>
      <el-table-column
        label="异常原因"
        prop="reason"
        min-width="50%"/>
      <el-table-column
        align="center"
        label="预计读数"
        prop="predictData"
        min-width="50%"/>
      <el-table-column
        align="center"
        label="实际读数"
        prop="actualData"
        min-width="50%"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleIgnore(scope.$index, scope.row)">忽略</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleCorrect(scope.$index, scope.row)">修正</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
</el-table-column>
<el-table-column
  label="设备ID"
  prop="eqId"/>
<el-table-column
  label="所在大厦"
  prop="blName"/>
<el-table-column
  label="所在楼层"
  prop="flName"/>

</el-table>

<script>
export default {
data() {
return {
　　//设置row-key只展示一行
expands: [],//只展开一行放入当前行id
getRowKeys: (row) => {//获取当前行id
// console.log(row)
return row.eqId   //这里看这一行中需要根据哪个属性值是id
},
eqTableData: [],
dataList: []
}
},
methods:{

exChange(row, rowList) {
// console.log(row)
this.loading = true

var that = this
if (rowList.length) { // 只展开一行//说明展开了
that.expands = []
if (row) {
  that.expands.push(row.eqId)// 只展开当前行id
}
//  this.tablaData(row.eqId)  这里可以调用接口数据渲染
} else { // 说明收起了
that.expands = []
}
}
}
}
</script>
