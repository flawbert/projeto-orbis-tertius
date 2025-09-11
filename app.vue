<template lang="pug">
NuxtLayout
  div
    Navbar
    main.main
      NuxtPage(:key="$route.fullPath") 
  
    footer.footer
      .footer-content
        img(src="/images/LogoUFRNFooter.png")
        .footer-info
          p © Orbis Tertius, {{year}} 
          p contato@autofigurações.com
          p Universidade Federal do Rio Grande do Norte
</template>

<script setup lang="ts">
useHead({
  title: "Orbis Tertius",
  meta: [
    {
      name: "description",
      content: "Site sobre cinema e narrativas cinematográficas",
    },
  ],
});

const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.main {
  min-height: 70vh;
  background-color: $background-color;
}

.footer {
  background-color: $primary-color;
  color: $neutral-lightest;
  padding: $spacing-xl 0;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    display: flex;
    flex-direction: row;

    .footer-info {
      font-style: normal;
      font-weight: bold;
      font-size: $font-size-p;
      align-self: center;
    }
  }
}

@media (max-width: $mobile) {
  .footer-content {
    padding: 0 $spacing-md;
  }
}
</style>
