import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
const Home = ({ filteredCoins }) => {
  return (
    <>
      <ProgressBar />
      <ul className="flex w-full flex-col gap-3">
        {filteredCoins.map((coin) => (
          <Card key={coin.name} {...coin} />
        ))}
      </ul>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  const coins = await res.json();

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
