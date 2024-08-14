import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables, ChartData as ChartJsData, ChartDataset } from "chart.js";
import { fetchProductData, createChartOptions } from "../../utilities/chartUtility";

Chart.register(...registerables);

interface Product {
  category: string;
  rating: {
    count: number;
    rate: number;
  };
}

interface CategoryData {
  category: string;
  avgCount: number;
  avgRate: number;
  normCount: number; // Ensure this is included
  normRate: number;  // Ensure this is included
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset<'radar', number[]>[]; // Adjusted type
}

const fetchData = async (): Promise<ChartData> => {
  const productData: Product[] = await fetchProductData();

  const categories = [...new Set(productData.map((item) => item.category))];

  let categoryData: CategoryData[] = categories.map((category) => {
    let countSum = 0, rateSum = 0, productCount = 0;

    productData.forEach((product) => {
      if (product.category === category) {
        countSum += product.rating.count;
        rateSum += product.rating.rate;
        productCount += 1;
      }
    });

    return {
      category,
      avgCount: productCount > 0 ? countSum / productCount : 0,
      avgRate: productCount > 0 ? rateSum / productCount : 0,
      normCount: 0, // Placeholder, will be updated later
      normRate: 0,  // Placeholder, will be updated later
    };
  });

  const maxCount = Math.max(...categoryData.map((item) => item.avgCount));
  const maxRate = Math.max(...categoryData.map((item) => item.avgRate));

  categoryData = categoryData.map((item) => ({
    ...item,
    normCount: maxCount > 0 ? item.avgCount / maxCount : 0,
    normRate: maxRate > 0 ? item.avgRate / maxRate : 0,
  }));

  return {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Normalized Average Rate",
        data: categoryData.map((item) => item.normRate),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Normalized Average Count",
        data: categoryData.map((item) => item.normCount),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
};

const CategoryChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const options = createChartOptions("Category-wise Normalized Ratings and Counts");

  const refreshData = async () => {
    try {
      const data = await fetchData();
      setChartData(data);
    } catch (err) {
      console.log("Error fetching the data", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);
 
  return (
    <div className="w-[600px] mx-auto">
      <Radar data={chartData as unknown as ChartJsData<'radar', number[]>} options={options} />
      {/* <button onClick={refreshData}>Refresh Chart</button> */}
    </div>
  );
};

export default CategoryChart;
