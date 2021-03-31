import React, { useState, useEffect } from 'react'
import './App.css';

const url = 'http://127.0.0.1:8000/api/'

function App() {

  const [prices, setPrices] = useState([])
  const fetchPrices = async () => {

    try {
      const response = await fetch(url)
      const price = await response.json()

      setPrices(price)
    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {
    fetchPrices()

    const interval = setInterval(() => {
      fetchPrices()
    }, 15000)


    return () => clearInterval(interval)

  }, [])

  return (
    <div>
      <h1 className="title">Real-Time Cryptocurrency Prices </h1>
      <div className="grid">
       {prices.map((item) => {
        const { cryptocurrency, market_cap,price } = item;
        return (
          <article className="card">
            <h2>{cryptocurrency}</h2>
            <h3>{price}</h3>
            <p>{market_cap}</p>
          </article>    
        );
       })}
      </div>
    </div>
  )
}
export default App;

