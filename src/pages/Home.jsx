import TableHeading from "../components/table/TableHeading";
import { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../api/api";
import { numberWithCommas } from "../utils/customFunction";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../components/context/CryptoContext";


const Home = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {currency} = CryptoState()
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setIsLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const headingData = ["Coin", "Current Price", "24H", "Market Cap"];

  return (
    <div className=" flex flex-col justify-center items-center py-8 bg-white">
      {isLoading && <h4>Loadig...</h4>}
      <div className="w-[90%] max-h-[600px] rounded-[13px]  overflow-x-auto overflow-y-auto scrollbar  bg-green-50 shadow-md text-sm">
      <table className=" w-full ">
        <TableHeading headingData={headingData} />
        
        <tbody>
          {coins?.slice((page - 1) * 10, (page - 1) * 10 + 10)?.map((row) => {
            const profit = row.price_change_percentage_24h > 0;
            return (
              <tr
                onClick={() => navigate(`/coins/${row.id}`)}
                key={row.name}
                className=" hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer"
              >
                <td className="md:h-16 sm:h-14 h-full sm:py-0 py-1 md:px-3 sm:px-2 px-1 flex items-center md:gap-3 gap-2">
                  <img
                    className="md:h-10 sm:h-8 h-6 rounded-full"
                    src={row.image}
                    alt={row.name}
                  />
                  <div>
                    <h2 className="uppercase font-semibold md:text-[16px] sm:text-sm text-xs">{row.symbol}</h2>
                    <h4 className="text-gray-500 lg:text-[16px] md:text-sm sm:text-xs text-[10px]">{row.name}</h4>
                  </div>
                </td>
                <td className="md:h-16 sm:h-14 h-full sm:py-0 py-1 md:px-3 sm:px-2 px-1 text-center lg:text-[18px] md:text-[16px] sm:text-[14px] text-xs">
                   {numberWithCommas(row.current_price.toFixed(2))}
                </td>
                <td
                  className={`md:h-16 sm:h-14 h-full sm:py-0 py-1 md:px-3 sm:px-2 px-1 text-center font-medium lg:text-[18px] md:text-[16px] sm:text-[14px] text-xs ${
                    profit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {profit && "+"}
                  {row.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="md:h-16 sm:h-14 h-full sm:py-0 py-1 md:px-3 sm:px-2 px-1 text-center lg:text-[18px] md:text-[16px] sm:text-[14px] text-xs">
                   {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
{!isLoading &&
      <Pagination page={page} setPage={setPage} showData={coins?.length / 10} />
      }
    </div>
  );
};

export default Home;
