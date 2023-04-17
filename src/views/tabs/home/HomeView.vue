<template>
  <div>home</div>
  <div>{{ testData }}</div>
</template>

<script setup>
import { fetchTest } from '@/api/test'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

let testData = ref('0') // 用于存储接口返回的数据

onMounted(() => {
  fetchTest().then((res) => {
    console.log('onMounted==>', res)
    testData.value = res.desc
  })
})
onActivated(() => {
  console.log('onActive ==> home active')
})

onDeactivated(() => {
  console.log('onDeactive ==> home deactive')
})

onUnmounted(() => {
  console.log('home unmounted')
})
</script>
