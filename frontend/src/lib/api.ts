const API = import.meta.env.VITE_API_URL as string; // or '' if you use the Vite proxy

async function request<T>(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export const api = {
  listIssues: () => request<import('../types').Issue[]>('/issues'),
  createIssue: (data: { title: string; description?: string }) =>
    request<import('../types').Issue>('/issues', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateIssue: (id: number, data: Partial<{ title: string; description?: string; status: 'open' | 'closed' }>) =>
    request<import('../types').Issue>(`/issues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  deleteIssue: (id: number) =>
    request<import('../types').Issue>(`/issues/${id}`, { method: 'DELETE' }),
};
