<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
    <OpLoadingView :loading="pending" type="skeleton">
      <TheTransformer :data="data.transformer" />
      <ScrollBar :data="data.scrollBarInfoList" />
      <div class="home-page__activity">
        <CountDown :data="data.countdown" />
      </div>
    </OpLoadingView>
  </div>
</template>

<script setup lang="ts">
import type { IBanner, ICountdown, IHomeInfo } from '@/types'
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from '@/components/ScrollBar.vue'
import CountDown from '@/components/CountDown.vue'
import { useToggle } from '@/use/useToggle'
import SearchView from '@/views/search/SearchView.vue'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import OpLoadingView from '@/components/OpLoadingView.vue'

const recomments = [
  {
    value: 1,
    label: '牛腩'
  },
  {
    value: 2,
    label: '色拉'
  }
]

const [isSearchViewShown, toggleSearchView] = useToggle(false)
// console.log(`output->isSearchViewShown`, isSearchViewShown.value)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
  searchRecomments: []
} as IHomeInfo)
console.log('🚀 ~ file: HomeView.vue:33 ~ data:', data)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
