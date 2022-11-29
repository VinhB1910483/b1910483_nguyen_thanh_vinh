<template>
  <div class="container">
    <Breadcrumb :breadcrumb-paths="breadcrumbPath" last-path="Không tìm thấy" />
    <div class="center">
      <div class="error mx-auto mt-4" data-text="404">404</div>
      <p class="lead text-gray-800 mb-5">Page Not Found</p>
      <p class="text-gray-500 mb-0">
        Có vẻ bạn đã gặp vấn đề với đường dẫn ...
      </p>
      <button class="outline" @click="handleReturn">Trở lại trang trước</button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import { reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const breadcrumbPath = reactive([
    {
      title: 'Trang chủ',
      linkTo: '/',
    },
  ]);
  const router = useRouter();
  onMounted(() => {
    document.title = 'Trang  chủ';
  });
  function handleReturn() {
    router.back();
  }
</script>
<style scoped lang="scss">
  // .container {
  // }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 10px 20px;
    color: #aaa;
    button {
      padding: 5px 10px;
      margin: 10px 0;
    }
  }
  a {
    cursor: pointer;
    font-weight: bold;
  }
  .error {
    color: #5a5c69;
    font-size: 7rem;
    position: relative;
    line-height: 1;
    width: 12.5rem;
    &:after {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      text-shadow: -1px 0 #e74a3b;
      top: 0;
      color: #5a5c69;
      background: #fff;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim 2s infinite linear alternate-reverse;
    }

    &:before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      text-shadow: 1px 0 #4e73df;
      top: 0;
      color: #5a5c69;
      background: #fff;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim-2 3s infinite linear alternate-reverse;
    }

    @keyframes noise-anim {
      0% {
        clip: rect(49px, 9999px, 40px, 0);
      }
      5% {
        clip: rect(75px, 9999px, 72px, 0);
      }
      10% {
        clip: rect(97px, 9999px, 93px, 0);
      }
      15% {
        clip: rect(15px, 9999px, 9px, 0);
      }
      20% {
        clip: rect(14px, 9999px, 92px, 0);
      }
      25% {
        clip: rect(18px, 9999px, 94px, 0);
      }
      30% {
        clip: rect(17px, 9999px, 20px, 0);
      }
      35% {
        clip: rect(71px, 9999px, 59px, 0);
      }
      40% {
        clip: rect(42px, 9999px, 84px, 0);
      }
      45% {
        clip: rect(56px, 9999px, 25px, 0);
      }
      50% {
        clip: rect(46px, 9999px, 14px, 0);
      }
      55% {
        clip: rect(47px, 9999px, 1px, 0);
      }
      60% {
        clip: rect(64px, 9999px, 58px, 0);
      }
      65% {
        clip: rect(89px, 9999px, 92px, 0);
      }
      70% {
        clip: rect(56px, 9999px, 39px, 0);
      }
      75% {
        clip: rect(80px, 9999px, 71px, 0);
      }
      80% {
        clip: rect(8px, 9999px, 13px, 0);
      }
      85% {
        clip: rect(66px, 9999px, 68px, 0);
      }
      90% {
        clip: rect(68px, 9999px, 4px, 0);
      }
      95% {
        clip: rect(56px, 9999px, 14px, 0);
      }
      100% {
        clip: rect(28px, 9999px, 53px, 0);
      }
    }
  }
</style>
