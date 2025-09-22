import { defineStore } from "pinia";
import { Mock } from "~/services/mock-data";
import type { Physiology, Work, LoadingState } from "~/types";

interface PhysiologyState extends LoadingState {
  physiologies: Physiology[];
  currentPhysiology: Physiology | null;
}
export const usePhysiologyStore = defineStore("physiology", {
  state: (): PhysiologyState => ({
    physiologies: [],
    currentPhysiology: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    getPhysiologyBySlug: (state) => {
      return (slug: string): Physiology | undefined => {
        return state.physiologies.find(
          (physiology) => physiology.slug === slug
        );
      };
    },

    getAllPhysiologies: (state): Physiology[] => {
      return state.physiologies;
    },
  },

  actions: {
    async fetchPhysiologies(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulando chamada de API
        await new Promise((resolve) => setTimeout(resolve, 450));

        this.physiologies = Mock.physiologies();
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erro ao carregar fisiologias";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPhysiologyBySlug(slug: string): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        // Se já temos as fisiologias carregadas, buscar localmente
        if (this.physiologies.length === 0) {
          await this.fetchPhysiologies();
        }

        const physiology = this.getPhysiologyBySlug(slug);
        if (physiology) {
          this.currentPhysiology = physiology;
        } else {
          this.error = "Fisiologia não encontrada";
        }
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Erro ao carregar fisiologia";
      } finally {
        this.isLoading = false;
      }
    },

    setCurrentPhysiology(physiology: Physiology | null): void {
      this.currentPhysiology = physiology;
    },

    clearError(): void {
      this.error = null;
    },
  },
});
