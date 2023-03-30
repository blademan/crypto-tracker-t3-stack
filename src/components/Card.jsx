import { useEffect, useState } from "react";
import icon from "../../public/bookmark.svg";

const Card = ({
  current_price,
  name,
  symbol,
  image,
  high_24h,
  low_24h,
  market_cap_change_percentage_24h: perCent,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const coin = JSON.parse(localStorage.getItem(name));
    if (coin) {
      setIsFavorite(true);
    }
  }, []);

  const cardClass = isFavorite ? "favorite" : "";

  const addToFavorite = (e) => {
    e.preventDefault();
    const coin = {
      name,
      isFavorite: true,
    };
    const coinString = JSON.stringify(coin);
    localStorage.setItem(name, coinString);
    setIsFavorite(true);
  };

  const removeFromFavorite = (e) => {
    e.preventDefault();
    localStorage.removeItem(name);
    setIsFavorite(false);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorite(e);
    } else {
      addToFavorite(e);
    }
  };

  return (
    <li
      onClick={toggleFavorite}
      className={`card w-full cursor-pointer flex-wrap items-center justify-between gap-5 space-y-3 rounded-md bg-slate-800 from-indigo-500 via-blue-800 to-purple-800 p-3 text-gray-300 ring-1 ring-purple-500 hover:bg-gradient-to-r sm:flex   sm:space-y-0 md:px-5 md:py-3 ${cardClass}`}
    >
      <div className="flex items-center justify-between gap-2 md:gap-5">
        {isFavorite && <img src={icon.src} />}
        <div className="flex flex-1 items-center  gap-2 md:w-40">
          <img src={image} alt="" width={30} />
          <h3 className="text-sm">{name}</h3>
        </div>
        <div className="flex items-center gap-2  text-gray-400">
          <p className="uppercase">{symbol}</p>
          <p className="text-sm">${current_price}</p>
        </div>
      </div>
      <div className="flex  items-center gap-5">
        <p
          className={`${
            perCent > 0 ? "text-green-700" : "text-red-700"
          } flex-1 text-sm`}
        >
          {perCent}%
        </p>
        <div className="flex gap-2 sm:flex-col md:gap-3">
          <div className=" flex items-end justify-between gap-3   text-[10px]  sm:text-sm">
            <p className=" text-gray-500 ">High 24h</p>
            <p className="">${high_24h}</p>
          </div>
          <div className="flex items-end justify-between gap-3    text-[10px]  sm:text-sm">
            <p className=" text-gray-500">Low 24h</p>
            <p className="">${low_24h}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
