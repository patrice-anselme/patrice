import React, { useState} from "react";
import { createPortal } from "react-dom";
import pc from "../assets/produit/pc1.jpeg";
import batterie from "../assets/produit/batterie.jpeg";
import clavier from "../assets/produit/clavier.jpg";
import {useSearchStore} from './Zustand'

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
};

const Products: React.FC = () => {
  const { searchTerm } = useSearchStore();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "PC Portable",
      type: "Electronics",
      price: 1200,
      image: "pc",
    },
    {
      id: 2,
      name: "Clavier",
      type: "peripherique",
      price: 500,
      image: "clavier",
    },
    {
      id: 3,
      name: "baterie",
      type: "Music",
      price: 800,
      image: "batterie",
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
  });
  // const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrer les produits en fonction du terme de recherche
  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const getImage = (imageName: string) => {
    const imageMap: { [key: string]: string } = {
      pc: pc,
      batterie: batterie,
      clavier: clavier,
    };
    return imageMap[imageName] || imageName;
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setNewProduct({ name: "", type: "", price: "", image: "" });
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.type && newProduct.price) {
      setProducts((prev:any) => [
        ...prev,
        { ...newProduct, id: Date.now() },
      ]);
      closeModal();
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div>
      <h1 className="text-2xl font-bold text-center p-4">Liste des Produits</h1>
      <div className="inline-flex justify-end w-full p-4">
        <button
          className="flex p-2 bg-blue-400 rounded-lg text-white hover:bg-blue-500"
          onClick={openModal}
        >
          Create
        </button>
      </div>

      {/* Barre de recherche */}
      {/* <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      <div className="product-table p-4 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Prix</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts .map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={getImage(product.image)}
                    alt={product.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.type}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-green-500 font-semibold">
                  {product.price}Ar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 backdrop-opacity-10">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4">Ajouter un produit</h3>
              <form onSubmit={addProduct}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Entrez le nom du produit"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Entrez le type de produit"
                    value={newProduct.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Entrez le prix"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {newProduct.image && (
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="w-16 h-16 mt-2 object-cover"
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Products;
