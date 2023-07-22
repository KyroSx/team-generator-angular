export interface Repository {
  id: string;
  name: string;
  url: string;
  language?: string;
  updated_at: string;
  private: boolean;
}

export interface Paginated<T> {
  items: T[];
  totalPages: number;
}

export enum Status {
  loading = 'LOADING',
  error = 'ERROR',
  success = 'SUCCESS',
  idle = 'IDLE',
}
