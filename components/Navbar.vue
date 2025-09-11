<template lang="pug">
header.header
  .nav-brand
    NuxtLink(to="/") 
      img(src="/images/LogoUFRN.png")
  nav
    .nav-links
      NuxtLink(
      v-for="(item, index) in navbarItems"
      :key="index"
      :to="item.path"
      ) {{ item.name }}
</template>

<script setup lang="ts">
import type { NavbarItem } from "~/types";

const navbarItems = ref<NavbarItem[]>([
  { name: "Caracteres", path: "/caracteres" },
  { name: "Morfologia", path: "/morfologia" },
  { name: "Fisiologia", path: "/fisiologia" },
]);
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.header {
  background-color: $background-color;
  position: sticky;
  top: 0;
  z-index: 100;

  .nav-brand {
    border-bottom: 5px solid $primary-cyan;
    padding-left: $spacing-xxl;
    a {
      font-size: $font-size-h4;
      font-weight: bold;
      color: $primary-color;
      text-decoration: none;
      transition: color 0.3s ease;

      img {
        display: flex;
        justify-self: center;
      }

      &:hover {
        color: $secondary-color;
      }
    }
  }

  nav {
    align-items: center;
    padding: $spacing-md $spacing-lg;
    margin: 0 auto;
    width: 100%;
    background-color: $primary-blue;

    .nav-links {
      display: flex;
      justify-content: start;
      gap: $spacing-lg;

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        padding: $spacing-sm $spacing-md;
        border-radius: $border-radius-small;
        transition: all 0.3s ease;
        position: relative;

        &:hover,
        &.router-link-active {
          color: $primary-light-blue;
        }
      }
    }
  }
}
</style>
