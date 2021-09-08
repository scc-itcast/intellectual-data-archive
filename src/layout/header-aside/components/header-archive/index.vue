<template>
  <div class="btn-text-box">
    <div>城建档案管</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  }
}
</script>
