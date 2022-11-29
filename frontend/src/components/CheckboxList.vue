<template>
  <div class="checkbox_control">
    <label
      v-for="(value, index) in listValue"
      :key="index"
      class="checkbox_item"
      :for="value.replace(' ', '-')"
      @click=""
    >
      <input
        type="checkbox"
        name="Intel"
        :id="value.replace(' ', '-')"
        @input="(e) => handleCheckItem(e, value)"
      />
      {{ value }}
    </label>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue';
  const props = defineProps<{
    listValue: Array<string>;
  }>();
  const emit = defineEmits<{
    (e: 'onCheckListChange', value: string[]): void;
  }>();

  onMounted(() => {
    checkList.value = [];
  });
  const checkList = ref<string[]>([]);
  function handleCheckItem(e: Event, value: string) {
    e.stopPropagation();
    if (!checkList.value.includes(value)) {
      checkList.value.push(value);
    } else {
      checkList.value.splice(checkList.value.indexOf(value), 1);
    }
    emit('onCheckListChange', checkList.value);
    // console.log(checkList.value);
  }

  // watch(checkList.value, (v) => {
  //   // console.log(checkList.value);
  // });
</script>
<style lang="scss">
  .checkbox_control {
    padding: 0 10px;
    .checkbox_item {
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>
