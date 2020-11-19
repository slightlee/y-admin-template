<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {
      // 这一步很关键，这是 Element-UI 向 Vue 暴露的实例属性
      this.$ELEMENT.size = size
      // 这里就是把尺寸写入 cookie ：Cookies.set('size', size)，供页面刷新时使用
      this.$store.dispatch('app/setSize', size)
      // 主要为了及时当前页面生效
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route
      // 这里使用 nextTick 是为了确保上面的 dispatch 里 promise 异步清除的任务完成
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
