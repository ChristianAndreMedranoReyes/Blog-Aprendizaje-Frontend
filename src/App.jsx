import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/auth/Auth.jsx';
import PostPage from './pages/post/postPage.jsx';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Layout>
  );
}
