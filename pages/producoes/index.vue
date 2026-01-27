<template lang="pug">
.producoes-proprias-page
  .page-header
  .page-spacing

  main.main-content

    section.filters-wrapper
      .filters-container
        .search-box
          input(type="text" placeholder="ex: Walter Salles" v-model="searchQuery")
        .filter-selects
          .select-wrapper.categories
            select(v-model="selectedCategory")
              option(v-for="cat in categories" :key="cat" :value="cat") {{ cat }}
          .select-wrapper.roles
            select(v-model="selectedRole")
              option(v-for="role in roles" :key="role" :value="role") {{ role }}

    section.content-section
      //- SEÇÃO DE VÍDEOS
      .section-group
        .section-header
          h2.section-title Vídeos
          .section-divider
        
        .carousel-wrapper
          button.carousel-arrow.prev(@click="scrollCarousel('videos', -1)" aria-label="Anterior")
            svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
              polyline(points="15 18 9 12 15 6")

          .carousel-track-container(ref="videosTrack")
            .carousel-track
              article.video-card(v-for="video in videos" :key="video.id")
                .thumb-container
                  img(:src="video.thumbnail" :alt="video.title")
                .card-info
                  h3 {{ video.title }}
                  p {{ video.date }}

          button.carousel-arrow.next(@click="scrollCarousel('videos', 1)" aria-label="Próximo")
            svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
              polyline(points="9 18 15 12 9 6")

      //- SEÇÃO DE ARTIGOS
      .section-group
        .section-header
          h2.section-title Artigos
          .section-divider
        
        .carousel-wrapper
          button.carousel-arrow.prev(@click="scrollCarousel('articles', -1)" aria-label="Anterior")
            svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
              polyline(points="15 18 9 12 15 6")

          .carousel-track-container(ref="articlesTrack")
            .carousel-track
              article.article-card(v-for="article in articles" :key="article.id")
                img.article-img(:src="article.image" :alt="article.title")
                .card-info
                  p.authors {{ article.authors }}
                  h3 {{ article.title }}
                  p.desc {{ article.description }}

          button.carousel-arrow.next(@click="scrollCarousel('articles', 1)" aria-label="Próximo")
            svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
              polyline(points="9 18 15 12 9 6")
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref("");
const selectedCategory = ref("Categorias");
const selectedRole = ref("Tipos");

const categories = ref([
  "Categorias",
  "Fisiologia do Medo",
  "Morfologia do Plano Sequência",
]);
const roles = ref([
  "Tipos",
  "Diretores",
  "Roteiristas",
  "Atores",
  "Artistas Visuais",
]);

const videosTrack = ref<HTMLElement | null>(null)
const articlesTrack = ref<HTMLElement | null>(null)

// Dados simulados
const videos = ref([
  { id: 1, title: 'Entrevista: Hirokazu Koreeda', date: 'Março 25, 2025', thumbnail: '/images/koreeda.png' },
  { id: 2, title: 'Entrevista: Nelson Pereira dos Santos', date: 'Junho 25, 2010', thumbnail: '/images/nelson.png' },
  { id: 3, title: 'Entrevista: Kleber Mendonça Filho', date: 'Dezembro 25, 2025', thumbnail: '/images/kleber.png' },
  { id: 4, title: 'Entrevista: Walter Salles', date: 'Janeiro 10, 2026', thumbnail: '/images/walter.png' },
  { id: 5, title: 'Entrevista: Fernando Meirelles', date: 'Fevereiro 15, 2026', thumbnail: '/images/meirelles.png' }
])

