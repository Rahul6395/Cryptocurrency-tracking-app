import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../components/context/CryptoContext";
import { SingleCoin } from "../api/api";
import axios from "axios";
import CoinGraph from "../components/CoinGraph";
import parse from "html-react-parser";
import { numberWithCommas } from "../utils/customFunction";

const CoinDetails = () => {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { currency } = CryptoState();

  const fetchCoin = async () => {
    setIsLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoinDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(coinDetails);
  return (
    <div className="flex md:flex-row flex-col md:h-[90vh] justify-center items-center bg-green-50">
      <div className="md:w-[30%] w-full h-full flex flex-col gap-5 items-center justify-center mt-5 border-r-2 border-[#d6d6d6]">
        <img
          className=" lg:h-50 md:h-44 sm:h-38 h-30 "
          src={coinDetails?.image?.large}
          alt={coinDetails?.name}
        />
        <h3 className="font-bold ">{coinDetails?.name}</h3>
        <p className="lg:px-5 md:px-4 px-3 text-justify">
          {coinDetails?.description?.en
            ? parse(coinDetails.description.en.split(". ")[0])
            : "No description available."}
        </p>
        <div className="flex flex-col  md:items-start p-5 pt-2">
          <div className="flex gap-2">
            <span className="inline-block md:text-lg"> Rank: </span>
            <span className="inline-block md:text-lg font-bold">{coinDetails?.market_cap_rank}</span>
          </div>
          <div className="flex gap-2">
            <span className="inline-block md:text-lg "> Current Price: </span>
            <span className="inline-block md:text-lg font-bold">
              {numberWithCommas(
                coinDetails?.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </div>
        </div>
      </div>
      <CoinGraph coin={coinDetails?.id} />
    </div>
  );
};

export default CoinDetails;
