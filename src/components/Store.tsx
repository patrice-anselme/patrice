// // import React, { useState } from 'react'
// // import ProductModal from './ProductModal'
// // import { createPortal } from 'react-dom';

// // export default function Store() {
// //     const[showModal,setShowModal]=useState(false);
// //     function handleClick(){
// //         setShowModal(true)
// //     }

// //   return (
// //     <>
// //       <button 
// //         onClick={handleClick} 
// //         className='mb-4 bg-blue-500 rounded-lg text-white font-semibold p-1'
// //       >
// //         Open Modal
// //       </button>

// //       {showModal && createPortal(
// //         <div>
// //           <ProductModal />
// //         </div>,
// //         document.body
// //       )}
// //     </>
// //   );
// // }

// import React, { useState } from 'react';
// import ProductModal from './ProductModal';
// import { createPortal } from 'react-dom';

// export default function Store() {
//   const [showModal, setShowModal] = useState(false);
//   const[image,setImage]=useState();
  
//   function handleClick() {
//     setShowModal(true);
//   }

//   function onChange(e){
//     const file=e.target.files[0];
//     const data=new FileReader();
//     data.addEventListener('load',()=>{
//        setImage(data.result);
//     } )
//     data.readAsDataURL(file);
//      }
//   return (
//     <>
//       <button 
//         onClick={handleClick} 
//         className='mb-4 bg-blue-500 rounded-lg text-white font-semibold p-1'
//       >
//         Open Modal
//       </button>
//       <img src={image} alt='image' style={{width:'70px',height:'70px'}}/>
//       {/* Affichage de la modal seulement si showModal est true */}
//       {showModal && createPortal(

//         <ProductModal add={onChange} onClose={() => setShowModal(false)} />, // Ajout de la fonction de fermeture
//         document.body
//       )}
       
//     </>
//   );
// }
// import React, { useState } from 'react';
// import ProductModal from './ProductModal';
// import { createPortal } from 'react-dom';

// export default function Store() {
//   const [showModal, setShowModal] = useState(false);
//   const [image, setImage] = useState(null);

//   function handleClick() {
//     setShowModal(true);
//   }

//   function handleAddImage(file) {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result); // Stocke l'image en base64
//       };
//       reader.readAsDataURL(file);
//     }
//     setShowModal(false); // Ferme la modal après avoir ajouté l'image
//   }

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className="mb-4 bg-blue-500 rounded-lg text-white font-semibold p-1"
//       >
//         Open Modal
//       </button>

//       {/* Affichage de l'image seulement si elle est définie */}
//       {image && (
//         <img
//           src={image}
//           alt="Prévisualisation"
//           style={{ width: '70px', height: '70px' }}
//           className="my-4"
//         />
//       )}

//       {/* Affichage de la modal */}
//       {showModal &&
//         createPortal(
//           <ProductModal
//             add={handleAddImage}
//             onClose={() => setShowModal(false)}
//           />,
//           document.body
//         )}
//     </>
//   );
// }
import React, { useState } from "react";
import { useSearchStore } from './Zustand'

type StoreData = {
  id: number;
  name: string;
  address: string;
  contact: { email: string; phone: string };
};

const StoreManagement: React.FC = () => {
  const { searchTerm } = useSearchStore();
  const [storeName, setStoreName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const [stores, setStores] = useState<StoreData[]>([
    {
      id: 1,
      name: "Magasin A",
      address: "123 Rue de Paris",
      contact: { email: "contact@magasina.com", phone: "01 23 45 67 89" },
    },
    {
      id: 2,
      name: "Magasin B",
      address: "456 Avenue de Lyon",
      contact: { email: "contact@magasinb.com", phone: "01 98 76 54 32" },
    },
  ]);

  const handleAddStore = () => {
    if (!storeName || !address || !contact) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newStore: StoreData = {
      id: Date.now(),
      name: storeName,
      address,
      contact: { email: contact, phone: "" }, 
    };

    setStores((prev) => [...prev, newStore]);
    setStoreName("");
    setAddress("");
    setContact("");
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Gestion des Magasins</h1>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Nom du magasin</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Entrez le nom du magasin"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Adresse</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Entrez l'adresse"
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
      <div className="mt-4">
        <button
          onClick={handleAddStore}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter Magasin
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Liste des Magasins</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Adresse</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{store.name}</td>
                <td className="border border-gray-300 px-4 py-2">{store.address}</td>
                <td className="border border-gray-300 px-4 py-2">{store.contact.email} - {store.contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreManagement;
