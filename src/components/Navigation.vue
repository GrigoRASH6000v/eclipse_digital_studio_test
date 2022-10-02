<template>
  <el-menu
    :default-active="modelValue"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="(index) => $emit('update:modelValue', index)"
  >
    <el-menu-item index="0">
      ВАЛЮТА
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item
      :index="key"
      v-for="(component, key) in components"
      :key="key"
    >
      {{ component.title }}
    </el-menu-item>
  </el-menu>
</template>
<script >


export default {
  props: {
    modelValue: {
      type: String,
      default: () => "1"
    },
    components: {
      type: Object,
      default: () => ({})
    }
  }
}


</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
