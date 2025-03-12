
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css"
import vente from '../assets/vente.png'
import { useNavigate } from "react-router-dom";
import notification from '../assets/notification.svg'
import message from '../assets/message.svg'
import user from '../assets/user.svg'
import {useSearchStore} from './Zustand'
// import dashboard from '../assets/dashboard.svg'
// import client from '../assets/client.svg'
// import product from '../assets/product.svg'
import search from '../assets/search.svg'
function Dashboard() {
    const { searchTerm, setSearchTerm } = useSearchStore();
  const navigate = useNavigate();
        return (
            
            <div className="flex min-h-screen bg-gray-100">

                {/* Aside */}
                {/* <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col h-screen"> */}

                <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col min-h-screen">

                    <div className="p-4 text-xl font-bold border-b border-gray-700 flex justify-center items-center">
                        <div>
                            <img className="rounded-full w-24 h-24 " src={vente} alt="logo" />
                        </div>
                    </div>
                    <nav className="flex-1 mt-4">
                        <ul className="space-y-2">
                            <li>
                                <Link className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700" to="/dashboard">
                                <svg className="w-6 h-6 stroke-white " viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-2">Dashboard</span>
                                </Link> 
                            </li>
                            <li>
                                <Link className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700" to="/dashboard/client">
                                    {/* <img className="w-5 h-5" src={client} alt="" /> */}
                                    <svg className="stroke-white w-6 h-6 fill-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>
                                        <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"/>
                                    </svg>
                                    <span className="ml-2">Client</span>
                                </Link> 
                            </li>
                            <li>
                                <Link className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700" to="/dashboard/product">
                                    {/* <img className="w-5 h-5" src={product} alt="" />   */}
                                    <svg className="w-6 h-6 stroke-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M48 0H0V48H48V0Z"  fill-opacity="0.01"/>
                                       <path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" stroke-width="4" stroke-linejoin="round"/>
                                       <path d="M4 14L24 24"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                       <path d="M24 44V24"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                       <path d="M44 14L24 24"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                       <path d="M34 9L14 19"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span className="ml-2">Product</span>
                                </Link> 
                            </li>
                            <li>
                                <Link className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700" to="/dashboard/Store">
                                    <svg className="w-6 h-6 fill-white"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5 9.5V13H8V9.5H11.5Z"/>
                                        <path d="M11.5 17.5V14H8V17.5H11.5Z"/>
                                        <path d="M16 9.5V13H12.5V9.5H16Z"/>
                                        <path d="M16 17.5V14H12.5V17.5H16Z"/>
                                        <path d="M8 6V3.75C8 2.7835 8.7835 2 9.75 2H14.25C15.2165 2 16 2.7835 16 3.75V6H21.25C21.6642 6 22 6.33579 22 6.75V18.25C22 19.7688 20.7688 21 19.25 21H4.75C3.23122 21 2 19.7688 2 18.25V6.75C2 6.33579 2.33579 6 2.75 6H8ZM9.5 3.75V6H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H9.75C9.61193 3.5 9.5 3.61193 9.5 3.75ZM3.5 18.25C3.5 18.9404 4.05964 19.5 4.75 19.5H19.25C19.9404 19.5 20.5 18.9404 20.5 18.25V7.5H3.5V18.25Z"/>
                                    </svg>
                                    <span className="ml-2">Store</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
    
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white shadow p-4 flex justify-between items-center ">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <div className="inline-flex border border-gray-300 rounded-lg space-x-2">
                                <img className=" flex w-5 h-5 mt-1" src={search} alt="" />
                            <input  
                            type="text" 
                            placeholder="Rechercher..." 
                            className=" items-center flex-1 outline-none py-1"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            </div>
                            
                            
                         <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                               
                                    <img className="w-5 h-5" src={notification} alt="" />
                                
                            </button>
                            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                 <img className="w-5 h-5" src={message} alt="" />
                            </button>
                            <button onClick={() => navigate("/")} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                            <img className="w-5 h-5" src={user} alt="" />
                            </button>
                        </div>
                    </header>
    
                    {/* Content Area */}
                    <main className="flex-1 p-4">
                         <Outlet />
                    </main>
                </div>
            </div>
        );
    };

export default Dashboard;
