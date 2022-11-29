<template>
  <div class="filter_list" :key="keyUpdate">
    <div class="filter_header">
      <h3 class="title">Tìm kiếm</h3>
      <span class="reset_btn" @click="handleFilterReset">
        <font-awesome-icon icon="fa-solid fa-rotate-left" /> reset</span
      >
    </div>
    <div class="filter_name">
      <input type="text" placeholder="Tên" v-model="query.nameSearch" />
    </div>

    <h3 class="title">Thương Hiệu</h3>
    <div class="filter_brand">
      <CheckboxList
        class="filter_brand"
        :listValue="chose.bandCheck"
        @onCheckListChange="(value) => (query.brandChecked = [...value])"
      />
    </div>
    <h3 class="title">Dòng</h3>
    <div class="filter_brand">
      <CheckboxList
        class="filter_brand"
        :listValue="chose.procesorCheck"
        @onCheckListChange="(value) => (query.procesorChecked = [...value])"
      />
    </div>

    <h3 class="title">Socket</h3>
    <div class="filter_brand">
      <CheckboxList
        class="filter_brand"
        :listValue="chose.socketCheck"
        @onCheckListChange="(value) => (query.socketChecked = [...value])"
      />
    </div>

    <h3 class="title">IGpu</h3>
    <div class="filter_brand">
      <CheckboxList
        class="filter_brand"
        :listValue="chose.igpuCheck"
        @onCheckListChange="(value) => (query.igpuChecked = [...value])"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { CpuQuery } from '@/types/api/products';
  import type { KeyObject } from 'crypto';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: CpuQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;
  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    brandChecked: <string[]>[],
    procesorChecked: <string[]>[],
    socketChecked: <string[]>[],
    igpuChecked: <string[]>[],
  });
  // prettier-ignore
  const chose = {
      bandCheck: ['Amd','Intel'],
      igpuCheck: ["None","Radeon Vega 7","Radeon Vega 11","Intel UHD Graphics 770","Intel UHD Graphics 630",
          "Intel UHD Graphics 750","Radeon Vega 8","Intel HD Graphics 630","Intel HD Graphics 530","Intel UHD Graphics 730","Intel HD Graphics 4600"],
      procesorCheck: ['Ryzen 3','Ryzen 5','Ryzen 7','Ryzen 9','Core i3','Core i5','Core i7','Core i9',],
      socketCheck: ['AM4', 'AM5', 'LGA 1200', 'LGA 1151']
  }

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        cpuName: query.nameSearch,
        brand: query.brandChecked,
        processor: query.procesorChecked,
        socket: query.socketChecked,
        igpu: query.igpuChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.brandChecked = [];
    query.procesorChecked = [];
    query.socketChecked = [];
    query.igpuChecked = [];
  }
</script>
<style lang="scss">
  .filter_list {
    color: var(--text-light-1);
    background-color: #fff;
    padding: 20px 10px;
    margin-top: 10px;
    border-radius: 10px;
    .filter_header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .reset_btn {
        user-select: none;
        cursor: pointer;
        padding: 2px 5px;
        font-size: 0.8rem;
        color: #aaaaaa;

        &:hover {
          color: var(--orange);
        }
      }
    }
    .title {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .filter_name {
      input {
        padding: 5px;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 5px;
      }
    }
  }
</style>
