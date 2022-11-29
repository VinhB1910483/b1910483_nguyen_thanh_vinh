<template>
  <div class="footer">
    <div class="footer__top">
      <div class="container">
        <Carousel :settings="settingCarousel">
          <Slide v-for="imgName in listBrandImage" :key="imgName">
            <div class="carousel__item">
              <img :src="`${imgName}`" :alt="imgName.slice(0, -4)" />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>

    <div class="footer__mid">
      <div class="container">
        <CollapseList
          v-for="caterory in footerCaterory"
          :list="caterory.collapse"
          :title="caterory.title"
        />
      </div>
    </div>
    <hr />

    <div class="footer__bot">
      <div class="container">
        <font-awesome-icon
          icon="fa-brands fa-facebook"
          style="color: #2374e1"
        />
        <IconShopee style="fill: #ea501f" />
        <font-awesome-icon icon="fa-brands fa-twitter" style="color: #1d9bf0" />
        <font-awesome-icon icon="fa-brands fa-youtube" style="color: #ff0000" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CollapseList } from '@/components';
  import { Carousel, Pagination, Slide } from 'vue3-carousel';
  import IconShopee from './icons/orther/IconShopee.vue';
  import 'vue3-carousel/dist/carousel.css';

  const settingCarousel = {
    itemsToShow: 4.5,
    wrapAround: true,
    autoplay: 3000,
  };
  const listBrandImage = [
    '/image/brand/brand_1.png',
    '/image/brand/brand_2.png',
    '/image/brand/brand_3.png',
    '/image/brand/brand_5.png',
    '/image/brand/brand_7.png',
    '/image/brand/brand_8.png',
  ];
  const footerCaterory = [
    {
      title: 'Hỗ Trợ Khách Hàng',
      collapse: [
        {
          title: 'Gửi yêu cầu bảo hành',
          href: '/',
        },
        {
          title: 'Gửi yêu cầu đổi hàng',
          href: '/',
        },
        {
          leftSubTitle: 'Bảo hành: ',
          title: '(030) 011 381179',
          href: '/',
        },
        {
          leftSubTitle: 'Hotline bảo hành tại HCM: ',
          title: '0703 123 3333',
          href: '/',
        },

        {
          leftSubTitle: 'P. Kinh doanh: ',
          title: 'sales@example.com.vn',
          href: '/',
        },
        {
          leftSubTitle: 'Hợp tác thanh toán: ',
          title: 'payment@example.com',
          href: '/',
        },
      ],
    },
    {
      title: 'Chính sách',
      collapse: [
        {
          title: 'Chính sách giao nhận',
          href: '/',
        },
        {
          title: 'Chính sách đổi trả hàng',
          href: '/',
        },
        {
          title: 'Phương thức thanh toán',
          href: '/',
        },
        {
          title: 'Hướng dẫn trả góp',
          href: '/',
        },
        {
          title: 'Chính sách bảo hành',
          href: '/',
        },
      ],
    },

    {
      title: 'Giới Thiệu',
      collapse: [
        {
          title: 'Trang chủ',
          href: '/home',
        },
        {
          title: 'Về Memoryzone',
          href: '/about',
        },
        {
          title: 'Điều khoản giao dịch',
          href: '/policy',
        },
        {
          title: 'Tuyển dụng',
          href: '/recruit',
        },
      ],
    },
  ];
</script>

<style scoped lang="scss">
  .brand {
    display: flex;
  }

  .carousel__slide {
    background: var(--color-background-mute);
    user-select: none;

    & > .carousel__item {
      transform: scale(1);
      opacity: 0.5;
      transition: 0.5s;
    }

    &--visible > .carousel__item {
      opacity: 1;
      transform: rotateY(0);
    }

    &--next > .carousel__item {
      transform: scale(0.9) translate(-10px);
    }

    &--prev > .carousel__item {
      transform: scale(0.9) translate(10px);
    }

    &--active > .carousel__item {
      transform: scale(1.1);
    }
  }

  .footer {
    & > * {
      margin: 15px 0;
    }

    &__mid .container {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      text-align: center;

      & > * {
        min-width: 310px;

        &:first-child {
          text-align: start;
        }

        &:last-child {
          text-align: end;
        }
      }
    }

    &__bot .container {
      display: flex;
      justify-content: center;
      font-size: 32px;

      & > * {
        font-size: 32px;
        /* height: 32px; */
        margin: 0 5px;
        transform: scale(1.2);
        transition: all ease 0.15s;

        &:not(:hover) {
          color: gray !important;
          fill: gray !important;
          transform: scale(1);
        }
      }
    }
  }
</style>
