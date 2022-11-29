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
        <p>Bộ xử lý: {{ productItem.processor }}</p>
      </div>
      <div class="product_info-gen">
        <p>Thế hệ: {{ productItem.gen }}</p>
      </div>
      <div class="product_info-iGpu">
        <p>Bộ xử lý đồ họa{{ productItem.iGpu }}</p>
      </div>
      <div class="product_info-socket">
        <p>Socket: {{ productItem.socket }}</p>
      </div>
      <div class="product_info-coreCount">
        <p>Nhân: {{ productItem.coreCount }}</p>
      </div>
      <div class="product_info-thread">
        <p v-if="productItem.thread">Luồng: {{ productItem.thread }}</p>
      </div>
      <div class="product_info-coreClock">
        <p>Tốc độ: {{ productItem.coreClock }}</p>
      </div>
      <div class="product_info-coreBoost">
        <p>Tốc độ tối đa: {{ productItem.coreBoost }}</p>
      </div>
      <div class="product_info-tdp">
        <p>Tiêu thụ: {{ productItem.tdp }}</p>
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
  import type { CpuModel } from '@/types/api/products/cpu';
  import { formatVND } from '@/util/formatNumber';
  import { defineProps } from 'vue';
  const props = defineProps<{
    productItem: CpuModel;
    productType: string;
  }>();
  const emit = defineEmits<{
    (e: 'onPurchase', product: CpuModel): void;
    (e: 'onAddToCart', product: CpuModel): void;
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
