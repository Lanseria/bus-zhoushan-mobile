<script setup lang="ts">
import { queryLine } from '~/composables'

const props = defineProps<{ name: string }>()
const router = useRouter()
const current = ref(0)
const downDetail = ref({
  endStation: '',
  geometry: '',
  id: '',
  startFirst: '05:30',
  startLast: '23:00',
  startStation: '东港总站',
  stationList: [],
})
const upDetail = ref({
  endStation: '',
  geometry: '',
  id: '',
  startFirst: '05:30',
  startLast: '23:00',
  startStation: '东港总站',
  stationList: [],
})

const onLoad = async () => {
  const res = await queryLine(props.name)
  downDetail.value = res.data.data.down
  upDetail.value = res.data.data.up
}

onMounted(() => {
  onLoad()
})
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ props.name }}
    </p>
    <div class="px-4 py-8">
      <t-steps v-model="current" layout="vertical" class="demo-steps">
        <t-step
          v-for="item in downDetail.stationList"
          :key="item.id"
          :title="item.stationName"
        />
      </t-steps>
    </div>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
