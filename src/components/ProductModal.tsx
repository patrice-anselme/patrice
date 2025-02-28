// import React from 'react'
// import { useState } from 'react'
// export default function ProductModal({onClose,add}) {
//   return (
//     <>
//       <div className='flex fixed items-center justify-center bg-gray-500/75 inset-0 w-full h-screen'>
//         <div className='border w-70 bg-white rounded-lg p-4' >
//           <p>ceci est un modeal</p>
//           {/* <label htmlFor="">image</label> */}
          
//           <input type="file" onChange={add} />
//           <button onChange={add} className='bg-blue-400 rounded-sm p-2 '>Ajouter</button>
//           <button onClick={onClose} className='bg-blue-400 rounded-sm p-2 ml-4'>fermer</button>
//         </div>
//       </div>
//     </>


//   )
// }



import React, { useState } from 'react';

export default function ProductModal({ onClose, add }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleAddClick() {
    if (selectedFile) {
      add(selectedFile); 
    }
  }

  return (
    <>
      <div className="flex fixed items-center justify-center bg-gray-500/75 inset-0 w-full h-screen">
        <div className="border w-70 bg-white rounded-lg p-4">
          <p>Ceci est un modal</p>
          <label htmlFor="fileInput">Sélectionner une image</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="block my-2"
          />

          
          <button onClick={handleAddClick} className="bg-blue-400 rounded-sm p-2">
            Ajouter
          </button>
          
          <button onClick={onClose} className="bg-blue-400 rounded-sm p-2 ml-4">
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

