import { mapState, mapActions } from 'vuex'
export default {
  created() {
    if (this.asideShow) return
    this.asideShowSet(true)
  },
  computed: {
    ...mapState('d2admin', {
      asideShow: state => state.menu.asideShow
    })
  },
  methods: {
    ...mapActions('d2admin/menu', ['asideShowSet'])
  }
}
