<template>
  <div class="header">
    <div class="header-top">
      <div class="container">
        <div class="left">
          <div
            class="on_top"
            :class="{ show: scrollY > 300 }"
            @click="handleGoTop"
          >
            <font-awesome-icon icon="fa-solid fa-caret-up" />
          </div>
          <!-- <span>top header</span> -->
        </div>
        <div class="right">
          <ThemeButton />
        </div>
      </div>
    </div>
    <div class="header-main">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <img alt="brand logo" src="@/assets/image/brand-logo.png" />
          </router-link>
        </div>

        <form class="sreach-bar" @submit="(e) => e.preventDefault()">
          <input
            type="text"
            name="headerSreach"
            id="headerSreach"
            placeholder="tên, hãng, loại ..."
            v-model="searchString"
            ref="searchBarRef"
          />
          <button @click="handleSearch">Tìm</button>
        </form>

        <div class="right">
          <div class="cart_btn" :class="{ sticky: scrollY > 300 }">
            <div class="cart_dropdown_btn">
              <span class="cart_count" v-if="count" :key="count">{{
                count
              }}</span>
              <router-link to="/cart">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                <span class="title"> Giỏ hàng</span>
              </router-link>

              <div class="cart_dropdown">
                <div class="content" v-if="cartItems.length">
                  <div class="dropdown_cardList">
                    <div
                      class="card"
                      v-for="(cartItem, index) in cartItems"
                      :key="index"
                    >
                      <div
                        class="remove"
                        @click="() => cartStore.removeFromCart(cartItem._id)"
                      >
                        <font-awesome-icon icon="fa-regular fa-circle-xmark" />
                      </div>
                      <div class="photo">
                        <router-link
                          :to="`/product/${cartItem.productType.replace(
                            ' ',
                            '-'
                          )}/${cartItem._id}`"
                        >
                          <img
                            :src="cartItem.productPhoto"
                            :alt="cartItem.productPhoto"
                        /></router-link>
                        <!-- <img
                        :src="cartItem.productPhoto"
                        :alt="cartItem.productPhoto"
                      /> -->
                      </div>
                      <div class="content">
                        <span class="name">{{ cartItem.productName }}</span>
                        <span class="price">{{
                          `${cartItem.quantity} x ${formatVND(
                            cartItem.price * 1000
                          )}`
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown_footer">
                    <div class="total">
                      Tổng:
                      <span class="price">
                        {{ `${formatVND(payAmount * 1000)}` }}</span
                      >
                    </div>
                    <div class="cartview">
                      <router-link to="/cart" tag="button"
                        ><button>Xem giỏ hàng</button></router-link
                      >
                      <router-link to="/cart/checkout" tag="button"
                        ><button>Đặt hàng</button></router-link
                      >
                    </div>
                  </div>
                </div>
                <div class="content empty" v-else>
                  Chưa có sản phẩm trong giỏ hàng.
                </div>
              </div>
            </div>
          </div>

          <router-link to="/auth/signin" v-if="!user">
            <button>
              <font-awesome-icon :icon="['fa-regular', 'fa-user']" />
              Đăng Nhập
            </button>
          </router-link>

          <DropdownMenuButton
            v-else
            text-right
            menu-alignment="end"
            :dropdown-list="accountMenu"
          >
            <Avatar
              :initial="user && user.username?.slice(0, 1).toUpperCase()"
            />
            <span>&nbsp;{{ user && user.username }}</span>
          </DropdownMenuButton>
        </div>
      </div>
    </div>

    <div class="header-nav">
      <!-- prettier-ignore -->
      <div class="container">
        <div class="nav_items">
          <div class="nav_item" @click="router.push({path:'/product/cpu'})">
            <img class="nav_icon" src="/public/icon/cpu.svg" alt="cpu.svg " />
            <span class="nav_title">CPU</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/mainboard'})">
            <img class="nav_icon" src="/public/icon/mainboard.svg" alt="mainboard.svg " />
            <span class="nav_title">Mainboard</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/monitor'})">
            <img class="nav_icon" src="/public/icon/monitor.svg" alt="monitor.svg " />
            <span class="nav_title">Màn hình</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/mouse'})">
            <img class="nav_icon" src="/public/icon/mouse.svg" alt="mouse.svg " />
            <span class="nav_title">Chuột</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/ram'})">
            <img class="nav_icon" src="/public/icon/ram.svg" alt="ram.svg " />
            <span class="nav_title">Bộ nhớ</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/storage-drive'})">
            <img class="nav_icon" src="/public/icon/ssd.svg" alt="ssd.svg " />
            <span class="nav_title">Lưu trữ</span>
          </div>
          <div class="nav_item" @click="router.push({path:'/product/video-card'})">
            <img class="nav_icon" src="/public/icon/videocard.svg" alt="videocard.svg" />
            <span class="nav_title">Card màn hình</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth/AuthStore';
  import type { DropdownItem } from '@/types/component/props';
  import { ref } from '@vue/reactivity';
  import {
    onMounted,
    onUnmounted,
    watch,
    onBeforeUnmount,
  } from '@vue/runtime-core';
  import { storeToRefs } from 'pinia';
  import DropdownMenuButton from './DropdownMenuButton.vue';
  import Avatar from './Avatar.vue';
  import ThemeButton from './ThemeButton.vue';
  import { useRouter } from 'vue-router';
  import { useCartStore } from '@/stores/CartStore';
  import { formatVND } from '@/util/formatNumber';
  import type { ComponentPublicInstance } from 'vue';
  const router = useRouter();
  const authStore = useAuthStore();
  const userMenu = [{ title: 'Đăng Xuất', onClick: authStore.logout }];
  const searchString = ref('');
  const searchBarRef = ref<ComponentPublicInstance<HTMLInputElement>>();
  const accountMenu = ref(<DropdownItem[]>userMenu);
  const { user } = storeToRefs(authStore);

  const cartStore = useCartStore();
  const { cartItems, payAmount, count } = storeToRefs(cartStore);
  const cartUpdateCount = ref(0);
  const scrollY = ref(window.pageYOffset);
  watch(user, () => {
    checkUser();
  });
  watch(cartItems, () => {
    cartUpdateCount.value++;
  });
  onMounted(() => {
    checkUser();
    window.addEventListener('scroll', handleOnScroll, true);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleOnScroll, true);
  }),
    onUnmounted(() => {});

  function checkUser() {}
  function handleGoTop() {
    window.scrollTo(0, 0);
  }
  function handleOnScroll() {
    scrollY.value = window.pageYOffset;
  }
  function handleSearch() {
    if (searchBarRef.value) {
      searchBarRef.value?.blur();
      router.push({ path: '/search', query: { s: searchBarRef.value.value } });
    }
  }
</script>

<style lang="scss">
  .header {
    white-space: nowrap;
    --color-text: var(--text-dark-1);
    width: 100%;
    background-color: var(--color-primary);
    .on_top {
      position: fixed;
      z-index: -9999;
      opacity: 0;
      cursor: pointer;
      bottom: 0;
      left: 0;
      margin: 20px 21px 20px;
      padding: 5px 12px;
      font-size: 2rem;
      color: var(--orange);
      border: 1px solid var(--orange);
      border-radius: 50%;
      transition: all 0.4s ease;
      &.show {
        z-index: 9999;
        opacity: 1;
      }
      &:hover {
        background-color: var(--orange);
        color: #fff;
      }
      &:active {
        color: var(--orange);
        background-color: transparent;
      }
    }
    a {
      color: inherit;
      transition: none;
    }
    &-top {
      color: var(--color-text);
      height: 25px;
      border-bottom: 1px solid;
      border-color: rgba(255, 255, 255, 0.4);
      line-height: 36px;
      background: #16a03d;

      .container {
        display: flex;
        height: 100%;
        justify-content: space-between;
      }

      .right {
        display: flex;
        align-items: center;
      }
    }
    &-main {
      height: 94px;

      .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
          width: 300px;
          height: 90px;
        }
        .sreach-bar {
          flex-grow: 1;
          min-width: 230px;
          border-radius: 5px;
          overflow: hidden;
          input {
            width: 100%;
            height: 40px;
            border: none;
            padding: 0 68px 0 8px;
            font-size: 1rem;
            &::placeholder {
              font-weight: bold;

              font-size: 0.8rem;
              opacity: 0.5;
            }
          }
          button {
            position: absolute;
            top: 8%;
            right: 4px;
            height: 84%;
            width: 60px;
          }
        }
        .right {
          position: relative;
          color: var(--color-text);
          display: flex;
          justify-content: end;
          width: 350px;
          margin: 15px 8px 0;
          font-size: 20px;
          font-weight: 700;

          & > * {
            margin-left: 15px;
            display: flex;
          }
          button {
            padding: 4px 8px;
            color: var(--light);
            border-radius: 5px;
            background-color: transparent;
            font-size: inherit;
            &:hover {
              color: var(--orange-mute) !important;
            }
            span {
              margin-left: 5px;
            }
          }

          .cart_btn {
            position: relative;

            &.sticky {
              position: fixed;
              bottom: 0;
              left: 0;
              margin: 20px 30px 100px;
              color: var(--orange);
              z-index: 99999;
              transition: all 0.4s ease;

              .title {
                display: none;
              }
              .cart_dropdown_btn {
                position: relative;
                font-size: 1.5rem;
              }
              .cart_dropdown {
                display: none;
                opacity: 0;
                position: absolute;
                z-index: -9999;
                left: 100%;
                transition: all 0.4s ease;
                top: 0;
                transform: translate(0%, -100%);
              }
            }
            .cart_count {
              position: absolute;
              top: -5px;
              right: -10px;
              z-index: 99;
              color: #fff;
              background-color: red;
              padding: 0px 5px;
              border-radius: 50%;
              font-size: 10px;

              animation: hightlight 0.4s ease;
            }
            @keyframes hightlight {
              50% {
                transform: scale(1.2);
              }
            }
            &:hover .cart_dropdown {
              display: block;
              opacity: 1;
              transition: all 0.4s ease;
              z-index: 9999;
            }
            .cart_dropdown {
              cursor: unset;
              // display: none;
              opacity: 0;
              transition: all 0.4s ease;
              color: var(--text-light-2);
              position: absolute;
              left: 50%;
              top: 30px;
              padding: 10px;
              z-index: -9999;
              transform: translateX(-50%);
              background-color: #fff;
              box-shadow: 5px 5px 25px #829c90;
              border-radius: 5px;
              width: 450px;
              transition: all 0.4s ease;
              .empty {
                font-size: 1rem;
              }

              .content {
                display: flex;
                flex-direction: column;
                padding: 0 5px;
                flex: 1;
                // width: 350px;

                .dropdown_cardList {
                  max-height: 280px;
                  overflow-y: scroll;
                  border: 1px solid #ccc;
                  .card {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-bottom: 1px;
                    padding: 5px 0;
                    border-color: #ccc;
                    border-style: solid;

                    .remove {
                      margin: 0 5px;
                      font-size: 1rem;
                      &:hover {
                        cursor: pointer;
                        color: red;
                      }
                    }
                    .photo {
                      border: 1px solid #ccc;
                      padding: 0 5px;
                      border-radius: 5px;
                      img {
                        width: 45px;
                        height: 45px;
                        object-fit: contain;
                      }
                    }

                    .name {
                      font-size: 1rem;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    .price {
                      font-size: 0.9rem;
                      color: var(--orange);
                    }
                  }
                }

                .dropdown_footer {
                  .total {
                    display: flex;
                    justify-content: center;
                    border-bottom: 1px solid #ccc;
                    .price {
                      color: var(--orange);
                      padding: 0 10px;
                    }
                  }
                  .cartview {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0 5px;
                    button {
                      border: 2px solid transparent;
                      color: #fff;
                      background-color: var(--orange);
                      margin: 0 10px;
                      &:hover {
                        color: var(--orange) !important;
                        background-color: transparent;
                        border: 2px solid var(--orange);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    &-nav {
      .nav_items {
        display: flex;

        .nav_item {
          cursor: pointer;
          color: #eee;
          display: flex;
          padding-bottom: 10px;
          user-select: none;
          .nav_icon {
            width: 20px;
          }
          .nav_title {
            padding: 0 10px;
            font-weight: bold;
          }
          &:hover .nav_title {
            color: var(--orange);
            transition: all 0.25s ease;
          }
          &:hover .nav_icon {
            transform: scale(1.2);
            transition: all 0.25s ease;
          }
        }
      }
    }
  }
</style>
