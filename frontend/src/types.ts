export type Issue = {
  id: number;
  title: string;
  description?: string | null;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
};
