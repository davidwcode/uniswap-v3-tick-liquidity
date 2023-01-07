import React from 'react';
import './App.css'
import { gql, useQuery} from '@apollo/client';


const TICK_QUERY = gql`
  query ticks($skip: Int, $poolAddress: Bytes!) {
    ticks(skip: $skip, where: { poolAddress: $poolAddress }) {
      tickIdx
      liquidityNet
      liquidityGross
    }
  }
`
const ticks = []

let toSkip = 0;
  

function App() {
  const poolAddress = window.location.pathname.substring(1)
  const {data: tickData, refetch} = useQuery(TICK_QUERY, {
    variables: {
      skip: toSkip,
      poolAddress: poolAddress,

    }
  })
  let show = false
  if (tickData) {
    let array = tickData.ticks
    if (array.length === 0) {
      show = true
    } else {
      for (let i = 0; i < array.length; i ++) {
        let tick = {"index": array[i].tickIdx, "gross liquidity": array[i].liquidityGross}
        ticks.push(tick)
      }
      toSkip += array.length
      refetch({ skip: toSkip})
    }
    
  } 
  
    
      
    
  
  console.log(ticks);
  
  

  function textFile() {
    const element = document.createElement("liquidityvalues");
    const textFile = new Blob([[JSON.stringify(ticks)], {type: 'text/plain'}]); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    const url = element.href
    return url
  }

  
  
  
  function isDone() {
    if(show) {
      return (<a href = {textFile()}> Click for Liquidity Values </a>)
    } else {
      return "Loading"
    }
  }
  

  

  return (
    <div>
      <div>
      {isDone()}
      </div>
    </div>
  )
}

export default App