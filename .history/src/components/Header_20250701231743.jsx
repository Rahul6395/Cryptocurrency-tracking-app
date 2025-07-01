import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { CurrencyList } from "../api/api";
import { CryptoState } from "./context/CryptoContext";



const Header = () => {
  const [hambergerMenu, setHambergerMenu] = useState(false);
  const [currencyList,setCurrencyList] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const {currency,setCurrency} = CryptoState();
  const fetchCoins = async () => {
    setIsLoading(true);
    const { data } = await axios.get(CurrencyList());
    setCurrencyList(data);
    setIsLoading(false);
  };



  useEffect(() => {
    fetchCoins();
  }, []);

  const data = [
    {
      id: "1254ythgf",
      linkName: "Home",
      linkpath: "/",
    },

  ];

 



  return (
    <div
      className={`${ 
     "relative"
      }`}
    >
      <div className="flex    relative z-50 lg:gap-[3vmax] md:gap-[30px] justify-between items-center xl:px-[45px] lg:px-[30px] md:px-[25px] ssm:px-4 px-4 xl:py-5 lg:py-4 md:py-3 sm:py-3 py-3 xl:pb-6 lg:pb-5 bg-blue-950">
        <div className="flex justify-center items-center">
          <h1 className="font-bold xl:text-h1 lg:text-[25px] sm:text-h2 text-h3 md:leading-[31.5px] sm:leading-[22px] leading-[18px] text-white">
            Crypto
          </h1>
        </div>

        <div className="lg:flex hidden items-center xl:gap-[25px] lg:gap-[20px] gap-[15px]">
          {data.map((link) => (
            <NavLink
            key={link.linkName}
              to={link.linkpath}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white font-medium"
                    : "text-[#444444]  font-light  dark:text-white"
                }  xl:text-[18px] lg:text-[16px] text-[14px] leading-[22.5px]`
              }
            >
              {link.linkName}
            </NavLink>
          ))}
        </div>
<div className="flex gap-3">
       <select

        value={currency}
        onChange={(e)=>setCurrency(e.target.value)}
        className="block w-[150px] text-white px-1 md:py-2 sm:py-1 uppercase border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {currency == "INR" && (
          <option value="">{ currency}</option>
        )}
      {currencyList.map((cur)=>(
 <option value={cur} key={cur} className="uppercase text-[#444444]">{cur}</option>
      ))}
       
      </select>

        <div className="lg:hidden flex items-center md:gap-x-3 sm:gap-x-2 gap-x-1">
          <div
            onClick={() => setHambergerMenu(!hambergerMenu)}
            className="group h-fit  flex sm:p-1 px-[3px] py-[2px] border border-border_light rounded-md ham"
          >
            <GiHamburgerMenu className="sm:text-h2 text-[18px] dark:text-white text-text_444444 group-hover:text-btn" />
          </div>
        </div>
        </div>
      </div>
      <div
        className={`h-dvh lg:hidden overflow-y-auto flex flex-col sm:py-3 py-2 w-full dark:bg-dark_bg bg-gray-500 absolute z-20 transition-all duration-300 ${
          !hambergerMenu ? "translate-y-[-100vh]" : "translate-y-[0]"
        } `}
      >
        {data.map((link) => (
          <div onClick={() => setHambergerMenu(false)} key={link.id}>
            <NavLink
             key={link.linkpath}
              to={link.linkpath}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-[#ffff] bg-btn font-medium"
                    : "text-[#444444] dark:bg-dark_bg bg-[#F6F6F6] font-light"
                }  md:px-5  px-4 md:py-[6px] py-1 dark:text-white  flex justify-start items-center font-[outfit] xl:text-h3 lg:text-[16px] text-h4 leading-[22.5px]`
              }
            >
              {link.linkName}
            </NavLink>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Header;
