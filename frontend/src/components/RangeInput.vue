<template lang="">
  <div id="range-slider" ref="rangeSliderRef" class="slider">
    <div ref="leftButtonRef" class="slider-touch-left">
      <span></span>
    </div>
    <div ref="rightButtonRef" class="slider-touch-right">
      <span></span>
    </div>
    <div ref="hardLineRef" class="slider-hardline"></div>
    <div ref="lineRef" class="slider-line"></div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch, type ComponentPublicInstance } from 'vue';

  const props = withDefaults(
    defineProps<{
      min?: number;
      max?: number;
      step?: number;
    }>(),
    {
      min: 0,
      max: 1000000,
      step: 100000,
    }
  );
  const buttonDistance = 40;
  let leftX = 0;
  let rightX = 0;
  let isDown = false;
  let isDrag = false;
  let startX: number;
  let walk: number;
  const rangeSliderRef = ref<ComponentPublicInstance<HTMLDivElement>>();
  const leftButtonRef = ref<ComponentPublicInstance<HTMLDivElement>>();
  const rightButtonRef = ref<ComponentPublicInstance<HTMLDivElement>>();
  const hardLineRef = ref<ComponentPublicInstance<HTMLDivElement>>();
  const lineRef = ref<ComponentPublicInstance<HTMLDivElement>>();

  const minValue = ref(props.min);
  const maxValue = ref(props.max);
  const emit = defineEmits<{
    (e: 'onChange', minValue: number, maxValue: number): void;
  }>();
  onMounted(() => {});

  watch([minValue, maxValue], (v) => {
    emit('onChange', minValue.value, maxValue.value);
  });
  // add drag listener
  watch(
    [leftButtonRef, rightButtonRef, hardLineRef, lineRef],
    ([leftButtonRef, rightButtonRef, hardLineRef, lineRef]) => {
      if (rightButtonRef && leftButtonRef && hardLineRef && lineRef) {
        const maxHeight = hardLineRef.offsetWidth;
        rightX = rightButtonRef.offsetLeft;
        leftX = leftButtonRef.offsetLeft;

        addDragButtonListener(leftButtonRef, maxHeight);
        addDragButtonListener(rightButtonRef, maxHeight);
        leftButtonRef.addEventListener('mousemove', () => {
          if (!isDown) return;
          leftX = leftButtonRef.offsetLeft;
          if (leftX + buttonDistance > rightX) {
            leftX = rightX - buttonDistance;
            leftButtonRef.style.left = leftX + 'px';
          }
          minValue.value =
            Math.floor(((leftX / maxHeight) * props.max) / props.step) *
            props.step;
          // console.log('left value: ' + minValue.value)
          lineRef.style.left = leftX + 'px';
        });
        rightButtonRef.addEventListener('mousemove', () => {
          if (!isDown) return;
          rightX = rightButtonRef.offsetLeft;
          if (rightX - buttonDistance < leftX) {
            rightX = leftX + buttonDistance;
            rightButtonRef.style.left = rightX + 'px';
          }
          maxValue.value =
            Math.floor(((rightX / maxHeight) * props.max) / props.step) *
            props.step;
          // console.log('right value: ' + maxValue.value)
          lineRef.style.right = maxHeight - rightX + 'px';
        });
      }
    }
  );

  // move btn on line
  function addDragButtonListener(
    rangeSliderButtonRef: ComponentPublicInstance<HTMLDivElement>,
    maxHeight: number
  ) {
    rangeSliderButtonRef.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - rangeSliderButtonRef.offsetLeft;
    });
    rangeSliderButtonRef.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
    });
    rangeSliderButtonRef.addEventListener('mouseup', () => {
      isDown = false;
    });
    rangeSliderButtonRef.addEventListener('mousemove', (e) => {
      isDrag = false;
      if (!isDown) return;
      e.preventDefault();
      isDrag = true;
      walk = e.pageX - startX; //scroll-fast
      walk = walk < 0 ? 0 : walk > maxHeight ? maxHeight : walk;
      rangeSliderButtonRef.style.left = walk + 'px';
    });
  }
</script>
<style lang="scss">
  .slider {
    display: block;
    position: relative;
    height: 36px;
    width: 100%;
    // background-color: #ccc;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    .slider-touch-left,
    .slider-touch-right {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: block;
      position: absolute;
      top: 5px;
      height: 25px;
      width: 25px;
      padding: 6px;
      z-index: 2;
    }

    .slider-touch-right {
      right: 0px;
    }

    .slider-touch-left {
      left: 0px;
    }

    .slider-touch-left span,
    .slider-touch-right span {
      display: block;
      width: 100%;
      height: 100%;
      background: orange;
      border-radius: 50%;
      cursor: pointer;
    }

    .slider-line,
    .slider-hardline {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      top: 16px;
      height: 4px;
      border-radius: 4px;
      background-color: rgb(250, 230, 193);
      z-index: -1;
      overflow: hidden;
    }

    .slider-hardline {
      width: calc(100% - 36px);
      left: 18px;
    }

    .slider-line {
      z-index: 1;
      margin: 0px 18px;
      left: 0px;
      right: 0px;
      background-color: orange;
    }
  }
</style>
