<template lang="pug">
div
  section.custom-header
    .container.header-grid
      .header-image
        img(src="/images/morfologia_main.jpg" alt="Imagem representativa de Morfologia no Cinema")
      .header-content
        h1.header-title O que é Morfologia no cinema?
        p.header-description {{ morphologyDescription }}

  section.categories-section
    .container
      h2.section-title Categorias
      .morphology-grid
        NuxtLink(
          v-for="item in morphologySummaries"
          :key="item.id"
          :to="`/morfologia/${item.slug}`"
        )
          MorphologyCard(
            :title="item.title"
            :influence="item.influence"
            :image="item.image"
          )
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useMorphologyStore } from "~/store/morphology";

useHead({
  title: "Orbis Tertius - Morfologia",
});

const morphologyDescription = ref(
  "Uma abordagem sobre as formas e estruturas que constroem a linguagem cinematográfica. Explore como técnicas de montagem, movimentos de câmera e encenação criam significado e impactam a percepção do espectador."
);

const morphologyStore = useMorphologyStore();

if (morphologyStore.morphologies.length === 0) {
  await morphologyStore.fetchMorphologies();
}

const morphologySummaries = computed(() => morphologyStore.getMorphologySummaries);
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

.categories-section {
  padding: $spacing-xl 0;

  .section-title {
    font-size: 2rem;
    margin-bottom: $spacing-md;
    color: $text-color;
    text-align: left;
    /* ALTERAÇÃO AQUI: Linha mais fina */
    border-bottom: 1px solid $primary-color;
    padding-bottom: $spacing-sm;
    /* REMOÇÃO AQUI: Para a linha ocupar a largura total */
    /* display: inline-block; */
  }

  .morphology-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-lg;
    margin-top: $spacing-lg;

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