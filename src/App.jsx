import React, { useState, useEffect } from 'react'
import './App.css'
import { DateTime } from 'luxon'

const API_KEY = 'lGOHgTkqISP61Sgi8R7mi0Wp5KnhRvZIQ8BvXxdX'

const API_URL = `https://api.nasa.gov/planetary/apod?date=:date&api_key=${API_KEY}`

function App() {
  const [image, setImage] = useState()
  const [date, setDate] = useState(new Date())

  const consultarAsteroides = async () => {
    const res = await fetch(API_URL.replace(':date', DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')))
    const jsonRes = await res.json()
    console.log(jsonRes);
    setImage(jsonRes)
  }

  useEffect(() => {
    consultarAsteroides()
  }, [])

  return (
    <div>
      {image &&
        <>
          <h2>{image.title}</h2>
          <img src={image.url} />
          <p>{image.explanation}</p>
        </>
      }
    </div>
  )
}

export default App