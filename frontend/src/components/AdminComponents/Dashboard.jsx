import { useFetch } from "@/utils/hooks/useFetch";
import { useEffect, useState } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const Dashboard = () => {
  const [productsAvailable, setProductsAvailable] = useState(0);
  const [usersAvailable, setUsersAvailable] = useState(0);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const fetchProductsAvailable = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/charts/productsavailable`
  );
  const fetchUsersAvailable = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/charts/usersavailable`
  );
  const fetchProductsByCategory = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/charts/productsbycategory`
  );

  useEffect(() => {
    if (
      !fetchProductsAvailable.loading &&
      !fetchProductsAvailable.error &&
      fetchProductsAvailable.data
    ) {
      setProductsAvailable(fetchProductsAvailable.data.result[0].products);
    }
    if (
      !fetchUsersAvailable.loading &&
      !fetchUsersAvailable.error &&
      fetchUsersAvailable.data
    ) {
      setUsersAvailable(fetchUsersAvailable.data.users);
    }
    if (
      !fetchProductsByCategory.loading &&
      !fetchProductsByCategory.error &&
      fetchProductsByCategory.data
    ) {
      setProductsByCategory(fetchProductsByCategory.data.result);
    }
  }, [fetchProductsAvailable, fetchUsersAvailable, fetchProductsByCategory]);

  useEffect(() => {
    if (productsByCategory.length > 0) {
      const chartDom = document.getElementById("productsByCategoryChart");
      const myChart = echarts.init(chartDom);

      const categories = productsByCategory.map((item) => item._id);
      const categoryCount = productsByCategory.map((item) => item.products);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: categories,
          axisLabel: {
            color: "#6b6b6b",
            fontSize: 12,
            fontWeight: "bold",
          },
          axisLine: {
            lineStyle: {
              color: "transparent",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            name: "Products",
            type: "bar",
            barWidth: "12%",
            data: categoryCount,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff7f7f" },
                { offset: 1, color: "#e65c5c" },
              ]),
              borderRadius: [10, 10, 5, 5],
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#e65c5c" },
                  { offset: 1, color: "#ff7f7f" },
                ]),
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [productsByCategory]);

  return (
    <div className="flex flex-col items-center w-full h-5/6 p-8 mt-2 ml-2 space-y-8 rounded-lg shadow-lg transition-all">
      <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>

      <div className="flex items-center justify-evenly gap-6 w-full max-w-6xl">
        <div className="p-6 w-1/3 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">
            Products Available
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {productsAvailable}
          </p>
        </div>

        <div className="p-6 w-1/3 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">
            Users Available
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {usersAvailable}
          </p>
        </div>
        <div className="p-6 w-1/3 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">97,000$</p>
        </div>
      </div>

      <div className=" w-7/12">
        <div className=" bg-white rounded-lg shadow-md w-5/5 ">
          <h2 className="text-lg font-semibold text-gray-900 p-6 border-b">
            Products by Category
          </h2>
          <div
            id="productsByCategoryChart"
            className="p-6 min-h-96 min-w-96"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
