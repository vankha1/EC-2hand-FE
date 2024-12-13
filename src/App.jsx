import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-orange-500',
  default: 'bg-gray-500',
};

export default function App() {
  return (
    <>
      <Outlet />
      <ToastContainer
        toastClassName={(context) =>
          `${contextClass[context?.type || 'default']} 
          relative flex p-3 min-h-12 rounded-md justify-between overflow-hidden cursor-pointer`
        }
        bodyClassName={() => 'text-white font-medium block'}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
    </>
  );
}
