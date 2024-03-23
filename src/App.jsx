import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Search from './img/search.png';
import LogIn from './img/Muhamad Ulum.png';
import './stylesheets/app.css';

function App() {
  const [gameName, setGameName] = useState('');
  const [games, setGames] = useState([]);
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields *; where name ~ *"${gameName}"*; limit 5;`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const findGames = await response.json();
        setGames(findGames);
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };

    fetchData();
  }, [gameName]);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
  };

  return (
    <div className="App">
      <header className='header-container'>
        <div className='options'>
          <div className='logo'>
            <h1 className='tittle'>Play Or Not?</h1>
          </div>
          <div className='options-buttons'>
            <button className='options-button'>Category</button>
            <button className='options-button'>Reviews</button>
            <button className='options-button'>Rankings</button>
          </div>
        </div>
        <div className='search-container'>
          <input
            type="text"
            className="searchi"
            placeholder="  Search.."
            value={gameName}
            onChange={handleInputChange}
          />
          <button className='search-button'><img src={Search} alt="" className='search' /></button>
          <button className='LogIn'><img src={LogIn} alt="" className='Mar' /></button>
          <ul className='find-games-container'>
            {games.map(game => (
              <li key={game.id}>
                <span>{game.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MainPage games={games} />} />
      </Routes>
    </div>
  );
}

export default App;
