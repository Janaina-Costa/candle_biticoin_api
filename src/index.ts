import axios from 'axios'
import { API_COINGECKO_KEY, PRICES_API } from './settings'
import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChanel } from './messages/messageChannel'


const id=`bitcoin`
const vs_currencies=`usd`

const readMarketPrice = async(): Promise<number> =>{
  const result = await axios.get(`${PRICES_API}?ids=${id}&vs_currencies=${vs_currencies}&api_key=${API_COINGECKO_KEY}`)
  const data = result.data
  const price = data.bitcoin.usd
  console.log(price)
  return price
}

const generateCandle = async()=>{
  const messageChannel = await createMessageChanel()
  if(messageChannel){
    
      const loopTimes = 2
      const candle = new Candle('bitcoin')
      console.log(`--------------------------------`);
      console.log(`generate candle`);
  
      for(let i=0; i<loopTimes; i++){
        const price = await readMarketPrice()
        candle.addValue(price)
  
        console.log(`market pricce ${i+1} of ${loopTimes}`);
        
        await new Promise((resolve)=>setTimeout(resolve, 500))
      }
      candle.closeCandle()
      const candleObject = candle.toSimpleObject()
      console.log(candle.toSimpleObject());
      
      const candleJson = JSON.stringify(candleObject)
      console.log(`Candel close ${candleJson}`);
      messageChannel.assertExchange('market_data', 'topic', {
        durable: true,
      })
      messageChannel.publish('market_data', 'bitcoin.*', Buffer.from(candleJson))
      console.log('Candle sent to message broker');
      
  
    }

}

generateCandle()


