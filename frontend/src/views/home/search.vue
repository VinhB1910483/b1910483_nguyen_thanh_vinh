<template>
  <div class="cover"></div>
  <div class="container">
    <Breadcrumb
      :breadcrumb-paths="breadcrumbPath"
      :last-path="'Kết quả tìm kiếm'"
    />
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import {
    computed,
    ref,
    reactive,
    watch,
    onBeforeUpdate,
    onMounted,
  } from 'vue';
  import type { Product, ProductQuery } from '@/types/api/products';
  import { useToast } from 'vue-toastification';
  import productService from '@/service/products/product.service';
  import ProductCardItem from '@/components/ProductCardItem.vue';
  import { Pagination } from 'vue3-carousel';
  import Breadcrumb from '@/components/Breadcrumb.vue';

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const currentPage = ref(1);
  const totalPage = ref(0);
  const searchString = ref(route.query.s || '');
  const breadcrumbPath = reactive([
    {
      title: 'Trang chủ',
      linkTo: '/',
    },
  ]);
  onBeforeUpdate(() => {
    searchString.value = route.query.s || '';
  });
  onMounted(() => {
    console.log('onBeforeUpdate');
  });
  const productData = ref<Product[]>([]);
  function handleViewProduct(id: string, type: string) {
    let path = `/product/${type.replace(' ', '-')}/${id}`;
    router.push({ path: path });
  }
  function handleAddToCart(id: String, name: string, type: string) {
    toast.success('Đã thêm ' + name);
  }
  function handleChangePage(newPage: number) {
    currentPage.value = newPage;
    getProduct({ page: newPage });
  }
  watch([searchString], () => {
    getProduct();
  });
  async function getProduct({ page = 1 } = {}) {
    try {
      let fetchProduct = null;
      let query = {
        productName: searchString.value,
        productType: searchString.value,
        productBrand: searchString.value,
      };
      fetchProduct = await productService.getProducts({
        pageSize: 20,
        page: page,
        query: query as ProductQuery,
      });
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
</style>
