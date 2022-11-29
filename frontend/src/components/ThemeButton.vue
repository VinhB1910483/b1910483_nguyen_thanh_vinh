<template>
  <input class="toggle-checkbox" type="checkbox" :checked="darkTheme" />
  <div class="toggle-slot" @click="changeTheme">
    <div class="sun-icon-wrapper">
      <div
        class="iconify sun-icon"
        data-icon="feather-sun"
        data-inline="false"
      ></div>
    </div>
    <div class="toggle-button"></div>
    <div class="moon-icon-wrapper">
      <div
        class="iconify moon-icon"
        data-icon="feather-moon"
        data-inline="false"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const darkTheme = ref(false);
  function changeTheme() {
    darkTheme.value = !darkTheme.value;
    document.body.dataset.theme = darkTheme.value ? 'dark' : '';
  }
</script>
<style lang="scss">
  .toggle-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .toggle-slot {
    position: relative;

    height: 20px;
    width: 40px;
    padding: 5px;
    border-radius: 10em;
    background-color: #f5f5f5;
    transition: background-color 250ms;
  }

  .toggle-checkbox:checked ~ .toggle-slot {
    background-color: #374151;
  }

  .toggle-button {
    margin-bottom: 2px;
    position: absolute;
    transform: translate(20px, 0px);
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #ffeccf;
    box-shadow: inset 0px 0px 0px 0.75em #ffbb52;
    transition: background-color 250ms, border-color 250ms,
      transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .toggle-button {
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.75em white;
    transform: translate(0px, 0px);
  }

  .sun-icon {
    position: absolute;
    height: 13px;
    width: 13px;
    color: #ffbb52;
  }

  .sun-icon-wrapper {
    position: absolute;
    height: 10px;
    width: 10px;
    opacity: 1;
    transform: translate(-2px, -2px) rotate(15deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(10px, 0px) rotate(0deg);
  }

  .moon-icon {
    position: absolute;
    height: 10px;
    width: 10px;
    color: white;
  }

  .moon-icon-wrapper {
    position: absolute;
    height: 10px;
    width: 10px;
    opacity: 0;
    transform: translate(10px, 0px) rotate(0deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms,
      transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(20px, 0px) rotate(-15deg);
  }
</style>
