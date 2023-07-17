<script lang="ts" setup>
import {computed, ComputedRef, onMounted, Ref, ref} from 'vue'
import {StationApi, StationItem} from './station-list.ts'
type StationRender = {
  oddRow: boolean,
  key: string,
  items: StationItem[]
}
const stationList: Ref<StationItem[]> = ref([])
onMounted(async () => stationList.value = await StationApi.getStationList())
const maxCount = 5
const stationRenderList: ComputedRef<StationRender[]> = computed(() => {
  const res:StationRender[] = []
  for (let rowIdx = 0; rowIdx < stationList.value.length / maxCount; rowIdx++) {
    const currentRow = stationList.value.slice(rowIdx * maxCount, (rowIdx + 1) * maxCount)
    if (rowIdx % 2 === 1) {
      currentRow.reverse()
    }
    res.push({oddRow: rowIdx % 2 ===0, key: currentRow[0].id, items: currentRow})
  }
  return res
})

const calLineDirection = (idx: number, line: StationRender)=>{
  const length = line.items.length
  const oddRow = line.oddRow
  if (oddRow ? idx === length-1 : idx === 0) {
    return 'down'
  }
  if (oddRow) {
    return 'right'
  }
  return 'left'
}
</script>

<template>
  <div class="render-container">
    <div v-for="line in stationRenderList" :key="line.key" class="station-line-container">
      <div v-for="(station, idx) in line.items" :key="station.id" class="station-container">
        <!--线条-->
        <div class="station-line" :class="calLineDirection(idx, line)">
          <!--图标-->
          <div class="station-icon">
            <div class="station-name">{{ station.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.render-container{
  padding-top: 100px;
}
.station-line-container{
  display: flex;
}
.station-name {
  transform: rotate(-45deg);
  width: 60px;
  position: absolute;
  left: 0;
  top: -40px;
}

.station-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid red;
  border-radius: 50%;
  position: relative;
}
.station-line{
  display: flex;
  align-items: center;
}
.station-line:after, .station-line:before {
  content: '';
  display: inline-block;
  background: greenyellow;
}
.station-line.right:after{
  width: 200px;
  height: 6px;
}
.station-line.left:before{
  width: 200px;
  height: 6px;
}
.station-line.down{
  display: flex;
  flex-direction: column;
}
.station-line.down:after{
  width: 6px;
  height: 200px;
  background: blue;
}
/*最后一条线清空*/
.station-line-container:last-child .station-container:last-child .station-line:after{
  content: none;
}
</style>
