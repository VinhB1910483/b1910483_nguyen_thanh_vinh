<template>
  <div class="avatar" :style="{ height: height + 'px', width: width + 'px' }">
    <div v-if="textAvatar" class="avatar-text">
      <span>{{ initial }}</span>
    </div>
    <img v-else class="avatar-img" :src="imgUrl" @error="imgIsErr" />
  </div>
</template>
<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

const props = withDefaults(
  defineProps<{
    initial?: string;
    imgUrl?: string;
    height?: number;
    width?: number;
  }>(),
  {
    imgUrl: '',
    initial: 'A',
    height: 30,
    width: 30,
  }
);
const textAvatar = ref(false);
const imgIsErr = () => {
  textAvatar.value = true;
};
</script>
<style scpoed lang="scss">
.avatar {
  background-color: #fff;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  white-space: nowrap;
  &-img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  &-text {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--color-secondary);

    & > span {
      margin: 0 !important;
    }
  }
}
</style>