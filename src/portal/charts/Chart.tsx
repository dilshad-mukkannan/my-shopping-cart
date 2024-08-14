import ProductChart from './ProductChart';
import CategoryChart from './CategoryChart';
import { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";


const Chart:React.FC = () => {

    const [flick, setFlick] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-screen p-5">
        <div className="flex flex-col items-center justify-center gap-8">
          {flick ? (
            <div className="border p-5 rounded-lg shadow-2xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 w-full transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...">
              <ProductChart />
            </div>
          ) : (
            <div className="border p-5 rounded-lg shadow-2xl bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 w-full transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...">
              <CategoryChart />
            </div>
          )}
        </div>
        <div className="ml-4">
          <button
            onClick={() => setFlick(!flick)}
            className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors"
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chart;