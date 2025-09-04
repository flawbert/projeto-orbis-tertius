<template lang="pug">
.divider(
  :class="[orientationClass, spacingClass]"
  :style="{ 'background-color': dividerColor }"
)
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    spaced?: boolean;
    color?: "black" | "blue";
  }>(),
  {
    orientation: "horizontal",
    spaced: true,
    color: "blue",
  }
);

const orientationClass = computed(() => `divider-${props.orientation}`);
const spacingClass = computed(() => (props.spaced ? "divider-spaced" : ""));
const dividerColor = computed(() => {
  if (props.color === "blue") return "var(--primary-cyan)";
  else return props.color;
});
</script>

<style lang="scss" scoped>
.divider {
  &-horizontal {
    height: 1.2px;
    width: 100%;
  }

  &-vertical {
    width: 1.2px;
    height: 100%;
  }

  &-spaced.divider-horizontal {
    margin: 1.5rem 0;
  }

  &-spaced.divider-vertical {
    margin: 0 1.5rem;
  }
}
</style>
