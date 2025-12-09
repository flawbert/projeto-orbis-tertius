<template lang="pug">
div
  div(v-if="physiologyStore.isLoading")
    .loading-container
      p Carregando...

  div(v-else-if="physiologyStore.error")
    .error-container
      p Erro: {{ physiologyStore.error }}

  div(v-else-if="physiology")
    .main-image-container(v-if="physiology.mainImage")
      img(:src="physiology.mainImage" alt="Imagem principal da fisiologia")

    .container
      PageHeader(
        :title="physiology.subtitle"
        :description-text="physiology.description"
      )

      section.works-section(v-if="physiology.works && physiology.works.length > 0")
        //- O comentário foi removido da linha abaixo
        CardCarousel(
          title="Obras"
          :items-count="physiology.works.length"
          :visible-cards="3" 
        )
          WorkCard(
            v-for="work in physiology.works"
            :key="work.id"
            :title="work.title"
            :date="parseWorkDate(work.date)"
            :image="work.image"
          )
    
    section.interviews-section
      .interviews-container
        //- O comentário também precisa ser removido aqui, se houver
        CardCarousel(
          title="Entrevistas recomendadas dessa categoria"
          :items-count="recommendedInterviews.length"
          :visible-cards="3"
        )
          InterviewCard(
            v-for="interview in recommendedInterviews"
            :key="interview.id"
            :title="interview.title"
            :subtitle="interview.subtitle"
            :date="interview.date"
            :image="interview.image"
          )

  div(v-else)
    .not-found-container
      p Fisiologia não encontrada
</template>

<script setup lang="ts">
import { usePhysiologyStore } from "~/store/physiology";
import type { Interview } from "~/types";
import CardCarousel from "~/components/CardCarousel.vue";
import WorkCard from "~/components/WorkCard.vue";
import InterviewCard from "~/components/InterviewCard.vue";

const route = useRoute();
const physiologyStore = usePhysiologyStore();

const slug = route.params.slug as string;

await physiologyStore.fetchPhysiologyBySlug(slug);

const physiology = computed(() => physiologyStore.currentPhysiology);

// Função para converter a string de data do work para Date
const parseWorkDate = (dateStr: string): Date => {
  // Se a data está no formato "1980, Kubrick", extrai o ano
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    return new Date(`${yearMatch[1]}-01-01`);
  }
  // Caso contrário, tenta fazer parse direto
  return new Date(dateStr);
};

const recommendedInterviews = ref<Interview[]>([
  {
    id: "1",
    title: "Entrevista: Hirokazu Koreeda",
    subtitle: 'Diretor de "Monster"',
    date: new Date("2018-03-15"),
    slug: "koreeda",
    category: "director",
    image: "/images/koreeda.png",
  },
  {
    id: "2",
    title: "Entrevista: Nelson Pereira dos Santos",
    subtitle: 'Diretor de "Vidas Secas"',
    date: new Date("2010-07-25"),
    slug: "nelson-pereira",
    category: "director",
    image: "/images/nelson.png",
  },
  {
    id: "3",
    title: "Entrevista: Kleber Mendonça Filho",
    subtitle: 'Diretor de "Bacurau"',
    date: new Date("2025-12-25"),
    slug: "kleber",
    category: "director",
    image: "/images/kleber.png",
  },
  
  {
    id: "4",
    title: "Entrevista: Ava DuVernay",
    subtitle: 'Diretora de "Selma"',
    date: new Date("2020-10-01"),
    slug: "ava-duvernay",
    category: "director",
    image: "/images/ava.png",
  },
  {
    id: "5",
    title: "Entrevista: Bong Joon-ho",
    subtitle: 'Diretor de "Parasita"',
    date: new Date("2021-04-20"),
    slug: "bong-joon-ho",
    category: "director",
    image: "/images/bong.png", 
  },
]);

useHead({
  title: computed(() =>
    physiology.value
      ? `Orbis Tertius - ${physiology.value.title}`
      : "Orbis Tertius - Fisiologia"
  ),
});

onUnmounted(() => {
  physiologyStore.clearError();
});
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;
@use "sass:color";

.loading-container,
.error-container,
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  p {
    font-size: 1.2rem;
    color: $text-color;
  }
}

.error-container p {
  color: #d32f2f;
}

.main-image-container {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  margin-bottom: $spacing-xl;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}

.works-section {
  margin-top: $spacing-xl;
  margin-bottom: $spacing-xl;
}

.interviews-section {
  background-color: #e8f0f7;
  padding: $spacing-xl 0;
  margin-top: $spacing-xl;

  .interviews-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
  }
}

@media (max-width: 768px) {
  .container,
  .interviews-container {
    padding: 0 $spacing-md;
  }

  .main-image-container {
    max-height: 300px;
  }

  .works-section {
    margin-top: $spacing-lg;
    margin-bottom: $spacing-lg;
  }

  .interviews-section {
    padding: $spacing-lg 0;
    margin-top: $spacing-lg;
  }
}
</style>