<template lang="pug">
div
  div(v-if="morphologyStore.isLoading")
    .loading-container
      p Carregando...

  div(v-else-if="morphologyStore.error")
    .error-container
      p Erro: {{ morphologyStore.error }}

  div(v-else-if="morphology")
    .main-image-container(v-if="morphology.mainImage")
        img(:src="morphology.mainImage" alt="Imagem principal da morfologia")

    .container
      PageHeader(
        :title="morphology.title"
        :description="morphology.subtitle"
        :description-text="morphology.description"
      )

    section.morphology-details.white-background
      .container
        .examples-section(v-if="morphology.examples && morphology.examples.length > 0")
          h3.section-title.with-line Exemplos e Análises
          .examples-grid
            .example-card(v-for="example in morphology.examples" :key="example.id")
              img.example-image(v-if="example.image" :src="example.image" :alt="`Imagem para ${example.title}`")
              .card-content
                h4 {{ example.title }}
                p.example-description {{ example.description }}
                .example-details {{ example.details }}

    section.related-content-section
      .container
        .related-content
          h3.section-title.with-line Conteúdo Relacionado
          //- ALTERADO: Voltamos à estrutura de cards, mas agora dentro de um NuxtLink
          .content-grid
            NuxtLink.content-card(
              v-for="content in relatedContent"
              :key="content.id"
              :to="content.path"
            )
              img.content-image(v-if="content.image" :src="content.image" :alt="content.title")
              .content-text
                h4 {{ content.title }}
                p {{ content.description }}

  div(v-else)
    .not-found-container
      p Morfologia não encontrada
</template>

<script setup lang="ts">
import { useMorphologyStore } from "~/store/morphology";
import type { RelatedContent } from "~/types";

const route = useRoute();
const morphologyStore = useMorphologyStore();

const slug = route.params.slug as string;

await morphologyStore.fetchMorphologyBySlug(slug);

const morphology = computed(() => morphologyStore.currentMorphology);

const relatedContent = ref<RelatedContent[]>([
  {
    id: "1",
    title: "Artigos Acadêmicos",
    description: "Textos teóricos sobre montagem cinematográfica",
    type: "article",
    image: "/images/artigos-academicos.jpeg",
    path: "/artigos",
  },
  {
    id: "2",
    title: "Entrevistas",
    description: "Conversas com editores e diretores",
    type: "interview",
    image: "/images/entrevistas.jpeg",
    path: "/entrevistas",
  },
  {
    id: "3",
    title: "Análises Fílmicas",
    description: "Estudos de caso de filmes clássicos",
    type: "analysis",
    image: "/images/analises-filmicas.jpeg",
    path: "/analises",
  },
]);

useHead({
  title: computed(() =>
    morphology.value
      ? `Orbis Tertius - ${morphology.value.title}`
      : "Orbis Tertius - Morfologia"
  ),
});

onUnmounted(() => {
  morphologyStore.clearError();
});
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.main-image-container {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: $spacing-xl;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.section-title.with-line {
  position: relative;
  padding-bottom: $spacing-sm;
  margin-bottom: $spacing-lg;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70px;
    height: 4px;
    background-color: $primary-color;
  }
}

.white-background {
  background-color: #ffffff;
}

section {
  padding: $spacing-xl 0;
}

.morphology-details {
  padding-top: 0;
}

.examples-section {
  margin-bottom: $spacing-xl;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-lg;
}

.example-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  .example-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .card-content {
    padding: $spacing-lg;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: $spacing-sm;
    color: $primary-color;
  }

  .example-description {
    line-height: 1.5;
    margin-bottom: $spacing-sm;
    color: $text-color;
  }

  .example-details {
    font-size: 0.9rem;
    color: $accent-color;
    font-style: italic;
  }
}

.related-content-section {
  background-color: #dae6f2;
  padding: $spacing-xl 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .related-content .section-title {
    font-size: 1.8rem;
    color: $primary-color;
    text-align: center;
    position: relative;

    &::after {
        left: 50%;
        transform: translateX(-50%);
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-lg;
    margin-top: $spacing-lg;
  }

  .content-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .content-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .content-text {
    padding: $spacing-lg;
    text-align: left;
  }

  .content-text h4 {
    font-size: 1.2rem;
    margin-bottom: $spacing-sm;
    color: $primary-color;
  }

  .content-text p {
    color: $text-color;
    line-height: 1.5;
  }
}

@media (max-width: $mobile) {
  .examples-grid, .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>