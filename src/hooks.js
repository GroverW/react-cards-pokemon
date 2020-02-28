
import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

const useFlip = (initialValue) => {
  const [isFacingUp, setIsFacingUp] = useState(initialValue);
  const flip = () => {
    setIsFacingUp(isUp => !isUp);
  }

  return [isFacingUp, flip];
}



const useAxios = (url) => {
  const [cards, setCards] = useState([]);

  const getCard = async (name = "") => {
    console.log("NAAAAME",name);
    const response = await axios.get(`${url}/${name}`);
    setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  }

  return [cards, getCard];
}

export { 
  useFlip,
  useAxios 
};