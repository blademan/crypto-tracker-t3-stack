import { useState } from "react";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
const Home = ({ filteredCoins }) => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.remove("hidden");
    });
    localStorage.removeItem("isFavorite");

    setSearch(e.target.value.toLowerCase());
  };

  if (!filteredCoins) {
    return <Spinner />;
  }

  const allCoins = filteredCoins.filter((coin) => {
    if (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ) {
      return coin;
    }
  });

  return (
    <>
      <ProgressBar />
      <Search onChange={searchHandler} />
      <ul className="flex w-full flex-col gap-3">
        {allCoins.map((coin) => (
          <Card key={coin.name} {...coin} />
        ))}
      </ul>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // Set up caching for the request
  const CACHE_KEY = "coins_cache";
  const cache = globalThis?.caches?.default;
  let coins = null;
  if (cache) {
    const cacheResponse = await cache.match(CACHE_KEY);
    if (cacheResponse) {
      coins = await cacheResponse.json();
    }
  }

  // If there is no cache or cache is expired, make the request
  if (!coins) {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      { cache: "force-cache" } // Use cache option to specify cache policy
    );

    try {
      coins = await res.json();
    } catch (error) {
      // return spinner
      return {
        props: {
          filteredCoins: null,
        },
      };
    }

    // Save the response to cache
    if (cache) {
      const cacheHeaders = new Headers();
      cacheHeaders.append("content-type", "application/json");
      const cacheResponse = new Response(JSON.stringify(coins), {
        status: 200,
        statusText: "OK",
        headers: cacheHeaders,
      });
      await cache.put(CACHE_KEY, cacheResponse);
    }
  }

  // Format the data
  coins.forEach((coin) => {
    coin.current_price = coin.current_price.toLocaleString();
    coin.high_24h = coin.high_24h.toLocaleString();
    coin.low_24h = coin.low_24h.toLocaleString();
    coin.market_cap_change_percentage_24h =
      coin.market_cap_change_percentage_24h.toFixed(2);
  });

  return {
    props: {
      filteredCoins: coins,
    },
  };
};
