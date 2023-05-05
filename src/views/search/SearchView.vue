<template>
  <div class="search-view">
    <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @cancel="emits('cancel')"
      @search="onSearch"
    >
    </OpSearch>
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <TransitionGroup>
        <div class="history-tag" @click="onSearch(v)" v-for="v in historyTags" :key="v">
          {{ v }}
        </div>
        <div class="history-tag" key="arrow" @click="toggleHistoryTag">
          <VanIcon v-if="isHistoryTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-down"></VanIcon>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <div class="no-result" v-if="!searchResult.length">~暂无推荐</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearchResult } from '@/types'
import OpSearch from '@/components/OpSearch.vue'
import { fetchSearchData } from '@/api/search'
import { ref, computed } from 'vue'

import { useToggle } from '@/use/useToggle'
interface IEmits {
  (e: 'cancel'): void
}

const emits = defineEmits<IEmits>()

const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INIT)
const onSearch = async (value?: string | number) => {
  console.log('search', value)
  if (!value) {
    searchResult.value = []
    return
  } else {
    searchValue.value = value as string
  }
  try {
    searchState.value = DOING
    const { list } = await fetchSearchData(value as string)
    console.log('🚀 ~ file: SearchView.vue:58 ~ onSearch ~ list:', list)
    searchResult.value = list
  } finally {
    searchState.value = DONE
  }
}

const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '玉米',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果'
]

const [isHistoryTagShown, toggleHistoryTag] = useToggle(false)
const historyTags = computed(() =>
  isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
)
</script>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
      .name {
        flex: 1;
        padding-left: 6px;
      }
      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
