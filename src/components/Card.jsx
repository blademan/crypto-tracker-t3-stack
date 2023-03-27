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
  // If i click on card add coin to favorites
  // If i click on card again remove coin from favorites
  // If i click on card again add coin to favorites
  useEffect(() => {
    const coin = JSON.parse(localStorage.getItem(name));
    if (coin) {
      setIsFavorite(true);
    }
  }, []);

  const addToFavorite = (e) => {
    e.preventDefault();

    const coin = {
      name,
      symbol,
      image,
      current_price,
      perCent,
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
      className="flex w-full cursor-pointer items-center justify-between gap-5 rounded-md bg-slate-800 from-indigo-500 via-blue-800 to-purple-800 p-3 text-gray-300 ring-1 ring-purple-500   hover:bg-gradient-to-r md:px-5 md:py-3"
    >
      {isFavorite && <img src={icon.src} />}
      <div className="flex w-28 items-center gap-2">
        <img src={image} alt="" width={30} />
        <h3 className="text-sm">{name}</h3>
      </div>
      <div className=" ml-5 flex flex-1  items-center  gap-5 text-gray-400">
        <p className="uppercase">{symbol}</p>
        <p className="text-sm">${current_price}</p>
      </div>
      <p
        className={`${
          perCent > 0 ? "text-green-700" : "text-red-700"
        } flex-1 text-sm`}
      >
        {perCent}%
      </p>
      <div className="flex flex-col gap-1 md:gap-3">
        <div className=" flex items-end justify-between gap-3   text-xs  sm:text-sm">
          <p className="text-xs text-gray-500 sm:text-sm">High 24h</p>
          <p className="">${high_24h}</p>
        </div>
        <div className="flex items-end justify-between gap-3   text-xs  sm:text-sm">
          <p className="text-xs text-gray-500 sm:text-sm">Low 24h</p>
          <p className="">${low_24h}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
