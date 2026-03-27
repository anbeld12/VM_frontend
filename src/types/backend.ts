export interface News {
  id: string;
  source: string;
  title: string;
  original_url: string;
  published_date: string;
  scraped_date: string;
  content?: string;
}

export interface PendingNewsResponse {
  news: News[];
  total: number;
  page: number;
  size: number;
}
