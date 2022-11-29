<template>
  <div>
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
          :listValue="chose.productBrandCheck"
          @onCheckListChange="
            (value) => (query.productBrandChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Loại</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.trackingMethodCheck"
          @onCheckListChange="
            (value) => (query.trackingMethodChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Kiểu kết nối</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.connectTypeCheck"
          @onCheckListChange="
            (value) => (query.connectTypeChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Tay</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.handCheck"
          @onCheckListChange="(value) => (query.handChecked = [...value])"
        />
      </div>
      <h3 class="title">Màu</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.colorCheck"
          @onCheckListChange="(value) => (query.colorChecked = [...value])"
        />
      </div>
      <h3 class="title">DPI</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.dpiCheck"
          @onCheckListChange="(value) => (query.dpiChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { CpuQuery, MouseQuery } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: MouseQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    productBrandCheck: ["Logitech","Razer","Corsair","Glorious","Verbatim","SteelSeries","HP","Asus","Redragon","Cooler Master","Trust","FinalMouse","NZXT"],
    trackingMethodCheck: ["Optical","Laser"],
    connectTypeCheck: ["Wireless","Wired","Wired, Wireless, Bluetooth Wireless","Bluetooth Wireless","Wired, Wired, Wireless"],
    dpiCheck: ['8000','6400','18000','12000','20000','16000','8500','1000','30000','19000','25600','8200','6200','26000','800','7200','17995','4000','17997','3200','1600','2500','25400','10000'],
    handCheck:["Right","Both"],
    colorCheck: ["White","Black / Green","Black","White / Gray","Pink","Black / Blue","Blue","Brown / Black","Black / Silver","Black / Orange","Black / Multicolor","Gray"],
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    productBrandChecked: <string[]>[],
    trackingMethodChecked: <string[]>[],
    connectTypeChecked: <string[]>[],
    dpiChecked: <string[]>[],
    handChecked: <string[]>[],
    colorChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.productBrandChecked,
        trackingMethod: query.trackingMethodChecked,
        connectType: query.connectTypeChecked,
        dpi: query.dpiChecked,
        hand: query.handChecked,
        color: query.colorChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.productBrandChecked = [];
    query.trackingMethodChecked = [];
    query.connectTypeChecked = [];
    query.dpiChecked = [];
    query.handChecked = [];
    query.colorChecked = [];
  }
</script>
<style lang="scss">
  .filter_list {
    color: var(--text-light-1);
    background-color: #fff;
    padding: 20px 10px;
    margin-top: 10px;
    border-radius: 10px;
    .title {
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
</style>
