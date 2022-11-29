<template>
  <div v-if="totalPage > 0" class="pagination">
    <button
      v-if="currentPage != 1"
      class="pagination_item outline control prev"
      @click="handleControlButton('prev')"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
    </button>
    <button
      class="pagination_item outline"
      v-for="(item, index) in pageShow"
      :key="index"
      :class="{
        active: currentPage.toString() === item,
        'not-button': item == '...',
      }"
      @click="handleChosePagination(item)"
    >
      <span>{{ item }}</span>
    </button>

    <button
      v-if="currentPage < totalPage"
      class="pagination_item outline control next"
      @click="handleControlButton('next')"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useToast } from 'vue-toastification';
  const props = withDefaults(
    defineProps<{
      totalPage?: number;
      currentPage?: number;
    }>(),
    {
      totalPage: 15,
      currentPage: 5,
    }
  );
  const emit = defineEmits<{
    (e: 'onChangePage', newPage: number): void;
  }>();
  //   const totalPage = computed(() => props.totalPage);

  const pageShow = computed(() => {
    let newShow: Array<string> = [];
    const page = Array.from(Array(props.totalPage).keys(), (v) => v + 1);

    page.forEach((v, i) => {
      if (v == 1) newShow.push(v.toString());
      else if (v >= props.currentPage - 2 && v <= props.currentPage + 2) {
        newShow.push(v.toString());
      } else if (v == props.totalPage) {
        newShow.push(v.toString());
      } else {
        if (newShow[newShow.length - 1] != '...') newShow.push('...');
      }
    });
    return newShow;
  });
  function handleChosePagination(item: string) {
    if (item !== '...') {
      let page = Number.parseInt(item);
      emit('onChangePage', page);
    }
  }
  function handleControlButton(action: string) {
    if (action === 'prev') {
      emit('onChangePage', props.currentPage - 1);
    } else if (action === 'next') {
      emit('onChangePage', props.currentPage + 1);
    }
  }
</script>
<style lang="scss">
  .pagination {
    display: flex;
    gap: 5px;
    & &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;

      &.active {
        background-color: var(--orange);
        color: var(--light);
      }
      &.not-button {
        border: unset;
        cursor: unset;
        &:hover {
          background-color: unset;
          color: var(--orange);
        }
      }

      &.control {
        margin: 0 10px;
      }
    }
  }
</style>
