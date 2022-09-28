<script setup lang="ts">
import { groupBy } from 'lodash-es'
import { queryLine } from '~/composables'
const props = defineProps<{ name: string }>()
const current = ref(0)
const upOrDown = ref(true)
interface BusItem {
  vehicleOrder: number
  lng: number
  distance: number
  gpsTime: string
  plateNumber: string
  lat: number
  isArriveStation: number

}
interface BusStatus {
  busAverageSpeed: number
  clientShowVehicleNumber: number
  list: BusItem[]
  startTime: string
}
interface StationItem {
  haveBikeStation: number
  id: string
  lastDistance: number
  poiOriginLat: number
  poiOriginLon: number
  stationName: string
  stationOrder: number
  busArr: BusItem[]
}
interface RouteDetail {
  endStation: string
  geometry: string
  id: string
  startFirst: string
  startLast: string
  startStation: string
  stationList: StationItem[]
}
// const vehicleDetail = ref({
//   busAverageSpeed: 420,
//   clientShowVehicleNumber: 3,
//   list: [],
//   startTime: '18:00',
// })
interface BusRouteDetail {
  areaCode: string
  down: RouteDetail
  lineName: string
  up: RouteDetail
}
const LOAD = '加载中'
const routeDetail = ref<BusRouteDetail>({
  areaCode: LOAD,
  down: {
    endStation: LOAD,
    geometry: '',
    id: '3309002281',
    startFirst: LOAD,
    startLast: LOAD,
    startStation: LOAD,
    stationList: [],
  },
  lineName: '加载中',
  up: {
    endStation: LOAD,
    geometry: '',
    id: '3309002281',
    startFirst: LOAD,
    startLast: LOAD,
    startStation: LOAD,
    stationList: [],
  },
})
const crtBusOrderId = ref<number[]>([])
const groupsVl = ref<any>({})
const crtRoute = computed(() => {
  return upOrDown.value ? routeDetail.value?.up : routeDetail.value?.down
})

const loadDetail = async () => {
  const res = await details(crtRoute.value?.id)
  const vehicleDetail: BusStatus = res.data.data
  crtBusOrderId.value = vehicleDetail.list.map((m: BusItem) => m.vehicleOrder)
  ///
  const vL = vehicleDetail.list
  const groups = vL.length ? groupBy(vL, 'vehicleOrder') : {}
  groupsVl.value = groups
}

const onLoad = async () => {
  const res = await queryLine(props.name)
  routeDetail.value = res.data.data
  if (routeDetail.value?.down)
    upOrDown.value = false
  else
    upOrDown.value = true
  loadDetail()
}

onMounted(() => {
  onLoad()
})
</script>

<template>
  <div>
    <t-navbar>
      线路查询
    </t-navbar>
    <div class="flex justify-between">
      <div class="flex flex-col items-start m-4">
        <div class="flex items-center">
          <span class="border-solid p-1 text-green-600 border-green-600">起</span>
          <span>{{ crtRoute!.startStation }}</span>
        </div>
        <div class="flex items-center">
          <span class="border-solid p-1 text-red-600 border-red-600">终</span>
          <span>{{ crtRoute!.endStation }}</span>
        </div>
        <div>首发：{{ crtRoute!.startFirst }} 末班：{{ crtRoute!.startLast }}</div>
      </div>
      <div>
        <div class="i-carbon:arrows-vertical text-4xl inline-block m-4" @click="upOrDown = !upOrDown" />
        <div class="i-carbon:update-now text-4xl inline-block m-4" @click="loadDetail" />
      </div>
    </div>
    <t-divider />
    <div class="flex justify-between">
      <div class="m-4">
        Hi, {{ props.name }}
      </div>
      <div class="i-carbon:bus text-4xl inline-block m-4" />
    </div>
    <div class="px-4 py-8">
      <t-steps v-model="current" layout="vertical" theme="dot">
        <t-step
          v-for="item in crtRoute.stationList"
          :key="item.stationOrder"
          :title="item.stationName"
        >
          <!-- {{ item }} -->
          <template #extra>
            <div v-show="crtBusOrderId.includes(item.stationOrder)">
              <div v-for="it in groupsVl[item.stationOrder]" :key="it.plateNumber">
                {{ it.plateNumber }}
                <span v-if="it.isArriveStation">已到站</span>
                <span v-else>未到站，距离{{ it.distance }}米</span>
              </div>
            </div>
            <!-- <div v-for="bus in item.busArr" :key="bus.plateNumber" class="extra-img">
              {{ bus.plateNumber }}
            </div> -->
          </template>
        </t-step>
      </t-steps>
    </div>
  </div>
</template>
