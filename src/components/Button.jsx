import Link from "next/link";
import { useEffect, useState } from "react";

const Button = ({ title = "Show Favorite" }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    const cards = document.querySelectorAll(".card");
    if (newIsFavorite) {
      console.log("isFavorite");
      cards.forEach((card) => {
        if (!card.classList.contains("favorite")) {
          card.classList.toggle("hidden");
        }
      });
      //add state in local storage to save the state of the button
      localStorage.setItem("isFavorite", true);
    } else {
      cards.forEach((card) => {
        card.classList.remove("hidden");
      });
      //remove state in local storage to save the state of the button
      localStorage.removeItem("isFavorite");
    }
  };

  useEffect(() => {
    //get state from local
    console.log("useEffect");
    const isFavorite = localStorage.getItem("isFavorite");
    if (isFavorite) {
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        if (!card.classList.contains("favorite")) {
          card.classList.add("hidden");
        }
      });
    }
  }, []);

  return (
    <Link
      onClick={toggleFavorite}
      href="/"
      className="group fixed  bottom-0 left-0 inline-flex h-1 w-full items-center justify-center overflow-hidden rounded-md px-6 py-5 font-bold text-white shadow-2xl"
    >
      <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 opacity-0 transition duration-300 ease-out group-hover:opacity-100"></span>

      <span className="absolute top-0 left-0 h-1/3 w-full bg-gradient-to-b from-white to-transparent opacity-5"></span>

      <span className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white to-transparent opacity-5"></span>

      <span className="absolute bottom-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-5"></span>

      <span className="absolute bottom-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-5"></span>
      <span className="absolute inset-0 h-full w-full rounded-md border border-white opacity-10"></span>
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-5 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
      <span className="relative">{title}</span>
    </Link>
  );
};
export default Button;
