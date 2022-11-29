<template>
  <div
    class="cover"
    @click="handleShowCover"
    :class="isCover ? 'active' : ''"
  ></div>
  <div class="container">
    <Breadcrumb :breadcrumb-paths="breadcrumbPath" :last-path="productTitle" />
    <div class="filter_btn">
      <button class="outline" @click="handleShowFilter">
        <font-awesome-icon icon="fa-solid fa-list" /> Bộ lọc
      </button>
    </div>
    <div class="main">
      <div class="product_list">
        <div v-if="productData?.length" class="product_items">
          <ProductCardItem
            v-for="(product, index) in productData"
            :key="index"
            class="product_item"
            :item="(product as Product)"
            :control-hover="false"
            @onViewProduct="handleViewProduct"
            @onAddToCart="handleAddToCart"
          />
        </div>
        <div v-else>Không có sản phẩm</div>
        <div class="product_pagination">
          <Pagination
            @onChangePage="handleChangePage"
            :currentPage="currentPage"
            :totalPage="totalPage"
          />
        </div>
      </div>
      <div class="product_filter">
        <CpuFilter
          v-if="productType === 'cpu'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <MainboardFilter
          v-else-if="productType === 'mainboard'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <MonitorFilter
          v-else-if="productType === 'monitor'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <MouseFilter
          v-else-if="productType === 'mouse'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <RamFilter
          v-else-if="productType === 'ram'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <StorageDriveFilter
          v-else-if="productType === 'storage-drive'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
        <VideoCardFilter
          v-else-if="productType === 'video-card'"
          :class="isFilterShow ? 'active' : 'hide'"
          @onFilterChange="handleFilterChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import ProductCardItem from '@/components/ProductCardItem.vue';
  import RangeInput from '@/components/RangeInput.vue';
  import {
    CpuFilter,
    MainboardFilter,
    MonitorFilter,
    MouseFilter,
    RamFilter,
    StorageDriveFilter,
    VideoCardFilter,
  } from './components/Filter/';
  import { computed } from '@vue/reactivity';
  import { reactive, ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    cpuService,
    mainboardService,
    monitorService,
    mouseService,
    ramService,
    stoageDriveService,
    videoCardService,
  } from '@/service/products';
  import type {
    CpuQuery,
    MainboardQuery,
    MonitorQuery,
    MouseQuery,
    Product,
    ProductDetail,
    ProductFilterQuery,
    RamQuery,
    StorageDriveQuery,
    VideoCardQuery,
  } from '@/types/api/products';
  import Pagination from '@/components/Pagination.vue';
  import { useToast } from 'vue-toastification';
  const route = useRoute();
  const toast = useToast();
  const router = useRouter();
  const productType = computed(() => route.params.productType as string);
  const productTitle = computed(
    () =>
      productType.value?.charAt(0).toUpperCase() +
        productType.value?.replace('-', ' ').slice(1) || ''
  );
  const breadcrumbPath = reactive([
    {
      title: 'Trang chủ',
      linkTo: '/',
    },
  ]);
  const priceRangeValue = reactive({
    min: 100000,
    max: 10000000,
  });
  const isFilterShow = ref(false);
  const isCover = ref(false);
  const productQuery = ref<ProductFilterQuery>();
  const productData = ref<ProductDetail[]>([]);
  const currentPage = ref(1);
  const totalPage = ref(0);
  onMounted(() => {
    document.title = 'Sản phẩm - ' + productTitle.value;
    getProduct();
  });

  watch([productTitle], () => {
    document.title = 'Sản phẩm - ' + productTitle.value;
  });
  watch([productType], () => {
    productQuery.value = {};
    getProduct();
  });
  function handdleRangeInputChange(min: number, max: number) {
    priceRangeValue.max = max;
    priceRangeValue.min = min;
    console.log(priceRangeValue);
  }
  function handleFilterChange(query?: CpuQuery) {
    productQuery.value = query;
    currentPage.value = 1;
    getProduct();
  }
  function handleShowCover() {
    isCover.value = !isCover.value;
    isFilterShow.value = false;
  }
  function handleShowFilter() {
    handleShowCover();
    isFilterShow.value = !isFilterShow.value;
  }
  function handleChangePage(newPage: number) {
    currentPage.value = newPage;
    getProduct({ page: newPage });
  }
  function handleViewProduct(id: string, type: string) {
    let path = `/product/${type.replace(' ', '-')}/${id}`;
    router.push({ path: path });
  }
  function handleAddToCart(id: String, name: string, type: string) {
    toast.success('Đã thêm ' + name);
  }
  async function getProduct({ page = 1 } = {}) {
    try {
      let fetchProduct = null;
      let query = productQuery.value;
      switch (productType.value) {
        case 'cpu': {
          fetchProduct = await cpuService.getProduct({
            pageSize: 20,
            page: page,
            query: query as CpuQuery,
          });
          break;
        }
        case 'mainboard': {
          fetchProduct = await mainboardService.getProduct({
            pageSize: 20,
            page: page,
            query: query as MainboardQuery,
          });
          break;
        }
        case 'ram': {
          fetchProduct = await ramService.getProduct({
            pageSize: 20,
            page: page,
            query: query as RamQuery,
          });
          break;
        }
        case 'video-card': {
          fetchProduct = await videoCardService.getProduct({
            pageSize: 20,
            page: page,
            query: query as VideoCardQuery,
          });
          break;
        }
        case 'storage-drive': {
          fetchProduct = await stoageDriveService.getProduct({
            pageSize: 20,
            page: page,
            query: query as StorageDriveQuery,
          });
          break;
        }
        case 'monitor': {
          fetchProduct = await monitorService.getProduct({
            pageSize: 20,
            page: page,
            query: query as MonitorQuery,
          });
          break;
        }
        case 'mouse': {
          fetchProduct = await mouseService.getProduct({
            pageSize: 20,
            page: page,
            query: query as MouseQuery,
          });
          break;
        }
        default:
          break;
      }
      if (fetchProduct) {
        productData.value = fetchProduct.data;
        totalPage.value = fetchProduct.meta.totalPage;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>
<style lang="scss">
  .container {
    min-width: 450px;
  }
  .cover {
    display: none;
    position: absolute;
    inset: 0;
    background-color: #000;
    z-index: 50;
    opacity: 0.4;

    &.active {
      display: block;
    }
  }
  .filter_btn {
    display: none;
    justify-content: center;

    button {
      padding: 10px 20px;
    }
  }
  .main {
    display: flex;
    position: relative;

    .product_list {
      flex: 5;

      .product_items {
        display: flex;
        flex-wrap: wrap;

        .product_item {
          min-width: 180px;
          width: calc(25% - 20px);
        }
      }

      .product_pagination {
        display: flex;
        justify-content: center;
        margin: 10px;
      }
    }

    .product_filter {
      min-width: 220px;
      // height: 200px;
      flex: 1;
    }
  }

  @media (max-width: 1090px) {
    .main .product_list .product_items .product_item {
      min-width: 180px;
      width: calc(33% - 20px);
    }
  }
  @media (max-width: 950px) {
    .filter_btn {
      display: flex;
    }
    .main .product_list .product_items .product_item {
      min-width: 180px;
      width: calc(33% - 20px);
    }
    .product_filter {
      max-width: 300px;
      position: absolute;
      right: 0;
      z-index: 60;

      .active {
        display: block;
        animation: fadeInLeft 1s forwards;
      }

      .hide {
        display: none;
        animation: fadeOutLeft 1s forwards;
      }
    }
  }
  @media (max-width: 710px) {
    .main .product_list .product_items .product_item {
      min-width: 180px;
      width: calc(50% - 20px);
    }
  }

  @media (max-width: 490px) {
    .main .product_list .product_items .product_item {
      min-width: 350px;
      width: calc(100% - 20px);
    }
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(75%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeOutLeft {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(75%, 0, 0);
    }
  }
</style>
