<script setup lang="ts">
import { AppIcon } from 'tdesign-icons-vue-next'
const router = useRouter()
const value = ref(null)
const list = [
  {
    name: '/',
    text: '线路查询',
  },
  {
    name: '/station',
    text: '站点查询',
  },
  {
    name: '/change',
    text: '换乘查询',
  },
]
watch(value, (newValue) => {
  // console.log('当前值：', newValue)
})

const change = (changeValue: string) => {
  // console.log('TabBar 值改变为：', changeValue)
  router.replace(changeValue)
}
</script>

<template>
  <t-tab-bar v-model="value" class="mt-12" @change="change">
    <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :value="item.name" :name="item.name">
      <template #icon>
        <AppIcon />
      </template>
      {{ item.text }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>
