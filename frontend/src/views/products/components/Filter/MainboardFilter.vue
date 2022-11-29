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
      <h3 class="title">Chipset</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.chipsetCheck"
          @onCheckListChange="(value) => (query.chipsetChecked = [...value])"
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
      <h3 class="title">Loại Ram</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.ramStandardCheck"
          @onCheckListChange="
            (value) => (query.ramStandardChecked = [...value])
          "
        />
      </div>
      <h3 class="title">Kiểu</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.formCheck"
          @onCheckListChange="(value) => (query.formChecked = [...value])"
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
      <h3 class="title">Dung lượng ram</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.ramCapCheck"
          @onCheckListChange="(value) => (query.ramCapChecked = [...value])"
        />
      </div>
      <h3 class="title">Khe cắm ram</h3>
      <div class="filter_brand">
        <CheckboxList
          class="filter_brand"
          :listValue="chose.ramSlotCheck"
          @onCheckListChange="(value) => (query.ramSlotChecked = [...value])"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CheckboxList from '@/components/CheckboxList.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import { reactive, watch, computed, ref } from 'vue';
  import type { MainboardQuery } from '@/types/api/products';
  const emit = defineEmits<{
    (e: 'onFilterChange', query: MainboardQuery): void;
  }>();
  var isFetch: ReturnType<typeof setTimeout> | null = null;

  // prettier-ignore
  const chose = {
    brandCheck: ["MSI","Asus","ASRock","Gigabyte","NZXT"],
    chipsetCheck: ["A320","A520","B450","B550","B650","B660","H510","TRX40","X570","X670","Z490","Z590","Z690","Z790"],
    socketCheck: ['AM4','AM5','LGA 1150','LGA 1151','LGA 1155','LGA 1200','LGA 1700','LGA 2011','LGA 2066','sTR4',],
    ramStandardCheck: ['DDR3','DDR4','DDR5',],
    formCheck: ["Micro ATX","ATX","EATX","Mini ITX",],
    colorCheck: ["Black / Silver","Silver / Black","Black / Red","Black","Black / White","Black / Gray","Black / Gold","White / Black","Gray / Black","Red / Black","Brown / Black","Black / Orange",],
    ramCapCheck: ['32','64','128','256'],
    ramSlotCheck: ['2','4','8'],
  };

  const keyUpdate = ref(0);
  const query = reactive({
    nameSearch: '',
    brandChecked: <string[]>[],
    chipsetChecked: <string[]>[],
    socketChecked: <string[]>[],
    ramStandardChecked: <string[]>[],
    formChecked: <string[]>[],
    colorChecked: <string[]>[],
    ramCapChecked: <string[]>[],
    ramSlotChecked: <string[]>[],
  });

  watch(query, (v) => {
    isFetch && clearTimeout(isFetch);
    // console.log(query);
    isFetch = setTimeout(() => {
      emit('onFilterChange', {
        productName: query.nameSearch,
        productBrand: query.brandChecked,
        chipset: query.chipsetChecked,
        socket: query.socketChecked,
        ramStandard: query.ramStandardChecked,
        form: query.formChecked,
        color: query.colorChecked,
        ramCap: query.ramCapChecked,
        ramSlot: query.ramSlotChecked,
      });
    }, 1000);
  });
  function handleFilterReset() {
    keyUpdate.value++;
    query.nameSearch = '';
    query.brandChecked = [];
    query.chipsetChecked = [];
    query.socketChecked = [];
    query.ramStandardChecked = [];
    query.formChecked = [];
    query.colorChecked = [];
    query.ramCapChecked = [];
    query.ramSlotChecked = [];
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
