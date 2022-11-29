<template>
  <div class="product_overview" v-if="productItem">
    <div class="product_info">
      <div class="product_info-productName">
        <p>{{ productItem.productName }}</p>
      </div>
      <div class="divider--small"></div>
      <div class="product_info-price">
        <p>{{ formatVND(productItem.price * 1000) }}</p>
      </div>
      <div class="product_info-productBrand">
        <p>Hãng: {{ productItem.productBrand }}</p>
      </div>
      <div class="product_info-processor">
        <p>Loại: {{ productItem.type }}</p>
      </div>
      <div class="product_info-gen">
        <p>Giá/Gb: {{ formatVND(productItem.pricePerGb) }}</p>
      </div>
      <div class="product_info-iGpu">
        <p>Dung lượng: {{ productItem.capacity }}</p>
      </div>
      <div class="product_info-socket">
        <p>Cache: {{ productItem.cache }}</p>
      </div>
      <div class="product_info-coreCount">
        <p>Mẫu: {{ productItem.form }}</p>
      </div>
      <div class="product_info-thread">
        <p>Giao tiếp: {{ productItem.interface }}</p>
      </div>
      <div class="product_info-coreClock" v-if="productItem.maxRead">
        <p>Đọc: {{ productItem.maxRead }}</p>
      </div>
      <div class="product_info-coreBoost" v-if="productItem.maxWrite">
        <p>Ghi: {{ productItem.maxWrite }}</p>
      </div>

      <div class="product_info-control" v-if="productItem">
        <button @click="(e) => handleAddToCart(e)">
          <font-awesome-icon icon="fa-solid fa-cart-arrow-down" /> Thêm vào giỏ
        </button>
        <button @click="(e) => handlePurchase(e)">Mua Ngay</button>
      </div>
    </div>
    <div class="product_Img">
      <img :src="productItem.productPhoto" alt="" srcset="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { StorageDriveModel } from '@/types/api/products/storagedrive';
  import { formatVND } from '@/util/formatNumber';
  import { defineProps } from 'vue';
  const props = defineProps<{
    productItem: StorageDriveModel;
    productType: string;
  }>();
  const emit = defineEmits<{
    (e: 'onPurchase', product: StorageDriveModel): void;
    (e: 'onAddToCart', product: StorageDriveModel): void;
  }>();

  function handleAddToCart(e: Event) {
    e.stopPropagation();
    emit('onAddToCart', props.productItem);
  }
  function handlePurchase(e: Event) {
    e.stopPropagation();
    emit('onPurchase', props.productItem);
  }
</script>

<style lang=""></style>
