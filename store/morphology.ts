import { defineStore } from 'pinia'
import type { Morphology, MorphologyExample, LoadingState } from '~/types'

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

    getAllMorphologies: (state): CustomMorphology[] => {
      return state.morphologies
    }
  },

  actions: {
    async fetchMorphologies(): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        this.morphologies = [
          {
            id: '1',
            title: 'Técnicas de montagem cinematográfica',
            description: 'A montagem cinematográfica é muito mais do que a simples tarefa de cortar e colar pedaços de filme.' + 
            'É a verdadeira essência da linguagem do cinema, uma arte invisível que dita o ritmo, a emoção e o próprio significado de uma história.' +
            'Através da organização e justaposição de planos, os cineastas manipulam o tempo e o espaço, guiando o olhar e a percepção do espectador para construir uma experiência coesa e impactante. ' + 
            'Historicamente, a importância da montagem foi percebida nos primórdios do cinema, mas foi com os cineastas da Escola Soviética, no início do século XX, que ela foi elevada ao status de teoria e principal ferramenta expressiva. ' +
            'Eles foram os pioneiros em entender que a combinação de dois planos poderia gerar um terceiro significado, ausente nas imagens isoladas.',
            mainImage: '/images/sergeieisenstein.jpg',
            examples: [
              {
                id: '1',
                title: 'Montagem de Conflito',
                description: 'Técnica que cria tensão através do contraste entre planos.',
                details: 'Exemplo: "O Encouraçado Potemkin" (1925)',
                image: '/images/oencouracadopotemkin.jpg'
              },
              {
                id: '2',
                title: 'Montagem Rítmica',
                description: 'O ritmo dos cortes dialoga com o movimento dentro da cena.',
                details: 'Exemplo: "Apocalypse Now" (1979)',
                image: '/images/apocalypsenow.jpg'
              },
              {
                id: '3',
                title: 'Montagem Paralela',
                description: 'Alterna entre duas cenas que acontecem simultaneamente.',
                details: 'Exemplo: "O Silêncio dos Inocentes" (1991)',
                image: '/images/osilenciodosinocentes.jpg'
              }
            ],
            slug: 'montagem'
          },
          {
            id: '2',
            title: 'Continuidade temporal e espacial',
            description: 'A continuidade temporal refere-se à coerência da passagem do tempo dentro da narrativa de um filme' + 
            'Ela garante que a sequência de eventos se desenrole de maneira lógica e compreensível, evitando saltos temporais abruptos e inexplicáveis que poderiam confundir o espectador.'
            + 'Para alcançar essa fluidez, os cineastas empregam diversas técnicas, sendo as mais notáveis o raccord de movimento e a gestão da duração temporal.',
            mainImage: '/images/andre-bazin.jpg',
            examples: [
              {
                id: '1',
                title: 'Plano-Sequência Clássico',
                description: 'Técnica que mantém a continuidade espacial e temporal.',
                details: 'Exemplo: "Cidadão Kane" (1941)',
                image: '/images/cidadaokane.jpeg'
              },
              {
                id: '2',
                title: 'Imersão e Tensão',
                description: 'Cria uma experiência visceral e contínua em cenas de ação.',
                details: 'Exemplo: "Filhos da Esperança" (2006)',
                image: '/images/filhosdaesperanca.jpg'
              },
              {
                id: '3',
                title: 'Abertura Virtuosa',
                description: 'Estabelece o ambiente e os personagens em um único take complexo.',
                details: 'Exemplo: "A Marca da Maldade" (1958)',
                image: '/images/amarcadamaldade.jpg'
              }
            ],
            slug: 'plano-sequencia'
          },
          {
            id: '3',
            title: 'Espetáculo e impacto sensorial',
            description: 'Estudo das primeiras formas cinematográficas e seu impacto sensorial.',
            mainImage: '/images/tomgunning.jpg',
            examples: [
              {
                id: '1',
                title: 'Atração Visual',
                description: 'Foco no impacto visual direto sobre o espectador.',
                details: 'Primeiros filmes dos irmãos Lumière',
                image: '/images/irmaoslumiere.jpg'
              },

              {
                id: '2',
                title: 'Cinema de Mágica',
                description: 'Uso de truques de câmera para criar ilusões e espetáculos.',
                details: 'Exemplo: "Viagem à Lua" (1902) de Georges Méliès',
                image: '/images/viagemalua.jpg'
              },
              {
                id: '3',
                title: 'O Espetáculo do Movimento',
                description: 'Ênfase na exibição do movimento e em gags visuais de impacto.',
                details: 'Exemplo: Filmes de perseguição do início do século',
                image: '/images/nosferatu.png'
              }
            ],
            slug: 'cinema-de-atracoes'
          }
        ]
      } catch (error ) {
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
          this.error = 'Morfologia não encontrada'
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