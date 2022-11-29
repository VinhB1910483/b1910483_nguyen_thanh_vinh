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
        <p>Kích Cở: {{ productItem.screenSize }}"</p>
      </div>
      <div class="product_info-gen">
        <p>Phân giải: {{ productItem.resolution }}</p>
      </div>
      <div class="product_info-iGpu">
        <p>Tần số quét: {{ productItem.refreshRate }}</p>
      </div>
      <div class="product_info-socket">
        <p>Phản hồi: {{ productItem.responseTime }}</p>
      </div>
      <div class="product_info-coreCount">
        <p>Tấm nền: {{ productItem.panelType }}</p>
      </div>
      <div class="product_info-thread">
        <p>Tỉ lệ: {{ productItem.ratio }}</p>
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
  import type { MonitorModel } from '@/types/api/products/monitor';
  import { formatVND } from '@/util/formatNumber';
  import { defineProps } from 'vue';
  const props = defineProps<{
    productItem: MonitorModel;
    productType: string;
  }>();
  const emit = defineEmits<{
    (e: 'onPurchase', product: MonitorModel): void;
    (e: 'onAddToCart', product: MonitorModel): void;
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
