
import { Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Client from './components/Client';
import Layout from './components/Layout';
import Store from './components/Store'
function App() {
  return (
    <Routes>
    <Route path="/" element={<AuthForm />} />
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<Layout/>} /> {/* Par défaut, on affiche un message ou un autre contenu pour le Dashboard */}
      <Route path="client" element={<Client />} />
      <Route path="product" element={<Product />} />
      <Route path='store' element={<Store/>} />
    </Route>
  </Routes>
  );
}

export default App;
