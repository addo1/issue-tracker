import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import IssuesList from './pages/IssuesList';
import NewIssue from './pages/NewIssue';

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <IssuesList /> },
    { path: 'new', element: <NewIssue /> },
  ]},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
