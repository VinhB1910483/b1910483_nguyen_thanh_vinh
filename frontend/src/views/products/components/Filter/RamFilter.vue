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
      <h3 class="title">Dung lươngk</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.capacityCheck"
          @onCheckListChange="(value) => (query.capacityChecked = [...value])"
        />
      </div>
      <h3 class="title">Tốc độ</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.speedCheck"
          @onCheckListChange="(value) => (query.speedChecked = [...value])"
        />
      </div>
      <h3 class="title">Chuẩn</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.standardCheck"
          @onCheckListChange="(value) => (query.standardChecked = [...value])"
        />
      </div>
      <h3 class="title">Loại</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.moduleCheck"
          @onCheckListChange="(value) => (query.moduleChecked = [...value])"
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
      <h3 class="title">Latency</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.latencyCheck"
          @onCheckListChange="(value) => (query.latencyChecked = [...value])"
        />
      </div>
      <h3 class="title">Cas</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.casCheck"
          @onCheckListChange="(value) => (query.casChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type {
    MainboardQuery,
    RamQuery,
    StorageDriveQuery,
  } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: RamQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    productBrandCheck: ["TEAMGROUP","Corsair","G.Skill","Kingston","Crucial","Silicon","Patriot"],
    capacityCheck: ['16','32','2','64','8','128',],
    speedCheck: ['3600','6200','5200','667','6000','3200','4800','5600','6600','2666','2400','1600','7200','4000','6400',],
    standardCheck: ["DDR2","DDR3","DDR4","DDR5"],
    moduleCheck: ["2 x 8GB","2 x 16GB","1 x 2GB","4 x 16GB","2 x 32GB","4 x 8GB","1 x 8GB","4 x 32GB","2 x 4GB","8 x 16GB"],
    colorCheck: ["Black / Silver","Black","Green","Black / Yellow","Red / Black","Black / Gray","White","White / Black","Silver","Blue","Silver / Black","Black / White","Gray"],
    latencyCheck: ['10','12','15','16','13','14','9','11','17',],
    casCheck:['18','36','40','5','30','16','38','34','22','9','32','19',] ,
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    productBrandChecked: <string[]>[],
    capacityChecked: <string[]>[],
    speedChecked: <string[]>[],
    standardChecked: <string[]>[],
    moduleChecked: <string[]>[],
    colorChecked: <string[]>[],
    latencyChecked: <string[]>[],
    casChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.productBrandChecked,
        capacity: query.capacityChecked,
        speed: query.speedChecked,
        standard: query.standardChecked,
        module: query.moduleChecked,
        color: query.colorChecked,
        latency: query.latencyChecked,
        cas: query.casChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.productBrandChecked = [];
    query.capacityChecked = [];
    query.speedChecked = [];
    query.standardChecked = [];
    query.moduleChecked = [];
    query.colorChecked = [];
    query.latencyChecked = [];
    query.casChecked = [];
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
