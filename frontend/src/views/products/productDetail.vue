<template>
  <div class="container">
    <Breadcrumb
      :breadcrumb-paths="breadcrumbPath"
      :last-path="productData?.productName || _id"
    />
    <div v-if="productData" class="detail" :class="{ isLoading }">
      <div class="loading-icon">
        <font-awesome-icon icon="fa fa-spinner" />
      </div>
      <CpuOverview
        v-if="productData && productType == 'cpu'"
        :productItem="(productData as CpuModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <MainboardOverview
        v-else-if="productData && productType == 'mainboard'"
        :productItem="(productData as MainboardModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <RamOverview
        v-else-if="productData && productType == 'ram'"
        :productItem="(productData as RamModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <VideoCardOverview
        v-else-if="productData && productType == 'video-card'"
        :productItem="(productData as VideoCardModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <StorageDriveOverview
        v-else-if="productData && productType == 'storage-drive'"
        :productItem="(productData as StorageDriveModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <MonitorOverview
        v-else-if="productData && productType == 'monitor'"
        :productItem="(productData as MonitorModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
      <MouseOverview
        v-else-if="productData && productType == 'mouse'"
        :productItem="(productData as MouseModel)"
        :productType="productType"
        @onPurchase="handlePurchase"
        @onAddToCart="handleAddToCart"
      />
    </div>
    <div v-if="!isLoading && !productData" class="product_notfound">
      <span>Sản phẩm không tồn tại</span>
      <button @click="handleReturnButton">Trở về</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import {
    cpuService,
    mainboardService,
    ramService,
    videoCardService,
    stoageDriveService,
    monitorService,
    mouseService,
  } from '@/service/products/index';
  import { useCartStore } from '@/stores/CartStore';
  import type {
    CpuModel,
    MainboardModel,
    MonitorModel,
    MouseModel,
    ProductDetail,
    RamModel,
    StorageDriveModel,
    VideoCardModel,
  } from '@/types/api/products/';
  import { reactive, computed, ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import {
    CpuOverview,
    MainboardOverview,
    RamOverview,
    VideoCardOverview,
    StorageDriveOverview,
    MonitorOverview,
    MouseOverview,
  } from './components/Overview/';
  const productData = ref<ProductDetail>();
  const cartStore = useCartStore();
  const route = useRoute();
  const _id = computed(() => route.params._id as string);
  const productType = computed(() => route.params.productType as string);
  const isLoading = ref(true);
  const toast = useToast();
  const router = useRouter();
  const breadcrumbPath = reactive([
    {
      title: 'Trang chủ',
      linkTo: '/',
    },
    {
      title:
        productType.value.charAt(0).toUpperCase() +
        productType.value.replace('-', ' ').slice(1),
      linkTo: `/product/${productType.value.replace(' ', '-')}`,
    },
  ]);
  onMounted(async () => {
    isLoading.value = true;
    await getProduct();
    isLoading.value = false;
    console.log(productType.value);
  });

  watch(productData, (v) => {
    console.log(v);
    document.title = productData.value?.productName || _id.value;
  });
  watch([], () => {});
  function handleAddToCart(product: ProductDetail) {
    if (product) {
      toast.success('Đã thêm ' + product?.productName);
      cartStore.addToCart({
        id: product._id,
        name: product.productName,
        photo: product.productPhoto,
        price: product.price,
        quantity: 1,
        type: productType.value,
      });
    }
  }
  const handlePurchase = (product: ProductDetail) => {
    if (product) {
      toast.success('Đã thêm ' + product?.productName);
      cartStore.addToCart({
        id: product._id,
        name: product.productName,
        photo: product.productPhoto,
        price: product.price,
        quantity: 1,
        type: productType.value,
      });
    }
    router.push({ path: '/cart' });
  };
  function handleReturnButton() {
    router.back();
  }
  async function getProduct() {
    try {
      let getProduct = null;
      switch (productType.value) {
        case 'cpu': {
          getProduct = await cpuService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'mainboard': {
          getProduct = await mainboardService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'ram': {
          getProduct = await ramService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'video-card': {
          getProduct = await videoCardService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'storage-drive': {
          getProduct = await stoageDriveService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'monitor': {
          getProduct = await monitorService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        case 'mouse': {
          getProduct = await mouseService.getProduct({
            query: {
              _id: _id.value as string,
            },
          });
          break;
        }
        default:
          break;
      }
      if (getProduct) productData.value = getProduct.data[0];
    } catch (err) {
      console.log(err);
    }
  }
</script>
<style lang="scss">
  .loading-icon {
    display: none;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    z-index: 100;
    font-size: 20px;
    animation: spin 1s infinite linear;
  }
  .isLoading {
    position: relative;
    & > .loading-icon {
      display: block;
    }
    &::before {
      content: '';
      position: absolute;
      inset: 0 0 0 0;
      background-color: #000;
      opacity: 0.2;
      z-index: 99;
      cursor: wait;
    }
  }
  .divider--small {
    width: 40px;
    height: 3px;
    background-color: var(--orange);
  }
  .product_notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    height: 30vh;
    color: var(--orange);
    font-size: 1.5rem;
    font-weight: bold;
  }
  .product_overview {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    .product_info {
      color: #aaaaaa;
      flex: 1;
      animation: fadeToLeft 0.8s ease;
      .product_info-productName {
        font-size: 2rem;
        font-weight: bold;
        color: var(--orange);
      }
      .product_info-price {
        font-size: 1.5rem;
        color: var(--orange);
      }
      &-control {
        margin: 10px 0;
        button {
          margin-right: 10px;
          padding: 5px 10px;
        }
      }
    }
    .product_Img {
      width: 450px;
      animation: fadeToRight 0.8s ease;

      img {
        width: 100%;
        object-fit: contain;
      }
    }
    @keyframes fadeToLeft {
      0% {
        transform: translateX(50px);
        opacity: 0;
      }
    }
    @keyframes fadeToRight {
      0% {
        transform: translateX(-50px);
        opacity: 0;
      }
    }
  }
</style>
