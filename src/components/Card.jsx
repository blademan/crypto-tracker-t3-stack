const Card = ({
  current_price,
  name,
  symbol,
  image,
  high_24h,
  low_24h,
  market_cap_change_percentage_24h: perCent,
}) => {
  return (
    <li className="flex w-full cursor-pointer items-center justify-between gap-5 rounded-md bg-slate-800 from-green-600 via-blue-800 to-purple-800 px-5 py-3 text-gray-300  hover:bg-gradient-to-r">
      <div className="flex w-32 items-center gap-3">
        <img src={image} alt="" width={30} />
        <h3 className="">{name}</h3>
      </div>
      <div className=" ml-5 flex  flex-1  gap-5 text-gray-400">
        <p className="uppercase">{symbol}</p>
        <p className="">${current_price}</p>
      </div>
      <p
        className={`${perCent > 0 ? "text-green-700" : "text-red-700"} flex-1 `}
      >
        {perCent}%
      </p>
      <div className="flex flex-col gap-3">
        <div className=" flex items-end justify-between gap-3">
          <p className="text-sm text-gray-400">High 24h</p>
          <p className="">${high_24h}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm text-gray-400">Low 24h</p>
          <p className="">${low_24h}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
