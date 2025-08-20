import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <header style={{display:'flex', gap:12, alignItems:'center', marginBottom:16}}>
        <h1 style={{marginRight:'auto'}}>Issue Tracker</h1>
        <Link to="/">Issues</Link>
        <Link to="/new">New</Link>
      </header>
      <Outlet />
    </div>
  );
}
