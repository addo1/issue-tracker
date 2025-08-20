import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Issue } from '../types';
import { Link } from 'react-router-dom';

export default function IssuesList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  const load = async () => {
    setError(null);
    try {
      const data = await api.listIssues();
      setIssues(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch');
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (issue: Issue) => {
    try {
      setBusy(issue.id);
      // optimistic update
      setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, status: i.status === 'open' ? 'closed' : 'open' } : i));
      await api.updateIssue(issue.id, { status: issue.status === 'open' ? 'closed' : 'open' });
    } catch (e) {
      // on error, reload truth from server
      await load();
      alert('Toggle failed');
    } finally {
      setBusy(null);
    }
  };

  const remove = async (issue: Issue) => {
    if (!confirm(`Delete "${issue.title}"?`)) return;
    try {
      setBusy(issue.id);
      // optimistic remove
      setIssues(prev => prev.filter(i => i.id !== issue.id));
      await api.deleteIssue(issue.id);
    } catch {
      await load();
      alert('Delete failed');
    } finally {
      setBusy(null);
    }
  };

  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Issues</h2>
      <Link to="/new">+ New Issue</Link>
      <ul>
        {issues.map(i => (
          <li key={i.id} style={{ marginBottom: 8 }}>
            <strong>[{i.status}]</strong> {i.title} — {i.description ?? ''}
            <div style={{ display: 'inline-flex', gap: 8, marginLeft: 12 }}>
              <button disabled={busy === i.id} onClick={() => toggle(i)}>
                {i.status === 'open' ? 'Close' : 'Reopen'}
              </button>
              <button disabled={busy === i.id} onClick={() => remove(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {issues.length === 0 && <p>No issues yet.</p>}
    </div>
  );
}
