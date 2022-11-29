<template>
  <div class="breadcrumb">
    <div
      v-for="(breadcrumbPath, index) in breadcrumbPaths"
      :key="index"
      class="breadcrumb_item"
    >
      <RouterLink
        class="breadcrumb_item-link"
        :to="breadcrumbPath.linkTo ? breadcrumbPath.linkTo : ''"
      >
        {{ breadcrumbPath.title }}
      </RouterLink>
      <span> > </span>
    </div>
    <div class="breadcrumb_item">
      <RouterLink v-if="lastPath" class="breadcrumb_item-link" to="">
        {{ lastPath }}
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    breadcrumbPaths: {
      title: string;
      linkTo?: string;
    }[];
    lastPath?: string;
  }>();
  console.log(props.breadcrumbPaths);
</script>
<style lang="scss">
  .breadcrumb {
    margin: 10px 0;
    display: flex;
    a {
      text-decoration: none;
    }
    &_item {
      margin-right: 10px;
      font-size: 1.2rem;
      font-weight: bold;
      color: #ccc;

      &-link {
        color: #ccc;
        &:hover {
          color: var(--orange);
        }
      }
      &:last-child &-link {
        cursor: unset;
        color: var(--color-text-2);
        &:hover {
          color: var(--color-text-2);
        }
      }
    }
  }
</style>
