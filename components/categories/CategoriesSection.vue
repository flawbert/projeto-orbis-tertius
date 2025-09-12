<template lang="pug">
section.categories-section
  .container
    h2.section-title Categorias
    Divider
    .category-grid
      NuxtLink(
        v-for="item in props.items"
        :key="item.id"
        :to="`/${categoryTranslation}/${item.slug}`"
      )
        CategoryCard(
          :title="item.title"
          :influence="item.influence"
          :image="item.image"
        )
</template>

<script setup lang="ts">
import { useTranslation } from "~/composables/translation";
import type { Morphology, Physiology } from "~/types";
import CategoryCard from "./CategoryCard.vue";

const props = defineProps<{
  type: "morphology" | "physiology";
  items: Morphology[] | Physiology[];
}>();

const categoryTranslation = useTranslation(props.type);
</script>

<style lang="scss" scoped>
.categories-section {
  padding: $spacing-xl 0;

  .section-title {
    font-size: 2rem;
    color: $text-color;
    text-align: left;
    padding-bottom: $spacing-sm;
    display: inline-block;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-lg;

    a {
      text-decoration: none;
      color: inherit;
      display: flex;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: translateY(-5px);
      }
    }
  }
}
</style>
