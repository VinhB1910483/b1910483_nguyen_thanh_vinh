<template>
  <div class="flex-grid">
    <ProductCardItem
      class="col"
      v-for="item in list"
      :item="item"
      :control-hover="true"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '@/types/api/products/product';
  import { onMounted } from '@vue/runtime-core';
  import ProductCardItem from './ProductCardItem.vue';

  const props = defineProps<{ list: Product[] }>();
  onMounted(() => {
    console.log(props.list);
  });
</script>

<style lang="scss" scoped>
  .flex-grid {
    max-width: 740px;
    display: flex;
    flex-wrap: wrap;

    & > .col {
      width: calc(20% - 20px);
    }
  }
  @media (max-width: 1175px) {
    .flex-grid > .col {
      width: calc(25% - 20px);
    }
  }
  @media (max-width: 955px) {
    .flex-grid > .col {
      width: calc(33.3% - 20px);
    }
  }
  @media (max-width: 740px) {
    .flex-grid > .col {
      width: calc(50% - 20px);
    }
  }
  @media (max-width: 515px) {
    .flex-grid > .col {
      width: calc(100% - 20px);
    }
  }
</style>
