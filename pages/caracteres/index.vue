<template lang="pug">
div
  .page-header

  section
    .container
      .filters
        .search
          input(placeholder="ex: Walter Salles" v-model="searchQuery")
        .categories
          select(v-model="selectedCategory")
            option(v-for="cat in categories" :key="cat" :value="cat") {{ cat }}
        .roles
          select(v-model="selectedRole")
            option(v-for="role in roles" :key="role" :value="role") {{ role }}

  section.content-grid
    .container
      .interviews-section(
        v-for="(interviews, role) in filteredGroupedByRole"
        :key="role"
      )
        InterviewsSection(:interviews="interviews" :title="roleLabels[role] || role" )
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

useHead({
  title: "Orbis Tertius - Caracteres",
});

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

const roleLabels: Record<string, string> = {
  director: "Diretores",
  writer: "Roteiristas",
  actor: "Atores",
  "visual-artist": "Artistas Visuais",
};

const roleKeys: Record<string, string> = Object.fromEntries(
  Object.entries(roleLabels).map(([key, value]) => [value, key])
);

const persons = ref([
  {
    title: "Entrevista: Hirokazu Koreeda",
    subtitle: 'Diretor de "Monster"',
    date: new Date("2025-03-25"),
    image: "/images/koreeda.png",
    roles: ["director", "writer"],
    slug: "koreeda",
    category: "Cinema Japonês",
  },
  {
    title: "Entrevista: Nelson Pereira dos Santos",
    subtitle: 'Diretor de "Vidas Secas"',
    date: new Date("2010-06-25"),
    image: "/images/nelson.png",
    roles: ["director", "actor"],
    slug: "nelson-pereira",
    category: "Cinema Brasileiro",
  },
  {
    title: "Entrevista: Kleber Mendonça Filho",
    subtitle: 'Diretor de "Bacurau"',
    date: new Date("2025-12-25"),
    image: "/images/kleber.png",
    roles: ["director", "writer", "visual-artist"],
    slug: "kleber",
    category: "Cinema Brasileiro",
  },
  {
    title: "Entrevista: Celine Song",
    subtitle: 'Roteirista de "Vidas Passadas"',
    date: new Date("2024-12-24"),
    image: "/images/celine-song.png",
    roles: ["writer", "actor"],
    slug: "celine-song",
    category: "Cinema Japonês",
  },
  {
    title: "Entrevista: Guilhermo del Toro",
    subtitle: 'Roteirista de "Pinóquio"',
    date: new Date("2023-02-12"),
    image: "/images/deltoro.png",
    roles: ["writer"],
    slug: "guilhermo-del-toro",
    category: "Cinema Brasileiro",
  },
  {
    title: "Entrevista: Alfonso Cuarón",
    subtitle: 'Roteirista de "Roma"',
    date: new Date("2025-02-17"),
    image: "/images/cuaron.png",
    roles: ["writer", "actor"],
    slug: "alfonso-cuaron",
    category: "Cinema Japonês",
  },
]);

const filteredPersons = computed(() => {
  return persons.value.filter((p) => {
    const matchesSearch =
      searchQuery.value === "" ||
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === "Categorias" ||
      p.category === selectedCategory.value; // TODO: add category tag

    const matchesRole =
      selectedRole.value === "Tipos" ||
      p.roles.includes(roleKeys[selectedRole.value]);

    console.log(matchesRole);

    return matchesSearch && matchesCategory && matchesRole;
  });
});

const filteredGroupedByRole = computed(() => {
  const groups: Record<string, typeof persons.value> = {};
  for (const person of filteredPersons.value) {
    for (const role of person.roles) {
      if (
        selectedRole.value === "Tipos" ||
        role === roleKeys[selectedRole.value]
      ) {
        if (!groups[role]) groups[role] = [];
        groups[role].push(person);
      }
    }
  }
  return groups;
});
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;
@use "sass:color";
.page-header {
  height: 30rem;
  background: url("/public/images/Banner.png") no-repeat center center;
  background-size: cover;
  margin-bottom: $spacing-lg;
}

.content-grid {
  padding-bottom: $spacing-xl;
}

.filters {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin: $spacing-lg 0;
  padding-top: $spacing-xxl;

  .search {
    flex: 4.4;
    input {
      border-radius: 8px;
      height: 3.2rem;
      width: 100%;
      font-size: 1rem;
      padding: 0.5rem 2.5rem 0.5rem 1rem;
      border: 2.35px solid $neutral-light;
      border-radius: 4px;
      background: color.adjust($color: $neutral-light, $lightness: 15%)
        url("/images/icons/search.svg") no-repeat right 0.75rem center;
      background-size: 1.5rem;
    }
  }

  .categories {
    flex: 1.2;
  }

  .roles {
    flex: 1;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 3.2rem;
    width: 100%;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    border: 1px solid #ccc;
    background: $primary-blue url("/images/icons/arrow-down.svg") no-repeat
      right 0.75rem center;
    background-size: 1rem;
  }
}

@media (max-width: $mobile) {
  .filters {
    flex-direction: column;
    align-items: stretch;
    .search,
    .categories,
    .roles {
      flex: 1;
    }
  }
}
</style>
