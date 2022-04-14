import './App.css';
import React from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import MainCard from "./components/MainCard"
import Favorites from "./components/Favorites"


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState();
  //const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem("favorites") || []);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });


  async function setInitCat() {
    const newCat = await fetchCat('First Cat');
    setMainCat(newCat);
  }

  const alreadyFavorite = favorites.includes(mainCat);

  React.useEffect(() => {
    setInitCat();
  }, [])

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);
    //setCounter(nextCounter);
    setCounter((prev) => {

      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    })

  }

  function handlerHeartCl(value) {

    if (alreadyFavorite) {
      const nextFavorites = favorites.filter(favorite => favorite !== mainCat);
      setFavorites(nextFavorites);
      jsonLocalStorage.removeItem(mainCat + value, mainCat);
    } else {
      const nextFavorites = [...favorites, mainCat];
      setFavorites(nextFavorites);
      jsonLocalStorage.setItem(mainCat + value, mainCat);
    }
  }

  const cntCat = counter === null ? '' : counter + '번째 '
  return (
    <div>
      <Title>{cntCat}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handlerHeartCl} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>)
}

export default App;