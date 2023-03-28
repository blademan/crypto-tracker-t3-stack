import { useState } from "react";
import useSWR from "swr";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Search from "../components/Search";
import Spinner from "../components/Spinner";

const fetcher = async (url) => {
  const res = await fetch(url);
  const coins = await res.json();

  coins.forEach((coin) => {
    coin.current_price = coin.current_price.toLocaleString();
    coin.high_24h = coin.high_24h.toLocaleString();
    coin.low_24h = coin.low_24h.toLocaleString();
    coin.market_cap_change_percentage_24h =
      coin.market_cap_change_percentage_24h.toFixed(2);
  });

  return coins;
};

const Home = () => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    setSearch(e.target.value.toLowerCase());
  };

  const { data: coins, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!coins) return <Spinner />;

  const allCoins = coins.filter((coin) => {
    if (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ) {
      return coin;
    }
  });

  return (
    <>
      <Search onChange={searchHandler} />

      <ul className="flex w-full flex-col gap-3">
        {allCoins.map((coin) => (
          <Card key={coin.name} {...coin} />
        ))}
      </ul>
      <ProgressBar />
    </>
  );
};

export default Home;
