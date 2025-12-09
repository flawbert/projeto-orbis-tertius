<template lang="pug">
.carousel-section
  .section-header
    h2.section-title {{ title }}
  
  .carousel-container
    button.carousel-arrow.prev(
      v-if="itemsCount > visibleCards"
      @click="scrollPrev"
      :disabled="isAtStart"
      aria-label="Anterior"
    )
      svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
        polyline(points="15 18 9 12 15 6")

    .carousel-wrapper(ref="carouselWrapper")
      .carousel-track(
        ref="carouselTrack"
        :style="{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }"
      )
        slot
    
    button.carousel-arrow.next(
      v-if="itemsCount > visibleCards"
      @click="scrollNext"
      :disabled="isAtEnd"
      aria-label="Próximo"
    )
      svg(width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3")
        polyline(points="9 18 15 12 9 6")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
  title: string;
  itemsCount: number;
  visibleCards?: number | { default: number, lg?: number, md?: number, sm?: number };
}>();

const carouselWrapper = ref<HTMLElement | null>(null);
const carouselTrack = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const cardWidth = ref(0);
const gap = 24;

const currentVisibleCards = ref(3);

const maxIndex = computed(() => {
  return Math.max(0, props.itemsCount - currentVisibleCards.value);
});

const isAtEnd = computed(() => {
  return currentIndex.value >= maxIndex.value;
});

const isAtStart = computed(() => {
  return currentIndex.value === 0;
})

const scrollNext = () => {
  if (!isAtEnd.value) {
    currentIndex.value = Math.min(currentIndex.value + 1, maxIndex.value);
  }
};

const scrollPrev = () => {
  if (!isAtStart.value) {
    currentIndex.value = Math.max(currentIndex.value - 1, 0);
  }
};

const calculateCardWidth = async () => {
  await nextTick();
  if (carouselTrack.value && carouselTrack.value.children.length > 0) {
    const firstCard = carouselTrack.value.children[0] as HTMLElement;
    cardWidth.value = firstCard.offsetWidth;
  } else if (carouselWrapper.value) {
     cardWidth.value = (carouselWrapper.value.offsetWidth - (gap * (currentVisibleCards.value - 1))) / currentVisibleCards.value;
  }
};

const updateVisibleCards = () => {
  const width = window.innerWidth;
  if (typeof props.visibleCards === 'object') {
    if (width < 768 && props.visibleCards.sm !== undefined) {
      currentVisibleCards.value = props.visibleCards.sm;
    } else if (width < 1024 && props.visibleCards.md !== undefined) {
      currentVisibleCards.value = props.visibleCards.md;
    } else if (width < 1200 && props.visibleCards.lg !== undefined) {
      currentVisibleCards.value = props.visibleCards.lg;
    }
     else {
      currentVisibleCards.value = props.visibleCards.default || 3;
    }
  } else {
    if (width < 768) {
      currentVisibleCards.value = 1;
    } else if (width < 1024) {
      currentVisibleCards.value = 2;
    } else {
      currentVisibleCards.value = props.visibleCards || 3;
    }
  }
  calculateCardWidth();
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
};


onMounted(() => {
  updateVisibleCards();
  window.addEventListener('resize', updateVisibleCards);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCards);
});
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.carousel-section {
  width: 100%;
  margin-bottom: $spacing-xl;
}

.section-header {
  margin-bottom: $spacing-md;

  .section-title {
    font-size: 1.8rem;
    color: $text-color;
    margin: 0 0 $spacing-xs 0;
    padding-bottom: $spacing-xs;
    border-bottom: 2px solid #000;
    display: inline-block;
    width: 100%;
  }
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  position: relative;
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
  width: 100%;
  padding: 0; 
}

.carousel-track {
  display: flex;
  gap: 24px;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
  
  :deep(> *) {
    flex-shrink: 0;
    flex-grow: 0;
    width: calc((100% - (2 * 24px)) / 3);
    
    @media (max-width: 1024px) {
      width: calc((100% - 24px) / 2);
    }
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.carousel-arrow {
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: $spacing-sm;
  color: #113272;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  z-index: 10;

  &:hover:not(:disabled) {
    transform: scale(1.1);
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 40px;
    height: 40px;
  }

}

@media (max-width: 768px) {
  .section-header {
    .section-title {
      font-size: 1.5rem;
    }
  }

  .carousel-arrow svg {
    width: 32px;
    height: 32px;
  }
}
</style>