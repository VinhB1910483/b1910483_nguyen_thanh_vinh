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
        <p>Loại: {{ productItem.trackingMethod }}</p>
      </div>
      <div class="product_info-gen" v-if="productItem.connectType">
        <p>Loại kết nối: {{ productItem.connectType }}</p>
      </div>
      <div class="product_info-iGpu">
        <p>DPI: {{ productItem.dpi }}</p>
      </div>
      <div class="product_info-socket">
        <p>Tay: {{ productItem.hand }}</p>
      </div>
      <div class="product_info-coreCount">
        <p>Màu: {{ productItem.color }}</p>
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
  import type { MouseModel } from '@/types/api/products/mouse';
  import { formatVND } from '@/util/formatNumber';
  import { defineProps } from 'vue';
  const props = defineProps<{
    productItem: MouseModel;
    productType: string;
  }>();
  const emit = defineEmits<{
    (e: 'onPurchase', product: MouseModel): void;
    (e: 'onAddToCart', product: MouseModel): void;
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
