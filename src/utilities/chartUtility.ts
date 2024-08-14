import axios from "axios";
import { Product } from "../types/Product";


export const fetchProductData = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return response.data;
};

export const createChartOptions = (title: string, chartData?:any) => ({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
         callbacks: chartData ?{
          label: (context: any) => {
            const title = chartData.productTitles ? chartData.productTitles[context.dataIndex] : "";
            const value = context.dataset.data[context.dataIndex];
            return `${title}: ${value}`;
          },
        }: {},
      },
    },
  });