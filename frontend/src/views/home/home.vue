<template>
  <div class="home">
    <div class="container">
      <div class="banner">
        <carousel :autoplay="6000" :wrap-around="true">
          <slide v-for="imgUrl in slidesImg" :key="imgUrl">
            <div class="carousel__item">
              <img :src="`${imgUrl}`" :alt="imgUrl.slice(0, -4)" />
            </div>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>

      <div>
        <!-- <ProductSection
        v-if="cpuData" :list="cpuData" 
          sectionTitle="Dành cho bạn"
          :sectionCategory="['asd', 'asdsad']"
        /> -->
        <div v-if="cpuData">
          <ProductSection
            section-title="CPU"
            :banner="banner.cpu"
            :list="cpuData"
            :reverse-col="true"
          />
        </div>
        <div v-if="mainboardData">
          <ProductSection
            section-title="Mainboard"
            :banner="banner.mainboard"
            :list="mainboardData"
          />
        </div>
        <div v-if="ramData">
          <ProductSection
            section-title="Ram"
            :banner="banner.ram"
            :list="ramData"
            :reverse-col="true"
          />
        </div>
        <div v-if="monitorData">
          <ProductSection
            section-title="Monitor"
            :banner="banner.monitor"
            :list="monitorData"
          />
        </div>
        <div v-if="mouseData">
          <ProductSection
            section-title="Mouse"
            :banner="banner.mouse"
            :list="mouseData"
            :reverse-col="true"
          />
        </div>
        <div v-if="storagedriveData">
          <ProductSection
            section-title="Storage Drive"
            :banner="banner.storagedrive"
            :list="storagedriveData"
          />
        </div>
        <div v-if="videocardData">
          <ProductSection
            section-title="Video Card"
            :banner="banner.videocard"
            :list="videocardData"
            :reverse-col="true"
          />
        </div>
        <!-- <ProductSection :reverse-col="true" :banner="false" :row="2" /> -->
      </div>

      <div>
        <h1>Last View Section</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Carousel, Pagination, Slide } from 'vue3-carousel';
  import productService from '@/service/products/product.service';
  import type { ProductPageResult } from '@/types/api/products/product';
  import { onMounted, ref } from '@vue/runtime-core';
  import CardList from '../../components/ProductCardList.vue';
  import ProductSection from './components/ProductSection.vue';
  const cpuData = ref<ProductPageResult>();
  const mainboardData = ref<ProductPageResult>();
  const ramData = ref<ProductPageResult>();
  const monitorData = ref<ProductPageResult>();
  const mouseData = ref<ProductPageResult>();
  const storagedriveData = ref<ProductPageResult>();
  const videocardData = ref<ProductPageResult>();
  const banner = {
    storagedrive: [
      '/public/image/product/banner/storagedrive-banner-1.png',
      '/public/image/product/banner/storagedrive-banner-2.png',
    ],
    ram: [
      '/public/image/product/banner/ram-banner-1.png',
      '/public/image/product/banner/ram-banner-2.png',
    ],
    cpu: [
      '/public/image/product/banner/cpu-banner-1.png',
      '/public/image/product/banner/cpu-banner-2.png',
    ],
    mainboard: [
      '/public/image/product/banner/mainboard-banner-1.png',
      '/public/image/product/banner/mainboard-banner-2.png',
    ],
    videocard: [
      '/public/image/product/banner/videocard-banner-1.png',
      '/public/image/product/banner/videocard-banner-2.png',
    ],
    mouse: [
      '/public/image/product/banner/mouse-banner-1.png',
      '/public/image/product/banner/mouse-banner-2.png',
    ],
    monitor: [
      '/public/image/product/banner/monitor-banner-1.png',
      '/public/image/product/banner/monitor-banner-2.png',
    ],
  };
  const slidesImg = [
    'public/image/slices/slide-1.png',
    'public/image/slices/slide-3.png',
    'public/image/slices/slide-4.png',
    'public/image/slices/slide-5.png',
    'public/image/slices/slide-6.png',
  ];
  onMounted(async () => {
    document.title = 'Trang  chủ';
    cpuData.value = await productService.getProducts({
      query: { productType: 'cpu' },
    });
    mainboardData.value = await productService.getProducts({
      query: { productType: 'mainboard' },
    });
    ramData.value = await productService.getProducts({
      query: { productType: 'ram' },
    });
    monitorData.value = await productService.getProducts({
      query: { productType: 'monitor' },
    });
    mouseData.value = await productService.getProducts({
      query: { productType: 'mouse' },
    });
    storagedriveData.value = await productService.getProducts({
      query: { productType: 'storage drive' },
    });
    videocardData.value = await productService.getProducts({
      query: { productType: 'video card' },
    });
  });
</script>

<style lang="scss" scoped>
  .banner {
    img {
      width: 100%;
      // height: 430px;
      margin: 15px 0;
      object-fit: cover;
      background: white;
      border-radius: 8px;
    }

    .carousel__item {
      min-height: 200px;
      width: 100%;
      color: var(--vc-clr-white);
      font-size: 20px;
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
    }

    .carousel__pagination {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .home {
      display: flex;
      align-items: center;
    }
  }
</style>