const articles = ref([
  { id: 1, authors: 'Silva, A.; Oliveira, B.', title: 'A Linguagem Cinematográfica e a Construção de Sentidos', description: 'Análise da narrativa fílmica e elementos técnicos (enquadramento, montagem).', image: '/images/linguagem-cinema.png' },
  { id: 2, authors: 'Johnson, C.; Lee, D.', title: 'Cinema e Representação Social: Gênero e Raça', description: 'Crítica à falta de representação em blockbusters.', image: '/images/analises-filmicas.jpeg' },
  { id: 3, authors: 'Müller, E.; Santos, F.', title: 'O Impacto do Streaming na Indústria Cinematográfica', description: 'Mudanças nos hábitos de consumo pós Netflix.', image: '/images/netflixlogo.png' },
  { id: 4, authors: 'Costa, G.', title: 'Cinema Novo', description: 'O movimento que mudou o Brasil.', image: '/images/cinemanovo.jpg' },
  { id: 5, authors: 'Pereira, H.', title: 'Luz e Sombra', description: 'Técnicas de iluminação.', image: '/images/luzesombra.jpg' }
])

const scrollCarousel = (type: 'videos' | 'articles', direction: number) => {
  const track = type === 'videos' ? videosTrack.value : articlesTrack.value
  if (track) {
    const scrollAmount = track.clientWidth * 0.8
    track.scrollBy({
      left: scrollAmount * direction,
      behavior: 'smooth'
    })
  }
}
</script>

<style lang="scss" scoped>
$primary-blue: #164194;
$dark-blue: #113272;
$bg-light: #f8f8f8;
$border-gray: #c6c6c6;

.main-content {
  padding: 0 10% 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.filters-wrapper {
  margin: 40px 0 60px;
  
  .filters-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .search-box {
    flex: 3;
    position: relative;
    
    input {
      width: 100%;
      height: 50px;
      padding: 0 45px 0 20px;
      border: 2px solid $border-gray;
      border-radius: 10px;
      background: $bg-light url("/images/icons/search.svg") no-repeat right 15px center;
      background-size: 20px;
      font-size: 16px;
      color: #777;

      &:focus {
        outline: none;
        border-color: $primary-blue;
      }
    }
  }

  .filter-selects {
    display: flex;
    gap: 15px;
    flex: 1;
  }

  .select-wrapper select {
    appearance: none;
    width: 100%;
    height: 45px;
    padding: 0 35px 0 15px;
    background: $primary-blue;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    background-image: url("/images/icons/arrow-down.svg");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px;

    &:hover { filter: brightness(1.2); }
  }
}

.section-group {
  margin-bottom: 50px;
  
  .section-title {
    font-size: 1.8rem;
    color: $dark-blue;
    margin: 0;
  }

  .section-divider {
    width: 100%;
    height: 1px;
    background: $dark-blue;
    margin: 10px 0 25px;
  }
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;

  .carousel-track-container {
    overflow: hidden;
    flex: 1;
  }

  .carousel-track {
    display: flex;
    gap: 25px;
    scroll-behavior: smooth;
    flex-wrap: nowrap; 
  }

  .carousel-arrow {
    flex-shrink: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: $dark-blue;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    &:hover {
      transform: scale(1.15);
      opacity: 0.8;
    }

    svg {
      width: 40px;
      height: 40px;
      stroke: currentColor;
    }
  }
}

.video-card, .article-card {
  flex: 0 0 calc(33.333% - 17px);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover { transform: translateY(-5px); }
  
  .thumb-container {
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .card-info {
    padding: 15px 0;
    h3 { color: $primary-blue; margin: 0 0 5px; font-size: 18px; }
    p { color: #666; font-size: 14px; margin: 0; }
  }
}

.article-img { width: 100%; height: 220px; object-fit: cover; border-radius: 8px; }

@media (max-width: 1024px) {
  .video-card, .article-card { flex: 0 0 calc(50% - 13px); }
}

@media (max-width: 768px) {
  .main-content { padding: 0 5% 40px; }
  .filters-container { flex-direction: column; }
  .video-card, .article-card { flex: 0 0 100%; }
  .carousel-arrow svg { width: 32px; height: 32px; }
}
</style>