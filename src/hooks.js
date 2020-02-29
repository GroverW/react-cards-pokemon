
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

const useLocalStorage = (key) => {

  const [data, setData] = useState(JSON.parse(localStorage.getItem(key)) || [])

  // save to local storage
  const setLocalStorage = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value)
  }

  //clearing
  const clearLocalStorage = () => {
    localStorage.clear(key);
    setData([]);
  }

  return [data, setLocalStorage, clearLocalStorage];
}

const useAxios = (url) => {
  const [cards, setLocalStorage, clearLocalStorage] = useLocalStorage(url);

  const getCard = async (name = "") => {
    const response = await axios.get(`${url}/${name}`);
    setLocalStorage([...cards, { ...response.data, id: uuid() }]);
  }

  return [cards, getCard, clearLocalStorage];
}



export {
  useFlip,
  useAxios
};