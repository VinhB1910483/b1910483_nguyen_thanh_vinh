<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <ul>
      <li v-for="item in list">
        <span v-if="item.leftSubTitle">{{ item.leftSubTitle }}</span>
        <router-link v-if="item.href" :to="item.href">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
        <span v-if="item.rightSubTitle">{{ item.rightSubTitle + 'asd' }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from '@vue/runtime-core';
  import type { RouteLocationRaw } from 'vue-router';

  const props = defineProps<{
    title: String;
    list: Array<{
      title: String;
      leftSubTitle?: String;
      rightSubTitle?: String;
      href?: RouteLocationRaw | '';
    }>;
  }>();

  // onMounted(() => {
  //   console.log(props.list); // <div>
  // });
</script>
<style lang="scss" scoped>
  h2 {
    font-weight: 600;
  }
</style>
