<template>
  <div class="content-form-item-box">
    <div class="preview-content-form-item-look">
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">文件档号</div>
          <div class="ceil-value">
            {{ current_preview_obj.document_no }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">文件题名</div>
          <div class="ceil-value">
            {{ current_preview_obj.document_title }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">原名称</div>
          <div class="ceil-value">
            {{ current_preview_obj.origin_name }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">责任者</div>
          <div class="ceil-value">
            {{ current_preview_obj.res_people }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">版权所有者</div>
          <div class="ceil-value">
            {{ current_preview_obj.copyright }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">拍摄地点</div>
          <div class="ceil-value">
            {{ current_preview_obj.shoot_address }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">拍摄事由</div>
          <div class="ceil-value">
            {{ current_preview_obj.shoot_reason }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">拍摄者</div>
          <div class="ceil-value">
            {{ current_preview_obj.shoot_people }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">拍摄日期</div>
          <div class="ceil-value">
            {{ current_preview_obj.shoot_date }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">原编号</div>
          <div class="ceil-value">
            {{ current_preview_obj.origin_number }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">文件类型</div>
          <div class="ceil-value">
            {{ current_preview_obj.file_type }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">载体类型</div>
          <div class="ceil-value">
            {{ current_preview_obj.carr_type }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">底片号</div>
          <div class="ceil-value">
            {{ current_preview_obj.film_no }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">盘号</div>
          <div class="ceil-value">
            {{ current_preview_obj.plate_no }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">参见号</div>
          <div class="ceil-value">
            {{ current_preview_obj.see_no }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">人物</div>
          <div class="ceil-value">
            {{ current_preview_obj.figure }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">保管期限</div>
          <div class="ceil-value">
            {{ current_preview_obj.safe_duration }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">密级</div>
          <div class="ceil-value">
            {{ current_preview_obj.security_class }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">来源</div>
          <div class="ceil-value">
            {{ current_preview_obj.source }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">接收日期</div>
          <div class="ceil-value">
            {{ current_preview_obj.receive_date }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">声像文件顺序号</div>
          <div class="ceil-value">
            {{ current_preview_obj.serial_number }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">关键字</div>
          <div class="ceil-value">
            {{ current_preview_obj.keyword }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">主题词</div>
          <div class="ceil-value">
            {{ current_preview_obj.subject_headings }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">描述</div>
          <div class="ceil-value">
            {{ current_preview_obj.group_descript }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">文字说明</div>
          <div class="ceil-value">
            {{ current_preview_obj.text_instruct }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">备注</div>
          <div class="ceil-value">
            {{ current_preview_obj.remark }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">录入人</div>
          <div class="ceil-value">
            {{ current_preview_obj.enter_pepole }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">录入时间</div>
          <div class="ceil-value">
            {{ current_preview_obj.enter_time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['current_preview_obj'],
  setup(prop, context) {
    let contextData = reactive({
      archive: {
        document_no: '', // 文件档号
        document_title: '', // 文件题名
        origin_name: '', // 原名称
        res_people: '', // 责任者
        copyright: '', // 版权所有者
        shoot_address: '', // 拍摄地点
        shoot_reason: '', // 拍摄事由
        shoot_people: '', // 拍摄者
        shoot_date: '', // 拍摄日期
        origin_number: '', // 原编号
        file_type: '', // 文件类型
        carr_type: '', // 载体类型
        film_no: '', // 底片号
        plate_no: '', // 盘号
        see_no: '', // 参见号
        figure: '', // 人物
        safe_duration: '', // 保管期限
        security_class: '', // 密级
        source: '', // 来源
        receive_date: '', // 接收日期
        serial_number: '', // 声像文件顺序号
        keyword: '', // 关键字
        subject_headings: '', // 主题词
        group_descript: '', // 描述
        text_instruct: '', // 文字说明
        remark: '', // 备注
        enter_pepole: '', // 录入人
        enter_time: '' // 录入时间
      }
    })

    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>
