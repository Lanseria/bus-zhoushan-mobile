<script setup lang="ts">
import { searchBusLines } from '~/composables'

const router = useRouter()

const loading = ref(false)
const list = ref([])
const value = ref('')

const onLoad = async () => {
  loading.value = true
  const res = await searchBusLines(value.value)
  console.log(res.data.data)
  list.value = res.data.data.list
  loading.value = false
}

const onChange = (val: string) => {
  console.log('change: ', val)
  onLoad()
}
const onScroll = ({ scrollBottom }: { scrollBottom: number }) => {
  if (scrollBottom === 0)
    onLoad()
}
const go = (name: string) => {
  router.push(`/detail/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <t-navbar :left-arrow="false">
      线路查询
    </t-navbar>
    <div>
      <t-search v-model="value" :clearable="true" placeholder="请输入关键字" @change="onChange" />
      <t-list @scroll="onScroll">
        <t-cell v-for="item in list" :key="item" align="middle" @click="go(item.lineName)">
          <div class="flex w-full justify-between">
            <div>{{ item.lineName }}</div>
            <div>
              <div>{{ item.startStation }}</div>
              <div>{{ item.endStation }}</div>
            </div>
          </div>
        </t-cell>
      </t-list>
    </div>
  </div>
</template>
