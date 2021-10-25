<template>
  <div class="content-form-item-box">
    <div class="preview-content-form-item-look">
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">照相机制造商</div>
          <div class="ceil-value">
            {{ current_preview_obj.camera_maker }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">照相机型号</div>
          <div class="ceil-value">
            {{ current_preview_obj.camera_model }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">宽度(像素)</div>
          <div class="ceil-value">
            {{ current_preview_obj.width_pix }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">高度(像素)</div>
          <div class="ceil-value">
            {{ current_preview_obj.height_pix }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">水平分辨率(dpi)</div>
          <div class="ceil-value">
            {{ current_preview_obj.level_resolution }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">垂直分辨率(dpi)</div>
          <div class="ceil-value">
            {{ current_preview_obj.vertical_resolution }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">位深度</div>
          <div class="ceil-value">
            {{ current_preview_obj.pos_depth }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">色彩空间</div>
          <div class="ceil-value">
            {{ current_preview_obj.color_space }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">光圈值</div>
          <div class="ceil-value">
            {{ current_preview_obj.aperture }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">曝光时间</div>
          <div class="ceil-value">
            {{ current_preview_obj.exposure_time }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">ISO 速度</div>
          <div class="ceil-value">
            {{ current_preview_obj.iso_speed }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">焦距</div>
          <div class="ceil-value">
            {{ current_preview_obj.focal_length }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">镜头类型</div>
          <div class="ceil-value">
            {{ current_preview_obj.lens_type }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">经度</div>
          <div class="ceil-value">
            {{ current_preview_obj.longitude }}
          </div>
        </div>
      </div>
      <div class="content-form-wrapper">
        <div class="content-form-wrapper-column">
          <div class="ceil-text">纬度</div>
          <div class="ceil-value">
            {{ current_preview_obj.latitude }}
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
      metadata: {
        camera_maker: '', // 照相机制造商
        camera_model: '', // 照相机型号
        width_pix: '', // 宽度(像素)
        height_pix: '', // 高度(像素)
        level_resolution: '', // 水平分辨率(dpi)
        vertical_resolution: '', // 垂直分辨率(dpi)
        pos_depth: '', // 位深度
        color_space: '', // 色彩空间
        aperture: '', // 光圈值
        exposure_time: '', // 曝光时间
        iso_speed: '', // ISO 速度
        focal_length: '', // 焦距
        lens_type: '', // 镜头类型
        longitude: '', // 经度
        latitude: '' // 纬度
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
