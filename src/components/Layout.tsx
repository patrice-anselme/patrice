import  { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

import pc from "../assets/produit/pc1.jpeg";
import phone from "../assets/produit/phone.jpeg";
import usb from "../assets/produit/usb.jpeg";
import clavier from "../assets/produit/clavier.jpg";

type Vente = {
  id: number;
  name: string;
  price: number;
  image: string;
};
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function Layout() {
  const [vente, setVente] = useState<Vente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getPhoto = (PhotoName: string) => {
    const imageMap: { [key: string]: string } = {
      pc: pc,
      phone: phone,
      clavier: clavier,
      usb: usb,
    };
    return imageMap[PhotoName] || "vide";
  };
  const fetchVente = async () => {
    try {
      const response = await fetch("http://localhost:3002/vente");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Vente[] = await response.json();
      setVente(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVente();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const pieChartData = {
    labels: vente.map((v) => v.name),
    datasets: [
      {
        label: "Répartition des produits",
        data: vente.map((v) => v.price),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8"],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };
  const barChartData = {
    labels: vente.map((v) => v.name),
    datasets: [
      {
        label: "Total des ventes (€)",
        data: vente.map((v) => v.price),
        backgroundColor: "#4285F4",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard - Top Ventes & Produits</h1>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-24">

        <div className="w-1/2 h-64">
          <h2 className="text-xl font-bold mb-2">Top Ventes</h2>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: { title: { display: true, text: "Produits" } },
                y: { title: { display: true, text: "Ventes (€)" } },
              },
            }}
          />
        </div>

  
        <div className="w-auto md:w-1/2 h-64">
          <h2 className="text-xl font-bold mb-2">Répartition des Produits</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right" },
              },
            }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-8">
        {vente.map((ventes) => (
          <div key={ventes.id} className="border border-gray-300 rounded-lg p-4 shadow-lg">
            <img
              src={getPhoto(ventes.image)}
              alt={ventes.name}
              className="w-auto h-32 object-cover rounded-lg"
            />
            <div className="flex justify-between w-auto pl-2 mt-2">
              <p className="text-lg font-semibold text-gray-500">A partir {ventes.price} </p>
              <p className="bg-red-600 text-white rounded-tl-lg px-2">Ar</p>
            </div>
            <div className="flex justify-between w-full pl-2 mt-2">
              <p>{ventes.name}</p>
              <div className="w-0 h-0 border-l-[60px] border-l-transparent border-b-[25px] border-b-gray-400"></div>
            </div>
            {/* <div className="mt-2">
              <p className="text-sm font-medium">{ventes.name}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
