import { useLocation } from "react-router-dom";

const currentLocation = useLocation();

const isMain = currentLocation.pathname === "/";
const isMovies = currentLocation.pathname === '/movies';
const isSavedMovies = currentLocation.pathname === '/saved-movies';

export { isMain, isMovies, isSavedMovies };