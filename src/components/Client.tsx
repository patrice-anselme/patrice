import React, { useState } from "react";
import {useSearchStore} from './Zustand'

type Product = {
  id: number;
  name: string;
  price: number;
};

type ClientData = {
  id: number;
  name: string;
  contact: { email: string; phone: string };
  products: Product[];
  total: number;
};

const productsList: Product[] = [
  { id: 1, name: "PC Portable", price: 1200 },
  { id: 2, name: "Client Management App", price: 500 },
  { id: 3, name: "Guitare Acoustique", price: 800 },
];

const Client: React.FC = () => {
  const { searchTerm } = useSearchStore();
  const [clientName, setClientName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

 const [clients, setClients] = useState<ClientData[]>([
  {
    id: 1,
    name: "Jean Dupont",
    contact: "jean.dupont@example.com",
    products: [{ id: 1, name: "Abonnement Premium", price: 100 }],
    total: 100,
  },
  {
    id: 2,
    name: "Marie Leclerc",
    contact: "marie.leclerc@example.com",
    products: [{ id: 2, name: "Pack de formations avancées", price: 500 }],
    total: 500,
  },
]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const selectedProduct = productsList.find((p) => p.id === selectedProductId);
    if (selectedProduct && !selectedProducts.some((p) => p.id === selectedProductId)) {
      setSelectedProducts((prev) => [...prev, selectedProduct]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  const handleAddClient = () => {
    if (!clientName || !contact || selectedProducts.length === 0) {
      alert("Veuillez remplir tous les champs et sélectionner au moins un produit.");
      return;
    }

    const newClient: ClientData = {
      id: Date.now(),
      name: clientName,
      contact,
      products: selectedProducts,
      total: totalPrice,
    };

    setClients((prev) => [...prev, newClient]);
    setClientName("");
    setContact("");
    setSelectedProducts([]);
    setSelectedProductId(null);
  };
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Gestion des Clients</h1>

      {/* Formulaire pour ajouter un client */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Nom du client</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Entrez le nom du client"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Contact</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Entrez le contact"
        />
      </div>

      {/* Sélection des produits */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Produits</label>
        <div className="flex items-center space-x-2">
          <select
            value={selectedProductId ?? ""}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="" disabled>
              Sélectionnez un produit
            </option>
            {productsList.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price}€
              </option>
            ))}
          </select>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste des produits sélectionnés */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Produits Sélectionnés</h3>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id} className="flex justify-between items-center">
              <span>
                {product.name} - {product.price}€
              </span>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-bold mt-2">Total: {totalPrice}€</h3>
      </div>

      {/* Ajouter le client */}
      <div className="mt-4">
        <button
          onClick={handleAddClient}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter Client
        </button>
      </div>

      {/* Tableau des clients */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Liste des Clients</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
              <th className="border border-gray-300 px-4 py-2">Produits</th>
              <th className="border border-gray-300 px-4 py-2">Total (€)</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{client.name}</td>
                <td className="border border-gray-300 px-4 py-2">{client.contact}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {client.products.map((product) => product.name).join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">
                  {client.total}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;
