<template lang="pug">
div
  section.custom-header
    .container.header-grid
      .header-content
        h1.header-title O que é Fisiologia no cinema?
        p.header-description {{ physiologyDescription}}
      .header-image
        img(src="/images/fisiologia_main.png" alt="Imagem representativa de Fisiologia no Cinema")

  CategoriesSection(type="physiology" :items="physiologyItems")

</template>

<script setup lang="ts">
import { ref } from "vue";
import CategoriesSection from "~/components/categories/CategoriesSection.vue";
import type { Morphology } from "~/types/index";

useHead({
  title: "Orbis Tertius - Fisiologia",
});

const physiologyDescription = ref(
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
);

const physiologyItems = ref<Morphology[]>([
  {
    id: 1,
    title: "FISIOLOGIA DO SUSPENSE",
    influence: "Influência: Alfred Hitchcock / Psicologia do Medo",
    slug: "suspense",
    image: "/images/fisiologia_suspense.png",
  },
  {
    id: 2,
    title: "FISIOLOGIA DO ÊXTASE",
    influence: "Influência: Gaspar Noé / Cinema Sensorial",
    slug: "extase",
    image: "/images/fisiologia_extase.png",
  },
  {
    id: 3,
    title: "FISIOLOGIA DO TERROR CORPORAL",
    influence: "Influência: David Cronenberg / Body Horror",
    slug: "terror-corporal",
    image: "/images/fisiologia_terror_corporal.png",
  },
]);
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.custom-header {
  padding: $spacing-xl 0;
  background-color: #fff;

  .header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
    align-items: center;
  }

  .header-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .header-content {
    .header-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: $text-color;
      margin-bottom: $spacing-md;
    }

    .header-description {
      font-size: 1rem;
      color: $text-color;
      line-height: 1.6;
    }
  }
}

@media (max-width: $tablet) {
  .custom-header .header-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .custom-header .header-content .header-title {
    font-size: 2rem;
  }
}

@media (max-width: $mobile) {
  .categories-section .morphology-grid {
    grid-template-columns: 1fr;
  }

  .custom-header .header-content .header-title {
    font-size: 1.8rem;
  }
}
</style>
