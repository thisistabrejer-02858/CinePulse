import { createContext,useContext ,useState,useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
const [favourites, setFavourites] = useState([]);

useEffect(() => { 
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
    }
},[])

useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}, [favourites]);

 const addToFavourites = (movie) => {
    if (!favourites.some(fav => fav.id === movie.id)) {
        setFavourites([...favourites, movie]);
    }
};

const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter(fav => fav.id !== movie.id));
};

const isFavourite = (movie) => {
    return favourites.some(fav => fav.id === movie.id);
}

    return <MovieContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}>
        {children}
    </MovieContext.Provider>
}