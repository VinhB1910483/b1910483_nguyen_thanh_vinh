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
          :listValue="chose.chipsetNameCheck"
          @onCheckListChange="
            (value) => (query.chipsetNameChecked = [...value])
          "
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
      <h3 class="title">Chiều dài (mm)</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.lengthCheck"
          @onCheckListChange="(value) => (query.lengthChecked = [...value])"
        />
      </div>
      <h3 class="title">Bộ nhớ (Gb)</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.memoryCheck"
          @onCheckListChange="(value) => (query.memoryChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { VideoCardQuery } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: VideoCardQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    productBrandCheck: ["MSI","EVGA","PowerColor","Asus","Gigabyte","NVIDIA","PNY","XFX","ASRock","Zotac","Intel","Sapphire"],
    chipsetNameCheck: ["Arc A770","GeForce GTX 1050 Ti","GeForce GTX 1650 G6","GeForce GTX 1660","GeForce GTX 1660 SUPER","GeForce RTX 2060","GeForce RTX 3050 8GB","GeForce RTX 3060","GeForce RTX 3060 Ti","GeForce RTX 3070","GeForce RTX 3070 Ti","GeForce RTX 3080","GeForce RTX 3080 Ti","GeForce RTX 3090","GeForce RTX 3090 Ti","GeForce RTX 4090","Quadro GV100","Radeon RX 580","Radeon RX 6500 XT","Radeon RX 6600","Radeon RX 6600 XT","Radeon RX 6650 XT","Radeon RX 6700 XT","Radeon RX 6800 XT","Radeon RX 6900 XT","Radeon RX 6950 XT"],
    colorCheck: ["Black","Black / Silver","Silver / Black","White / Silver","Silver / Blackz","Black / Gray","Black / Gold","Blackz","Silver / Whitez","Black / Red","Black / Silverz","Silver / White","White / Black","Black / White","White","Gray / Black"],
    lengthCheck: ['337','285','320','326','325','235','282','232','300','305','267','336','286','243','280','172','316','270','340','269','202','318','323','255','324','356','151','242','278','348','281','330','222','224','204','304','313','215','247','276','200','250','358','331','241','193','231',],
    memoryCheck: ['24','8','12','16','32','10','4','6',],
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    productBrandChecked: <string[]>[],
    chipsetNameChecked: <string[]>[],
    colorChecked: <string[]>[],
    lengthChecked: <string[]>[],
    memoryChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.productBrandChecked,
        chipsetName: query.chipsetNameChecked,
        color: query.colorChecked,
        length: query.lengthChecked,
        memory: query.memoryChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.productBrandChecked = [];
    query.chipsetNameChecked = [];
    query.colorChecked = [];
    query.lengthChecked = [];
    query.memoryChecked = [];
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
