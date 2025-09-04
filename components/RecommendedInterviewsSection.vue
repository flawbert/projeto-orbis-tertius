<template lang="pug">
.wrapper
  .recommended-interviews
    h3.interviews-title Entrevistas recomendadas
    Divider(orientation="horizontal" color="blue")
    .interviews-grid
      NuxtLink(
        v-for="(interview, index) in interviews"
        :key="index"
        :to="`/caracteres/${interview.slug}`"
      )
        InterviewCard(
          :key="interview.id"
          :title="interview.title"
          :subtitle="interview.subtitle"
          :date="interview.date"
          :image="interview.image"
        )
</template>
<script setup lang="ts">
import type { Interview } from "~/types";

const props = defineProps({
  interviews: {
    type: Array<Interview>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: $primary-lightest-blue;
  padding: $spacing-lg 0;

  .recommended-interviews {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
    margin-top: $spacing-xxl;

    .interviews-title {
      font-size: $font-size-h2;
      margin-bottom: $spacing-lg;
    }

    .interviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: $spacing-lg;

      a {
        text-decoration: none;
        color: inherit;
        display: flex;
      }

      :deep(.interview-card) {
        flex: 1;
        min-height: 320px;
      }
    }
  }
}

@media (max-width: $mobile) {
  .wrapper {
    padding: 0 $spacing-sm;
    .interviews-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
