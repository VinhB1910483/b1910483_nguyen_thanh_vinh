<template>
  <tr class="cart-item">
    <td class="product-remove" @click="handleRemove">
      <font-awesome-icon icon="fa-regular fa-circle-xmark" />
    </td>
    <td class="product-thumbnail">
      <router-link :to="pathProductDetail">
        <img
          :src="cartItem.productPhoto"
          :alt="cartItem.productPhoto" /></router-link
      >>
    </td>
    <td class="product-name" data-title="Sản phẩm">
      <a href="#!">{{ cartItem.productName }}</a>
    </td>
    <td class="product-price" data-title="Giá">
      <span class="price-amount"
        ><bdi>{{ formatVND(cartItem.price * 1000) }}</bdi></span
      >
    </td>
    <td class="product-quantity" data-title="Số lượng">
      <div class="quantity-amount">
        <input
          type="button"
          @click="handleMinusButton"
          value="-"
          class="minus button"
        />
        <input
          :id="cartItem._id"
          class="qty"
          step="1"
          min="0"
          :max="maxAmount"
          v-model="amountRef"
          @change="handleChangeAmount"
          placeholder=""
        />
        <input
          type="button"
          @click="handlePlusButton"
          value="+"
          class="plus button"
        />
      </div>
    </td>
    <td class="product-subtotal" data-title="Tạm tính">
      <span class="price-amount">{{ formatVND(priceTotal) }}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
  import { useCartStore, type CartPreview } from '@/stores/CartStore';
  import { formatVND } from '@/util/formatNumber';
  import {
    ref,
    computed,
    watch,
    onMounted,
    type ComponentPublicInstance,
  } from 'vue';
  import { useToast } from 'vue-toastification';

  const cartStore = useCartStore();
  const props = withDefaults(
    defineProps<{
      cartItem: CartPreview;
      maxAmount?: number;
    }>(),
    {
      maxAmount: 999,
    }
  );
  const pathProductDetail = computed(() => {
    return `/product/${props.cartItem.productType.replace(' ', '-')}/${
      props.cartItem._id
    }`;
  });
  const emit = defineEmits<{
    (e: 'onViewProduct', id: string): void;
    (e: 'onRemove', id: string): void;
    (e: 'onAmountChange', cartId: string, _id: string, newAmount: number): void;
  }>();
  const toast = useToast();
  const amountRef = ref(props.cartItem.quantity);
  const cartAmount = computed(() => props.cartItem.quantity);
  const priceTotal = computed(() => {
    return cartAmount.value * 1000 * props.cartItem.price;
  });
  watch(cartAmount, (v) => {
    amountRef.value = cartAmount.value;
    emit(
      'onAmountChange',
      props.cartItem._id,
      props.cartItem._id,
      cartAmount.value
    );
  });
  // watch(amountRef, () => {
  //   console.log(amountRef.value);
  // });
  function handleChangeAmount(payload: Event) {
    if (amountRef.value > 0 && amountRef.value < props.maxAmount)
      cartStore.add(props.cartItem._id, amountRef.value);
  }
  function handleRemove() {
    // emit('onRemove', props.cartItem._id);
    cartStore.removeFromCart(props.cartItem._id);
  }
  function handleMinusButton() {
    // cartAmount.value - 1 < 0 ? 0 : cartAmount.value--;
    cartStore.remove(props.cartItem._id);
  }
  function handlePlusButton() {
    cartStore.add(props.cartItem._id);
    // cartAmount.value + 1 > props.maxAmount
    //   ? props.maxAmount
    //   : cartAmount.value++;
  }
</script>

<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  .cart-item {
    margin-bottom: 10px;
    .product-remove {
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: red;
      }
    }
    .product-thumbnail {
      padding: 5px;
      user-select: none;
      img {
        width: 75px;
        object-fit: cover;
      }

      &:hover ~ .product-name a {
        color: var(--orange);
      }
    }
    .product-name {
      padding: 5px;
      min-width: 280px;
    }
    .product-price {
      min-width: 90px;
      padding: 0 5px;
    }
    .product-quantity {
      width: 90px;

      .quantity-amount {
        display: flex;
        .minus {
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
          background: #fff;
          cursor: pointer;
        }
        .qty {
          border: 1px solid #ccc;
          border-right: 0;
          border-left: 0;
          text-align: center;
          width: 40px;
          padding: 5px;
          cursor: text;
        }
        .plus {
          border: 1px solid #ccc;
          border-radius: 0 4px 4px 0;
          background: #fff;
          cursor: pointer;
        }
        & > *:hover {
          background-color: #eee;
        }
        & > *:active {
          background-color: #ddd;
        }
      }
    }
    .product-subtotal {
      min-width: 90px;
      padding: 0 5px;
    }
  }
</style>
