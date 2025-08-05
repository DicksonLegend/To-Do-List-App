import React from 'react';
import './App.css';
import { Layout } from './components';
import { TodoList } from './pages';

const App: React.FC = () => {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default App;
