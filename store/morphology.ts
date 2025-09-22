import { defineStore } from 'pinia'
import type { Morphology, MorphologyExample, LoadingState } from '~/types'
import { mockMorphologies } from '~/services/mock-data'

interface CustomMorphologyExample extends MorphologyExample {
  image?: string
}

interface CustomMorphology extends Morphology {
  mainImage?: string
  examples: CustomMorphologyExample[]
}

interface MorphologyState extends LoadingState {
  morphologies: CustomMorphology[]
  currentMorphology: CustomMorphology | null
}

export const useMorphologyStore = defineStore('morphology', {
  state: (): MorphologyState => ({
    morphologies: [],
    currentMorphology: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getMorphologyBySlug: (state) => {
      return (slug: string): CustomMorphology | undefined => {
        return state.morphologies.find(morphology => morphology.slug === slug)
      }
    },

    getMorphologySummaries: (state): Pick<Morphology, 'id' | 'title' | 'influence' | 'slug' | 'image'>[] => {
      const uniqueSummaries = state.morphologies.map(m => {
        let cardTitle: string;
        
        if (m.slug === 'montagem') {
          cardTitle = 'Morfologia da MONTAGEM'; 
        } else if (m.slug === 'plano-sequencia') {
          cardTitle = 'Morfologia do PLANO-SEQUÊNCIA'; 
        } else if (m.slug === 'cinema-de-atracoes') {
          cardTitle = 'Morfologia do CINEMA DE ATRAÇÕES'; 
        } else {
          cardTitle = m.title; 
        }

        return {
          id: m.id,
          title: cardTitle,
          influence: m.influence,
          slug: m.slug,
          image: m.image,
        };
      });

      const duplicatedSummaries = uniqueSummaries.map(item => ({
          ...item,
          id: item.id + 1000 
      }));

      const finalOrderSummaries = [
          uniqueSummaries[0],
          uniqueSummaries[1], 
          uniqueSummaries[2],
          uniqueSummaries[1],
          uniqueSummaries[2],
          uniqueSummaries[0],
      ].map((item, index) => ({
          ...item,
          id: index < 3 ? item.id : item.id + 1000 + index // Garante IDs únicos para todas as 6 posições
      }));


      return finalOrderSummaries;
    },
  },

  actions: {
    async fetchMorphologies(): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        await new Promise(resolve => setTimeout(resolve, 400))
        this.morphologies = mockMorphologies as CustomMorphology[]
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao carregar morfologias'
      } finally {
        this.isLoading = false
      }
    },

    async fetchMorphologyBySlug(slug: string): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        if (this.morphologies.length === 0) {
          await this.fetchMorphologies()
        }
        const morphology = this.getMorphologyBySlug(slug)
        if (morphology) {
          this.currentMorphology = morphology
        } else {
          throw new Error('Morfologia não encontrada')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao carregar morfologia'
      } finally {
        this.isLoading = false
      }
    },
    
    setCurrentMorphology(morphology: CustomMorphology | null): void {
      this.currentMorphology = morphology
    },

    clearError(): void {
      this.error = null
    }
  }
})