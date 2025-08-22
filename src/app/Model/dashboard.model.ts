export interface GameLengthCategory {
  average: string;
  leisure: string;
  median: string;
  polled: number;
  rushed: string;
}

export interface GameLength {
  overall: GameLengthCategory;
  completionist: GameLengthCategory;
  main_extras: GameLengthCategory;
  main: GameLengthCategory;
}

export interface GameRelease {
  console: string;
  rating: string;
  year: number;
}

export interface GameMetrics {
  score: number;
  sales: number;
  used_price: number;
}

export interface GameMetadata {
  genre: string;
  publisher: string;
  isSequel?: boolean;
}

export interface GameModel {
  id: string;
  cover: string;
  description_de: string;
  description_en: string;
  title: string;
  metadata: GameMetadata;
  metrics: GameMetrics;
  release: GameRelease;
  length: GameLength;
}
