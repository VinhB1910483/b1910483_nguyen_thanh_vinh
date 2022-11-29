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
          :listValue="chose.typeCheck"
          @onCheckListChange="(value) => (query.typeChecked = [...value])"
        />
      </div>
      <h3 class="title">Dung lượng</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.capacityCheck"
          @onCheckListChange="(value) => (query.capacityChecked = [...value])"
        />
      </div>
      <h3 class="title">Cache</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.cacheCheck"
          @onCheckListChange="(value) => (query.cacheChecked = [...value])"
        />
      </div>
      <h3 class="title">Form</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.formCheck"
          @onCheckListChange="(value) => (query.formChecked = [...value])"
        />
      </div>
      <h3 class="title">Interface</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.interfaceCheck"
          @onCheckListChange="(value) => (query.interfaceChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { MainboardQuery, StorageDriveQuery } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: StorageDriveQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    productBrandCheck: ["Western Digital","Silicon","Seagate","Gigabyte","Kingston","Crucial","Sabrent","Samsung","Intel","TEAMGROUP","SK Hynix","Timetec","Leven"],
    typeCheck: ["SSD","7200 RPM","5400 RPM"],
    capacityCheck: ["2 TB","1 TB","500 GB","4 TB","8 TB","1.02 TB","256 GB","2.048 TB","512 GB","20 TB","64 GB","15.3 TB","250 GB","1.024 TB","480 GB","22 TB","240 GB","1.2 TB","120 GB"],
    cacheCheck: ["64 MB","2048 MB","512 MB","4096 MB","256 MB","1024 MB"],
    formCheck: ["M.2-2280","2.5\"","3.5\"","PCIe"],
    interfaceCheck: ["M.2 PCIe 4.0 X4","SATA 6.0 Gb/s","M.2 PCIe 3.0 X4","PCIe x8","PCIe x4"],
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    productBrandChecked: <string[]>[],
    typeChecked: <string[]>[],
    capacityChecked: <string[]>[],
    maxReadChecked: <string[]>[],
    maxWriteChecked: <string[]>[],
    cacheChecked: <string[]>[],
    formChecked: <string[]>[],
    interfaceChecked: <string[]>[],
    pricePerGbChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.productBrandChecked,
        type: query.typeChecked,
        capacity: query.capacityChecked,
        maxRead: query.maxReadChecked,
        maxWrite: query.maxWriteChecked,
        cache: query.cacheChecked,
        form: query.formChecked,
        interface: query.interfaceChecked,
        pricePerGb: query.pricePerGbChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.productBrandChecked = [];
    query.typeChecked = [];
    query.capacityChecked = [];
    query.maxReadChecked = [];
    query.maxWriteChecked = [];
    query.cacheChecked = [];
    query.formChecked = [];
    query.interfaceChecked = [];
    query.pricePerGbChecked = [];
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
