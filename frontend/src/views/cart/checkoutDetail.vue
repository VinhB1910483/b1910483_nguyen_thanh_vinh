<template>
  <div class="container">
    <Breadcrumb
      :breadcrumb-paths="breadcrumbPath"
      :last-path="'Chi tiểt thanh toán'"
    />
    <div class="checkout">
      <div class="checkout_address" :class="{ isSubmitting: isSubmitting }">
        <form ref="infoForm" class="info_form" @submit="handleInfoFormSubmit">
          <div class="text_control">
            <label for="info_form-email"
              >Email: <span class="require">*</span
              ><span class="err_msg">{{ emailErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="email"
              :class="{ error: emailErrorMessage }"
              id="info_form-email"
              placeholder="Email"
            />
          </div>
          <div class="text_control">
            <label for="info_form-name"
              >Tên: <span class="require">*</span
              ><span class="err_msg">{{ nameErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="name"
              :class="{ error: nameErrorMessage }"
              id="info_form-name"
              placeholder="Tên"
            />
          </div>
          <div class="text_control">
            <label for="info_form-last_name"
              >Họ: <span class="require">*</span
              ><span class="err_msg">{{ lastnameErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="lastname"
              :class="{ error: lastnameErrorMessage }"
              id="info_form-last_name"
              placeholder="Họ"
            />
          </div>
          <div class="text_control">
            <label for="info_form-address"
              >Địa chỉ: <span class="require">*</span
              ><span class="err_msg">{{ addressErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="address"
              :class="{ error: addressErrorMessage }"
              id="info_form-address"
              placeholder="Địa chỉ"
            />
          </div>
          <div class="text_control">
            <label for="info_form-city"
              >Tỉnh/Tp <span class="require">*</span
              ><span class="err_msg">{{ cityErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="city"
              :class="{ error: cityErrorMessage }"
              id="info_form-city"
              placeholder="Tỉnh/Tp"
            />
          </div>
          <div class="text_control">
            <label for="info_form-phone"
              >Số điện thoại: <span class="require">*</span
              ><span class="err_msg">{{ phoneErrorMessage }}</span></label
            >
            <input
              type="text"
              v-model="phone"
              :class="{ error: phoneErrorMessage }"
              id="info_form-phone"
              placeholder="Số điện thoại"
            />
          </div>
          <div class="areaText_control">
            <label for="info_form-additional"
              >Thông tin bổ sung:
              <span class="err_msg">{{ additionalErrorMessage }}</span></label
            >
            <textarea
              v-model="additional"
              id="info_form-additional"
              :class="{ error: additionalErrorMessage }"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
            ></textarea>
          </div>
          <button type="submit" ref="submitBtnInfoForm" hidden></button>
        </form>
      </div>
      <div class="checkout_overview">
        <h2 class="title">Đơn hàng của bạn</h2>
        <div class="order_review" :class="{ isSubmitting: isSubmitting }">
          <table class="review_list">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="list_item"
                v-for="(cartItem, index) in cartItems"
                :key="index"
              >
                <td class="name">{{ cartItem.productName }}</td>
                <td class="price">
                  {{ `${formatVND(cartItem.price * 1000)}` }}
                </td>
              </tr>
              <tr class="list_item">
                <td class="name">Tổng</td>
                <td class="price">
                  {{ `${formatVND(priceTotal * 1000)}` }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="payment">
          <form class="payment_form" @submit="handlePaymentFormSubmit">
            <div class="radio_control">
              <div class="radio_input_item">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  name="payment-method"
                  id="cod"
                  value="cod"
                  checked
                />
                <label for="cod">Thanh toán khi nhận hàng (COD)</label>
              </div>
              <div class="radio_input_item disabled">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  name="payment-method"
                  id="instore"
                  value="instore"
                />
                <label for="instore">Thanh toán trực tiếp tại cửa hàng</label>
              </div>
              <div class="radio_input_item" disabled>
                <input
                  type="radio"
                  v-model="paymentMethod"
                  name="payment-method"
                  id="onlline"
                  value="onlline"
                />
                <label for="onlline"
                  >Thanh toán trực tuyến & Trả góp trực tuyến</label
                >
              </div>
            </div>
            <button type="submit" ref="submitPaymemtForm" hidden>test</button>
          </form>
          <button class="payment_btn" @click="handleCheckout">Đặt hàng</button>
          <div class="payment_policy">
            <p>
              Bằng cách nhấp vào <b>Đặt hàng</b>, bạn đồng ý với điều khoản và
              điều kiện và chính sách riêng tư của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import { reactive, onMounted, ref, watch, onBeforeMount } from 'vue';
  import type { ComponentPublicInstance } from 'vue';
  import { storeToRefs } from 'pinia';
  import * as yup from 'yup';
  import { useCartStore } from '@/stores/CartStore';
  import { useAuthStore } from '@/stores/auth/AuthStore';
  import {
    useField,
    useForm,
    type InvalidSubmissionHandler,
  } from 'vee-validate';
  import { formatVND } from '@/util/formatNumber';
  import { useRoute, useRouter } from 'vue-router';
  import userService from '@/service/user.service';
  const submitInfoForm = ref<ComponentPublicInstance<HTMLButtonElement>>();
  const submitPaymemtForm = ref<ComponentPublicInstance<HTMLButtonElement>>();
  const priceTotal = ref(0);
  const router = useRouter();
  const breadcrumbPath = reactive([
    {
      title: 'Trang chủ',
      linkTo: '/',
    },
    {
      title: 'Giỏ hàng',
      linkTo: '/cart',
    },
  ]);
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { cartItems, payAmount, count } = storeToRefs(cartStore);
  const formValues = {
    email: user.value?.email ?? '',
    name: user.value?.name ?? '',
    lastname: user.value?.lastname ?? '',
    address: user.value?.address ?? '',
    city: user.value?.city ?? '',
    phone: user.value?.phone ?? '',
    paymentMethod: 'cod',
  };
  onMounted(() => {
    document.title = 'Chi tiết thanh toán';
    cartItems.value.forEach((element) => {
      priceTotal.value += element.price * element.quantity;
    });
  });
  watch(cartItems, () => {});
  const timerSubmit = ref();
  const {
    handleSubmit,
    setFieldValue,
    setValues,
    resetForm,
    controlledValues,
    errors,
    isSubmitting,
  } = useForm({
    initialValues: formValues,
  });
  const { value: email, errorMessage: emailErrorMessage } = useField(
    'email',
    yup.string().required('không được bỏ trống').email('không đúng định dạng')
  );
  const { value: name, errorMessage: nameErrorMessage } = useField(
    'name',
    yup.string().required('không được bỏ trống')
  );
  const { value: lastname, errorMessage: lastnameErrorMessage } = useField(
    'lastname',
    yup.string().required('không được bỏ trống')
  );
  const { value: address, errorMessage: addressErrorMessage } = useField(
    'address',
    yup.string().required('không được bỏ trống')
  );
  const { value: city, errorMessage: cityErrorMessage } = useField(
    'city',
    yup.string().required('không được bỏ trống')
  );
  const { value: phone, errorMessage: phoneErrorMessage } = useField(
    'phone',
    yup
      .string()
      .required('không được bỏ trống')
      .matches(
        RegExp('([+]84|84|0[3|5|7|8|9])+(([0-9]{8})|([0-9]{9}))'),
        'không đúng định dạng'
      )
  );
  const { value: additional, errorMessage: additionalErrorMessage } = useField(
    'phone',
    yup.string().max(1000, 'tối đa 1000 kí tự')
  );
  const { value: paymentMethod } = useField('paymentMethod');
  const handleInfoFormSubmit = handleSubmit((values) => {
    // console.log(JSON.stringify(values, null, 2));
  });
  const handlePaymentFormSubmit = handleSubmit((values) => {
    // console.log(JSON.stringify(values, null, 2));
  });
  const handleCheckout = () => {
    // submitInfoForm.value?.click();
    submitPaymemtForm.value?.click();
    timerSubmit.value && clearTimeout(timerSubmit.value);
    timerSubmit.value = setTimeout(async () => {
      console.log(errors.value);
      if (Object.keys(errors.value).length == 0) {
        if (Object.keys(errors.value).length === 0) {
          console.log({
            ...controlledValues.value,
            orders: [...cartItems.value],
            paymentTotal: priceTotal.value,
          });
        }
        if (authStore.user) {
          try {
            await userService.updateUser({
              address: controlledValues.value.address,
              city: controlledValues.value.city,
              phone: controlledValues.value.phone,
            });
            authStore.user.city = controlledValues.value.address;
            authStore.user.address = controlledValues.value.city;
            authStore.user.phone = controlledValues.value.phone;
            authStore.save();
            cartStore.clear();
            router.push('/cart/complete');
          } catch (error) {
            console.log(error);
          }
        }

        resetForm();
      }
    }, 100);
  };
</script>

<style lang="scss">
  .container {
    .checkout {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      color: var(--text-light-2);
      gap: 20px;
      border-radius: 10px;
      overflow: hidden;
      .checkout_address {
        background-color: #fff;
        padding: 30px 20px;
        flex: 6;
        min-width: 385px;
        .areaText_control,
        .text_control {
          display: flex;
          flex-direction: column;
          padding: 10px;
          margin-right: 20px;
          label {
            font-weight: 600;
          }
          .require {
            color: red;
          }
          .err_msg {
            color: red;
            font-size: 0.8rem;
            font-weight: normal;
            padding: 0 5px;
          }
          textarea,
          input {
            border-radius: 5px;
            padding: 8px;
            &.error {
              border-color: red;
            }
            &:focus-visible {
              box-shadow: 2px 2px 10px #6f9e88;
            }
          }
          textarea {
            min-height: 100px;
          }
        }
      }
      .checkout_overview {
        background-color: #fff;
        flex: 4;
        min-width: 385px;
        .title {
          text-align: center;
          color: var(--orange);
          font-weight: bold;
          padding: 20px 0 10px;
        }
        .order_review {
          padding: 10px 20px;
          .review_list {
            width: 100%;
            thead {
              font-weight: 600;
            }
            tbody,
            thead {
              border-bottom: 2px solid var(--orange);
              color: #000;
            }
            th,
            td {
              text-align: left;
            }
            th:last-child,
            td:last-child {
              text-align: right;
            }
            .list_item {
              td {
                padding: 4px 2px;
                border-bottom: 1px solid #ddd;
              }
              .name {
                color: var(--text-light-1);
              }
              .price {
                color: var(--orange);
                font-weight: 600;
              }
            }
          }
        }
        .payment {
          padding: 10px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .radio_control {
            display: flex;
            flex-direction: column;
            .radio_input_item {
              input {
                margin-right: 15px;
                color: var(--orange);
                background-color: var(--orange);
                border: 1px solid var(--orange);
              }
              label {
                color: var(--text-light-1);
                font-weight: 500;
              }
              &[disabled],
              &.disabled {
                pointer-events: none;
                user-select: none;
                opacity: 0.4;
              }
            }
          }
          .payment_btn {
            margin: 20px 0;
            padding: 5px 25px;
          }
          .payment_policy {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
</style>
