<template>
  <section class="section-product">
    <div class="section-top">
      <div class="section-top__left">
        <h1 class="heading">
          <router-link
            :to="`product/${sectionTitle
              .toLocaleLowerCase()
              .replace(' ', '-')}`"
            >{{ sectionTitle }}</router-link
          >
        </h1>
        <div class="navigation">
          <button @click="handleNavigation('left')">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </button>
          <button @click="handleNavigation('right')">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
      <div class="section-top__right">
        <span v-for="item in sectionCategory">{{ item }}</span>
      </div>
    </div>

    <div class="section-main" :class="reverseCol ? 'reverse-col' : ''">
      <div class="left">
        <div class="product-list" ref="productListRef">
          <div
            class="product-list-row"
            v-for="(rowList, rowIndex) in sectionProductData"
            :key="rowIndex"
          >
            <div v-for="(item, index) in rowList" :key="index">
              <ProductCardItem
                class="product-cart"
                v-if="item"
                :item="item"
                :control-hover="true"
                @onViewProduct="handleViewProduct"
                @onPurchase="handlePurchase"
                @onAddToCart="handleAddToCart"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right" :class="banner ? '' : 'no-banner'">
        <img
          v-for="(imageUrl, index) in banner"
          :key="index"
          :src="imageUrl"
          :alt="imageUrl"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { getSSD } from '@/api/products/fetchData';
  import type {
    Product,
    ProductPageResult,
    ProductSection,
  } from '@/types/api/products/product';
  import { computed, onMounted, ref, watch } from '@vue/runtime-core';
  import type { ComponentPublicInstance } from 'vue';
  import { useToast } from 'vue-toastification';
  import ProductCardItem from '@/components/ProductCardItem.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const props = withDefaults(
    defineProps<{
      list: ProductPageResult;
      sectionTitle?: string;
      sectionCategory?: Array<string>;
      reverseCol?: boolean;
      banner?: Array<string>;
      row?: 1 | 2;
    }>(),
    // default value:
    {
      sectionTitle: 'Section Title',
      reverseCol: false,
      row: 2,
    }
  );

  const ssd = ref<ProductPageResult>();
  const productListRef = ref<ComponentPublicInstance<HTMLDivElement>>();
  const toast = useToast();

  const lengthIndexSrcoll = ref(0);
  const lengthProductRow = ref(0);
  let isDown = false;
  let isDrag = false;
  let startX: number;
  let scrollLeft: number;
  let walk: number;
  let scroll: number;
  let scrollIndex = 0;

  onMounted(() => {
    // ssd.value = getSSD();
    // setTimeout(() => (ssd.value = getSSD()), 10);
    // console.log(ssd);
  });

  const sectionProductData = computed(() => {
    let productList = props.list?.data;
    if (productList) {
      let newList: ProductSection = [[], []];
      lengthProductRow.value = productList.length / props.row;

      let x = 0;
      for (let index = 0; index < productList.length; index++) {
        newList[x]?.push(productList[index]);
        x = x == 0 ? props.row - 1 : 0;
      }

      console.log(newList);
      return newList;
    }
    return [];
  });

  function handleViewProduct(id: String, type: string) {
    if (isDrag) return;
    let path = `/product/${type.replace(' ', '-')}/${id}`;
    router.push({ path: path });
  }

  function handlePurchase(id: String, type: string) {
    if (isDrag) return;
    toast('Purchase ' + type + ', ' + id);
  }

  function handleAddToCart(id: String, name: string, type: string) {
    if (isDrag) return;
    toast.success('Đã thêm ' + name);
  }

  watch(productListRef, (productListRef) => {
    if (productListRef) {
      productListRef.addEventListener(
        'mousedown',
        (e) => {
          isDown = true;
          productListRef.classList.add('active');
          startX = e.pageX - (productListRef.offsetLeft || 0);
          scrollLeft = productListRef.scrollLeft || 0;
          scroll = 0;
        },
        { passive: false }
      );

      productListRef.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        productListRef.classList.remove('active');
        calcSrcollIndex();
        moveSrcoll(productListRef);
      });

      productListRef.addEventListener('mouseup', () => {
        isDown = false;
        productListRef.classList.remove('active');
        calcSrcollIndex();
        moveSrcoll(productListRef);
      });

      productListRef.addEventListener('mousemove', (e) => {
        isDrag = false;
        if (!isDown) return;
        e.preventDefault();
        isDrag = true;
        const x = e.pageX - (productListRef.offsetLeft || 0);
        walk = (x - startX) * 1; //scroll-fast
        scroll = scrollLeft - walk;
        productListRef.scrollLeft = scroll;
      });
    }
  });

  function handleNavigation(action: 'left' | 'right') {
    if (productListRef?.value) {
      scrollLeft = productListRef.value.scrollLeft || 0;
      scrollIndex += action === 'left' ? -1 : 1;
      moveSrcoll(productListRef?.value);
    }
  }

  function calcSrcollIndex() {
    if (!scroll) return;
    if (scrollIndex > scroll / 240 + 0.2) {
      scrollIndex = (scroll / 240) >> 0;
    } else {
      scrollIndex =
        scroll / 240 - ((scroll / 240) >> 0) > 0.3
          ? ((scroll / 240) >> 0) + 1
          : (scroll / 240) >> 0;
    }
  }

  function moveSrcoll(element: HTMLDivElement) {
    lengthIndexSrcoll.value =
      lengthProductRow.value - element.offsetWidth / 240;
    scrollIndex =
      scrollIndex < 0
        ? 0
        : scrollIndex > lengthIndexSrcoll.value
        ? (lengthIndexSrcoll.value >> 0) + 1
        : scrollIndex;
    element.style.scrollBehavior = 'smooth';
    element.scrollLeft = 240 * scrollIndex;
    element.style.scrollBehavior = 'unset';
  }
</script>

<style lang="scss" scoped>
  .section-product {
    background: #fff;
    border-radius: 5px;
    .section-top {
      display: flex;
      justify-content: space-between;
      border-bottom: 5px solid var(--color-primary);

      &__left {
        display: flex;
        align-items: center;

        .heading {
          font-size: 24px;
          font-weight: 700;

          padding: 0 10px;
          border-radius: 5px 5px 0 0;
          background-color: var(--color-primary);
          a {
            color: white;
          }
        }

        .navigation {
          margin-left: 12px;
          height: 100%;

          button {
            background-color: transparent;
            height: 100%;
            font-size: 1.2rem;
            color: var(--color-primary);

            &:hover {
              background-color: var(--color-border-hover);
            }
          }
        }
      }

      &__right {
        & > * {
          margin-left: 5px;
        }
      }
    }

    .reverse-col {
      flex-direction: row-reverse;
    }

    .section-main {
      display: flex;
      margin: 10px 0;

      .left {
        overflow: hidden;

        .product-list {
          overflow: hidden;

          & > * {
            margin-right: 12px;
          }

          .product-cart {
            margin: 15px 0;
          }

          .product-list-row {
            display: flex;
            margin-bottom: 10px;

            & > * {
              margin: 0 5px;

              & > .card {
                width: 220px;
                height: 100%;
                margin: 0;
              }
            }
          }
        }
      }

      .right {
        min-width: 260px;
        width: 280px;
        margin: 0 10px;

        img {
          width: 100%;
        }

        &.no-banner {
          display: none;
        }
      }
    }
  }
</style>
