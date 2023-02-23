import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Display from './Display';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

export default function Data() {

  const [data, setData] = useState({});

  const poolAddress = window.location.href.substring(window.location.href.indexOf("?=") + 2)
  console.log(poolAddress);
  const { data: tickData, refetch } = useQuery(TICK_QUERY, {
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
      for (let i = 0; i < array.length; i++) {
        let tick = { "index": array[i].tickIdx, "liquidity": array[i].liquidityGross }
        ticks.push(tick)
      }
      setData(ticks);
      toSkip += array.length
      refetch({ skip: toSkip })
    }

  }
  function textFile() {
    const element = document.createElement("liquidityvalues");
    const textFile = new Blob([[JSON.stringify(ticks)], { type: 'text/plain' }]); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    const url = element.href
    return url
  }
  console.log(data);




  function isDone() {
    if (show) {
      if (ticks.length === 0) {
        return (
          <Typography variant="h6" color="inherit" noWrap>
            No ticks to show, or invalid pool
          </Typography>
        )
      }
      return (<Button variant="contained" href={textFile()} download> Download Liquidity Values </Button>)
    } else {
      return "Loading"
    }
  }




  return (
    <div>
      <div>
        {isDone()}
        <Display props={data}>

        </Display>
      </div>
    </div>
  )
}
