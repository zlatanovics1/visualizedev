export interface NewsData {
  id: number;
  title: string;
  text: string;
  url: string;
  image: string;
  publish_date: string;
  author: string;
  authors?: string[];
  language: string;
  source_country: string;
  sentiment?: number;
}
