import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables, ChartData as ChartJsData, ChartDataset } from 'chart.js';
import { fetchProductData, createChartOptions } from "../../utilities/chartUtility";

Chart.register(...registerables);

interface Product {
  category: string;
  price: number;
  rating: {
    count: number;
  };
  title: string;
}

interface ChartData {
  labels: string[];
  datasets: (ChartDataset<'bar', number[]> | ChartDataset<'line', number[]>)[]; //Using union types for mixed datasets
  productTitles?: string[];
}

const fetchData = async (category?: string): Promise<ChartData> => {
  const productData: Product[] = await fetchProductData();

  const filteredData = category
    ? productData.filter((item) => item.category === category)
    : productData;

  return {
    labels: filteredData.map((item) => item.title.slice(0, 10) + ".."),
    datasets: [
      {
        type: "bar",
        label: "Price",
        data: filteredData.map((item) => item.price),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Count",
        data: filteredData.map((item) => item.rating.count),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
    productTitles: filteredData.map((item) => item.title),
  };
};


const ProductChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const options = createChartOptions("Product Prices and Ratings", chartData);

  const refreshData = async () => {
    try {
      const data = await fetchData(selectedCategory);
      setChartData(data);
    } catch (err) {
      console.log("Error fetching the data", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const productData: Product[] = await fetchProductData();
      const uniqueCategories = [...new Set(productData.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.log("Error fetching categories", err);
    }
  };

  useEffect(() => {

    fetchCategories();
  }, []);  //runs only on mount
  
  useEffect(() => {
  
    refreshData();
  }, [selectedCategory]);  //runs when selectedCategory changes
  

  return (
    <div className="w-[800px] mx-auto">
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value=""  className="bg-slate-100">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-100">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <Bar
        data={chartData as ChartJsData<"bar", number[]>}
        options={options}
      />
    </div>
  );
  
};

export default ProductChart;



// ['Fjallrven Backpack', 'Premium shirts', 'Cotton jacket', "Casual Shirts", 'John Hardy Chain Bracelet', 
//   'Gold Micropave', 'White Gold', 'Pierced Owl Rose', 'WD USB', 'SanDisk SSD 1TB', 'Sata III SSD', 
//   "Playstation 4 Hard Drive", "Acer SB 220Q", 'Samsung QLED Monitor', "BIYLACLESEN Snowboard Jacket", 
//   'Lock & Love Biker Jacket', "Women Rain Jacket", "MBJ Women Bot Neck", "Opna Shirt Sleeve", 'Danvoy Women T-shirt'
// ]