export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface NavbarItem {
  name: string;
  path: string;
}

interface Identifiable {
  id: number; // Padronizado como number
}

// ...outras interfaces como Interview, Category, Role, Character, Work...

export interface Morphology extends Identifiable {
  title: string;
  subtitle?: string;
  description?: string;
  influence: string;
  influenceDescription?: string;
  examples?: MorphologyExample[];
  slug: string;
  image: string; // Imagem para o card da página principal
}

export type MorphologyExample = Pick<
  Morphology,
  "id" | "title" | "description"
> & {
  details: string;
};

// Interface RelatedContent unificada e corrigida
export interface RelatedContent extends Identifiable {
  title: string;
  description: string;
  type: "article" | "interview" | "analysis";
  image?: string;
  path: string;
}

// ...outras interfaces como Physiology, TeamMember...