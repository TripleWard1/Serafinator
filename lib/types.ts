export interface Joke {
  id: string;
  text: string;
  category: string;
  date: string;
  location: string;
  audienceSize: number;
  reaction: 'Risos' | 'Sopro' | 'Silêncio' | 'Vaiado' | 'Aplauso Irónico';
  cringeLevel: number; // 0-10
  dryMeter: number; // 0-10
  tags: string[];
  registeredBy?: string;
  isFavorite: boolean;
}
