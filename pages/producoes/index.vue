<template>
  <div class="producoes">
    <PageHeader title="Produções" />

    <div class="container layout-grid">
      <aside class="sidebar">
        <div class="filter-group search-group">
          <h3 class="filter-title">Pesquisar</h3>
          <div class="search-input-wrapper">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar produções..." 
              class="search-input"
            />
            <img src="/images/icons/search.svg" alt="Buscar" class="search-icon" />
          </div>
        </div>

        <Divider class="sidebar-divider" />

        <div class="filter-group">
          <h3 class="filter-title">Categorias</h3>
          <ul class="filter-list">
            <li v-for="category in categories" :key="category.id" class="filter-item">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="category.id" 
                  v-model="selectedCategories"
                >
                <span class="checkbox-custom"></span>
                <span class="label-text">{{ category.label }}</span>
              </label>
            </li>
          </ul>
        </div>

        <Divider class="sidebar-divider" />

        <div class="filter-group">
          <h3 class="filter-title">Tipos</h3>
          <ul class="filter-list">
            <li v-for="type in types" :key="type.id" class="filter-item">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="type.id" 
                  v-model="selectedTypes"
                >
                <span class="checkbox-custom"></span>
                <span class="label-text">{{ type.label }}</span>
              </label>
            </li>
          </ul>
        </div>
      </aside>

      <main class="content">
        <div v-if="filteredProductions.length > 0" class="productions-grid">
          <article 
            v-for="prod in filteredProductions" 
            :key="prod.id" 
            class="production-card"
          >
            <div class="card-image-wrapper">
              <img 
                :src="prod.image" 
                :alt="prod.title" 
                class="card-image"
              />
              <span class="card-tag">{{ getCategoryLabel(prod.categoryId) }}</span>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ prod.title }}</h3>
              <p class="card-excerpt">{{ prod.excerpt }}</p>
              
              <NuxtLink :to="`/producoes/${prod.slug}`" class="card-link">
                Ler mais
                <span class="arrow">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <p>Nenhuma produção encontrada com os filtros selecionados.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Definição das Interfaces
interface Category {
  id: string;
  label: string;
}

interface Type {
  id: string;
  label: string;
}

interface Production {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  typeId: string;
  image: string; // Caminho da imagem
}

// Estados dos Filtros
const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);
const selectedTypes = ref<string[]>([]);

// Dados Estáticos (Mock Data) - Adicione suas imagens reais aqui
const categories: Category[] = [
  { id: 'analises', label: 'Análises Fílmicas' },
  { id: 'artigos', label: 'Artigos Acadêmicos' },
  { id: 'entrevistas', label: 'Entrevistas' },
  { id: 'criticas', label: 'Críticas' },
];

const types: Type[] = [
  { id: 'texto', label: 'Texto' },
  { id: 'video', label: 'Vídeo' },
  { id: 'audio', label: 'Áudio' },
];

// LISTA DE PRODUÇÕES (Adicione seus dados aqui)
const productions = ref<Production[]>([
  {
    id: 1,
    title: 'A Marca da Maldade: Uma análise técnica',
    slug: 'a-marca-da-maldade',
    excerpt: 'Uma exploração profunda sobre o uso de planos-sequência e a construção de tensão na obra clássica de Orson Welles.',
    categoryId: 'analises',
    typeId: 'texto',
    image: '/images/amarcadamaldade.jpg' // Verifique se essa imagem existe em public/images/
  },
  {
    id: 2,
    title: 'Entrevista com Kleber Mendonça Filho',
    slug: 'entrevista-kleber',
    excerpt: 'Conversamos com o diretor sobre as novas tendências do cinema pernambucano e sua projeção internacional.',
    categoryId: 'entrevistas',
    typeId: 'video',
    image: '/images/kleber.png'
  },
  {
    id: 3,
    title: 'O Silêncio dos Inocentes e o olhar',
    slug: 'silencio-inocentes',
    excerpt: 'Como o diretor Jonathan Demme utiliza close-ups frontais para criar uma atmosfera de intimidade e desconforto.',
    categoryId: 'analises',
    typeId: 'texto',
    image: '/images/osilenciodosinocentes.jpg'
  },
  {
    id: 4,
    title: 'A evolução do terror psicológico',
    slug: 'terror-psicologico',
    excerpt: 'Artigo acadêmico debatendo as mudanças de paradigma no gênero terror na última década.',
    categoryId: 'artigos',
    typeId: 'texto',
    image: '/images/hereditary.jpg'
  },
  {
    id: 5,
    title: 'Crítica: Vidas Passadas',
    slug: 'vidas-passadas',
    excerpt: 'Uma análise sobre as escolhas, o destino e a linguagem silenciosa do amor no filme de Celine Song.',
    categoryId: 'criticas',
    typeId: 'texto',
    image: '/images/past-lifes.png'
  }
]);

// Lógica de Filtragem (Computed)
const filteredProductions = computed(() => {
  return productions.value.filter(prod => {
    // 1. Filtro de Texto
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          prod.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());

    // 2. Filtro de Categoria
    const matchesCategory = selectedCategories.value.length === 0 || 
                            selectedCategories.value.includes(prod.categoryId);

    // 3. Filtro de Tipo
    const matchesType = selectedTypes.value.length === 0 || 
                        selectedTypes.value.includes(prod.typeId);

    return matchesSearch && matchesCategory && matchesType;
  });
});

// Helper para pegar label da categoria
const getCategoryLabel = (id: string) => {
  return categories.find(c => c.id === id)?.label || 'Geral';
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.producoes-page {
  padding-bottom: 4rem;
}

.layout-grid {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

/* --- SIDEBAR --- */
.sidebar {
  width: 280px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-title {
  font-family: 'Times New Roman', serif; // Assumindo fonte serifada pelo design
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #000;
}

.sidebar-divider {
  margin: 1.5rem 0;
  opacity: 0.3;
}

/* Busca */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #666; // Cor de destaque suave
  }
}

.search-icon {
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  opacity: 0.5;
}

/* Listas de Checkbox */
.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  margin-bottom: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;

  input {
    display: none; // Esconde o checkbox padrão
  }

  // Checkbox Customizado
  .checkbox-custom {
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      background-color: #000; // Cor da seleção
      transform: scale(0);
      transition: transform 0.2s;
    }
  }

  input:checked + .checkbox-custom::after {
    transform: scale(1);
  }
  
  &:hover .checkbox-custom {
    border-color: #999;
  }
}

/* --- GRID DE CONTEÚDO --- */
.content {
  flex-grow: 1;
}

.productions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Cards */
.production-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
}

.card-image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover .card-image {
    transform: scale(1.05);
  }
}

.card-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  color: #1a1a1a;
}

.card-excerpt {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.card-link {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  font-size: 0.9rem;
  
  .arrow {
    margin-left: 6px;
    transition: transform 0.2s;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #888;
  background: #f9f9f9;
  border-radius: 8px;
}
</style>