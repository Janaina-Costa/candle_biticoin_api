import axios from 'axios'
import { API_COINGECKO_KEY, PRICES_API } from './settings'
import express from 'express'


const server = express()
const PORT = 3003
const HOST='http://localhost'

const id=`bitcoin`
const vs_currencies=`usd`
console.log('api', API_COINGECKO_KEY, PRICES_API);


const readMarketPrice = async(): Promise<number> =>{
  const result = await axios.get(`${PRICES_API}?ids=${id}&vs_currencies=${vs_currencies}&api_key=${API_COINGECKO_KEY}`)
  const data = result.data
  const price = data.bitcoin.usd
  console.log(price)
  return price
}
readMarketPrice()

server.listen(PORT, ()=>{
  console.log(`Server running at ${HOST}:${PORT}`)
})