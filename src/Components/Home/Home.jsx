import React, { useEffect } from 'react'
import "./Home.scss"
import axios from "axios";
import { useState } from 'react';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apikey = "9b550ce5ece859b7efed7de7be77e9ec"
const url = "https://api.themoviedb.org/3"
const upcoming = "upcoming";
const nowplaying = "now_playing"
const popular = "popular";
const toprated = "top_rated";
const imgurl= "https://image.tmdb.org/t/p/original"

const Card = ({ img }) => (
    
    <img className='card' src={img} alt="cover" />
    )

const Row = ({ title, 
  arr=[] }) => {
    return (
    <div className='row'>

        <h2>{title}</h2>

        <div>
          {
            arr.map((item,index) =>(
              <Card key={index} img={`${imgurl}/${item.poster_path}`} />
            ))
          }
        </div>
    </div>
    )
}

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowplayingMovies, setnowplayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topratedMovies, settopratedMovies] = useState([]);
  
  useEffect(() => {

      const fetchUpcoming = async() =>{
        const {
          data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
        setUpcomingMovies(results)
      }

      const fetchnowplaying = async() =>{
        const {
          data:{results}} = await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`)
        setnowplayingMovies(results)
      }

      const fetchpopular = async() =>{
        const {
          data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
        setpopularMovies(results)
      }

      const fetchtoprated= async() =>{
        const {
          data:{results}} = await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`)
        settopratedMovies(results)
      }

      fetchUpcoming();
      fetchnowplaying();
      fetchpopular();
      fetchtoprated();


  }, [])
  

  return (

    <section className="home">
        <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>
        
        <Row title={"Now Playing"} arr={nowplayingMovies}/>
        <Row title={"Popular"} arr={popularMovies}/>
        <Row title={"Top Rated"} arr={topratedMovies}/>
        <Row title={"Upcoming"} arr={upcomingMovies}/>
       
       
    </section>
  )
}

export default Home