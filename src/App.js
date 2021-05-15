import "./App.css";
import Rows from "./components/Rows";
import requests from "./requests";
import Banner from "./components/Banner"
function App() {
  return (
    <div className="App">
      


      <Banner />
      
     
      <Rows
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        //making the image bigger this default to true so no need of = and {}
        isImageBigger
      />

      <Rows title="Trending" fetchUrl={requests.fetchTrending } />
      <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Rows title="Horror" fetchUrl={requests.fetchHorrorMovies} />
     
    </div>
  );
}

export default App;
