import { useEffect, useRef, useState } from 'react';
import { CryptoState } from './context/CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../api/api';
import Chart from 'chart.js/auto';
import { chartDays } from './table/config/chartDays';

function CoinGraph({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchData = async () => {
    const { data } = await axios.get(HistoricalChart(coin, days, currency));
    setHistoricalData(data?.prices);
  };

  useEffect(() => {
    fetchData();
  }, [currency, days]);

  useEffect(() => {
    if (!historicalData || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: historicalData.map((coin) => coin[1]),
            label: `Price (Past ${days} Days) in ${currency}`,
            borderColor: '#EEBC1D',
            fill: false,
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 1,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [historicalData, currency, days]);

  if (!historicalData) return <h1>Loading...</h1>;

  return (
    <div className="md:w-[75%] w-full flex flex-col  border-[#d6d6d6] items-center justify-center md:mt-5 sm:mt-3 mt-2 lg:p-8 d:p-6 p-4">
      <canvas ref={chartRef} />

      <div className="flex sm:flex-nowrap flex-wrap mt-7 sm:gap-0 gap-2 justify-around w-full">
       {
        chartDays?.map(day=>(
            <button key={day.value} onClick={()=>setDays(day.value)} className={`lg:px-2 lg:w-[120px] md:w-[90px] sm:w-[100px] w-[90px] sm:py-1 py-[2px] sm:text-[16px] text-[14px] rounded-md ${day.value == days?"bg-yellow-700 text-white":"bg-amber-500"}`}>{day.label}</button>
        ))
       }
      </div>
    </div>
  );
}

export default CoinGraph;
