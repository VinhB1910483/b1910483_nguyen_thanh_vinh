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
          :listValue="chose.brandCheck"
          @onCheckListChange="(value) => (query.brandChecked = [...value])"
        />
      </div>
      <h3 class="title">Kích thước</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.screenSizeCheck"
          @onCheckListChange="(value) => (query.screenSizeChecked = [...value])"
        />
      </div>
      <h3 class="title">Phân giải</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.resolutionCheck"
          @onCheckListChange="(value) => (query.resolutionChecked = [...value])"
        />
      </div>
      <h3 class="title">Tỉ lệ</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.ratioCheck"
          @onCheckListChange="(value) => (query.ratioChecked = [...value])"
        />
      </div>
      <h3 class="title">Tần số quét</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.refreshRateCheck"
          @onCheckListChange="
            (value) => (query.refreshRateChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Tốc độ</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.responseTimeCheck"
          @onCheckListChange="
            (value) => (query.responseTimeChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Tấm nền</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.panelTypeCheck"
          @onCheckListChange="(value) => (query.panelTypeChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { MainboardQuery, MonitorQuery } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: MonitorQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    brandCheck: ["Samsung","MSI","Dell","Acer","AOC","LG","Asus","HP","Gigabyte","Alienware","BenQ","VIOTEK","Sceptre","ViewSonic"],
    screenSizeCheck: ["32.0","27.0","31.5","21.5","24.0","21.6","28.0","34.1","18.5","55.0","49.0","23.8","24.5","35.0","22.0","20.0","34.0","23.6","30.0","19.0","47.5","65.0","34.2","19.5"],
    resolutionCheck: ["3840 x 2160","2560 x 1440","7680 x 4320","1920 x 1080","3440 x 1440","1366 x 768","5120 x 1440","1600 x 900","2560 x 1080","1280 x 1024"],
    refreshRateCheck: ["240 Hz","165 Hz","60 Hz","75 Hz","144 Hz","280 Hz","170 Hz","180 Hz","360 Hz","none","155 Hz","200 Hz","270 Hz","120 Hz","160 Hz","175 Hz"], 
    responseTimeCheck: ["1 ms","6 ms","4 ms","5 ms","none","0.5 ms","2 ms","3 ms","0.1 ms","0.4 ms"],
    panelTypeCheck: ["VA","IPS","OLED","TN","none","QD-OLED"],
    ratioCheck: ["16:9","21:9","32:9","5:4"],
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    brandChecked: <string[]>[],
    screenSizeChecked: <string[]>[],
    resolutionChecked: <string[]>[],
    refreshRateChecked: <string[]>[],
    responseTimeChecked: <string[]>[],
    panelTypeChecked: <string[]>[],
    ratioChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.brandChecked,
        screenSize: query.screenSizeChecked,
        resolution: query.resolutionChecked,
        refreshRate: query.refreshRateChecked,
        responseTime: query.responseTimeChecked,
        panelType: query.panelTypeChecked,
        ratio: query.ratioChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.brandChecked = [];
    query.screenSizeChecked = [];
    query.resolutionChecked = [];
    query.refreshRateChecked = [];
    query.responseTimeChecked = [];
    query.panelTypeChecked = [];
    query.ratioChecked = [];
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
