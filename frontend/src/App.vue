<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCartStore } from '@/stores/CartStore';

  const props = defineProps({});
  const cartStore = useCartStore();
  const route = useRoute();
  const layout = computed(() => route.meta.layout || 'div');
  onMounted(() => {
    addEventListener('storage', (event) => {
      cartStore.update();
    });
  });
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
