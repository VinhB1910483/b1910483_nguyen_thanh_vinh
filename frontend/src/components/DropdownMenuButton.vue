<template >
  <div
    class="dropdown"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="btn dropdown-toggle">
      <slot></slot>
    </div>
    <ul ref="menuRef" class="dropdown-menu" :class="menuClassBlinding">
      <li v-for="item in dropdownList" key="index">
        <a
          v-if="typeof props.dropdownList[0]?.onClick === 'function'"
          class="dropdown-item"
          @click="item.onClick"
        >
          {{ item.title }}
        </a>
        <router-link v-else class="dropdown-item" :to="item.onClick">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from '@/types/component/props';
import { effect, reactive, ref, watch } from 'vue';

const isHover = ref(false);
const menuRef = ref();
const test: DropdownItem[] = [
  { title: 'Action' },
  { title: 'Another action' },
  { title: 'Something else here' },
];
const props = withDefaults(
  defineProps<{
    dropdownList?: DropdownItem[];
    textRight?: boolean;
    menuAlignment?: 'start' | 'end';
  }>(),
  {
    buttonTitle: 'Dropdown menu',
    dropdownList: () => [{ title: 'menu1' }],
    textRight: false,
    menuAlignment: 'start',
  }
);

const menuClassBlinding = reactive({
  'text-right': props.textRight,
  'align-end': props.menuAlignment === 'end',
  show: isHover,
});

// watch(isHover, (isHover) => (menuClassBlinding.show = isHover));
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    inset: 100% 0 0 0;
    height: 5px;
  }
  .btn.dropdown-toggle {
    display: flex;
  }
  ul.dropdown-menu {
    position: absolute;
    top: calc(100% + 5px);
    display: none;
    z-index: 99;
    background-color: #fff;
    box-shadow: 4px 2px 15px #bbb;
    color: var(--text-light-2);
    cursor: pointer;
    & li {
      padding: 0 10px;
      transition: all ease 0.1s;
      &:hover {
        background-color: #0099004d;

        & .dropdown-item {
          color: #000;
        }
      }
    }
    &.show {
      display: block;
    }
    &.align-end {
      right: 0;
    }
    &.text-right {
      text-align: right;
    }
    .dropdown-item {
      white-space: nowrap;
      font-weight: 500;
      font-size: 1rem;
      color: inherit;
    }
  }
}
</style>