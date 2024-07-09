import React, { useEffect, useState } from 'react'
import Main from './components/Main'
import Footer from './components/Footer'
import SideBar from './components/SideBar'

export default function App() {
  const[data,setData]=useState(null)
  const[loading,setLoading]=useState(false)
  const[showModal,setShowModal]=useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(()=>{
   
    async function fectchAPIData(){
      const NASA_KEY= "vtCUUT3UA2Zwf8W9LavSvcCQ7yZM4ntDrKHR7Ghe"
      const url = 'https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString
      const localKey =`NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apiData= JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log("Fetched from cache")
        return
      }

      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData= await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("Fetched from API")
        console.log(`DATA\n`,apiData)
      } catch (error) {
        console.log(err.message)
      }
    }
    fectchAPIData()
  },[])

  return (
    <>
      {data ?(<Main data ={data}/>):(
        <div className='loadingState'>
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      
      {showModal &&(<SideBar data={data} handleToggleModal={handleToggleModal}/>)} 
      
      {data &&(<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}


