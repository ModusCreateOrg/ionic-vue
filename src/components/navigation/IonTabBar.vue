<template functional>
  <div class="tabs-outer">
    <slot name="top" />

    <div class="tabs-inner">
      <slot />
    </div>

    <slot name="bottom" />
  </div>
</template>

<script lang="ts">
export default class IonTabs {}
</script>

<style scoped>
.tabs-outer {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.tabs-inner {
  position: relative;
  flex: 1;
};
</style>
