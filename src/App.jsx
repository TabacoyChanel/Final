import React, { useState, useEffect } from 'react'
import './App.css'
import { DateTime } from 'luxon'

const API_KEY = 'lGOHgTkqISP61Sgi8R7mi0Wp5KnhRvZIQ8BvXxdX'

const API_URL = `https://api.nasa.gov/planetary/apod?date=:date&api_key=${API_KEY}`

function App() {
  const [image, setImage] = useState()
  const [date, setDate] = useState(new Date())

  const consultarAsteroides = async () => {
    try {
      const res = await fetch(API_URL.replace(':date', DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')))
      const jsonRes = await res.json()
      setImage(jsonRes)
    } catch {
      setImage(undefined)
    }
  }

  useEffect(() => {
    consultarAsteroides()
  }, [date])
  console.warn(image);
  return (
    <div>
      <header>
        <label style={{ marginRight: 8 }} htmlFor="select-date">Select Date</label>
        <input type="date" id="select-date" value={DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')} onChange={e => setDate(e.target.valueAsDate)} />
      </header>
      {image?.url ?
        <div>
          <h2>{image.title}</h2>
          <img src={image.url} />
          <p>{image.explanation}</p>
          <b>Copyright: {image.copyright ?? "Fair use"}</b>
        </div> : <p>Photo not found</p>
      }
    </div>
  )
}

export default App