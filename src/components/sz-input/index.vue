<template>
  <div class="input" id="input">
    <div class="input_item">
      <el-input
        v-if="dataType == 'text'"
        v-model="dataValue"
        placeholder="请输入内容"
      ></el-input>
      <el-input
        v-else-if="dataType == 'textarea'"
        v-model="dataValue"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
      ></el-input>
      <el-date-picker
        v-else-if="dataType == 'time'"
        v-model="dataValue"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-cascader
        v-else-if="dataType == 'cascaderSingle'"
        v-model="dataValue"
        :options="dataSelectList"
        :props="propsObj"
      ></el-cascader>
      <el-select
        v-else-if="dataType == 'selectSingle'"
        v-model="dataValue"
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in dataSelectList"
          :key="index"
          :label="item.label || item.name"
          :value="item.value || item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-else-if="dataType == 'selectMultiple'"
        :style="computed_technology"
        v-model="dataValue"
        multiple
        filterable
        default-first-option
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in dataSelectList"
          :key="index"
          :label="item.label || item.name"
          :value="item.value || item.id"
        >
        </el-option>
      </el-select>
      <Upload
        style="width:550px"
        v-else-if="dataType == 'effectPicture'"
        :fileList="dataValue"
        @increase="fun_upload_increase"
        @remove="fun_upload_remove"
      ></Upload>
    </div>
    <el-button type="primary" @click="fun_cancelHandle" class="cancel_btn"
      >取消</el-button
    >
    <el-button type="primary" @click="fun_saveHandel">确定</el-button>
  </div>
</template>
<script>
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
import Upload from '@/views/SXsitting/BaseSting/components/upload.vue'
export default {
  name: 'input-component',
  components: {
    Upload
  },
  props: ['propsObject', 'index'],
  setup(prop, context) {
    let contextData = reactive({
      dataValue: '-',
      dataType: '',
      dataSelectList: [],
      propsObj: {
        value: 'id',
        label: 'name'
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })
    watchEffect(() => {
      contextData.dataType = prop.propsObject.type
      if (
        prop.propsObject.type == 'selectSingle' ||
        prop.propsObject.type == 'selectMultiple' ||
        prop.propsObject.type == 'cascaderSingle'
      ) {
        contextData.dataValue = prop.propsObject.valueId
      } else {
        contextData.dataValue = JSON.parse(
          JSON.stringify(prop.propsObject.value)
        )
      }
      contextData.dataSelectList = prop.propsObject.selectList
      contextData.propsObj = prop.propsObject.propsObj
    })

    const fun_upload_increase = file => {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        fun_upload_remove(file)
        return context.root.$message.error('上传图片大小不能超过 2MB!')
      }
      contextData.dataValue.push(file)
      console.log(file)
    }
    const fun_upload_remove = file => {
      contextData.dataValue = contextData.dataValue.filter(
        item => item.uid !== file.uid
      )
    }
    const fun_cancelHandle = () => {
      contextData.dataValue = []
      context.emit('cancelHandle', prop.index)
    }
    const fun_saveHandel = () => {
      const obj = {
        value: contextData.dataValue,
        index: prop.index
      }
      context.emit('saveHandel', obj)
    }
    const computed_technology = computed(() => {
      let obj = {
        minWidth: '217px',
        width: contextData.dataValue.length * 90 + 50 + 'px'
      }
      return obj
    })
    return {
      contextData,
      ...toRefs(contextData),
      fun_cancelHandle,
      fun_saveHandel,
      fun_upload_increase,
      fun_upload_remove,
      computed_technology
    }
  }
}
</script>
<style scoped>
#input >>> .el-cascader,
#input >>> .el-input {
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
}
#input >>> .el-textarea,
#input >>> textarea,
#input >>> .el-upload {
  background-color: rgba(0, 0, 0, 0);
}

#input >>> .el-input__inner {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65) !important;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}
#input >>> .el-input__icon {
  height: 32px;
  line-height: 32px;
}
#input >>> .el-input__inner:hover {
  border: 1px solid #409eff;
}
#input >>> .el-button {
  box-sizing: border-box;
  padding: 4px 11px;
  height: 32px;
}
</style>
<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  .input_item {
    min-width: 220px;
  }
  .cancel_btn {
    margin-left: 12px;
  }
}
</style>
