import { AMQP_URL } from "../settings"
import {Channel, connect} from 'amqplib'

export const createMessageChanel = async (): Promise<Channel| null>=>{
  try{
    const connection = await connect(AMQP_URL)
    const channel = await  connection.createChannel()
    const exchange = 'market_data'
    const queue ='queue_candle'
    const key = 'bitcoin.*'
    await channel.assertExchange(exchange, 'topic', {
      durable:true
    })

    channel.assertQueue(queue,{
      exclusive:true
    })
    channel.bindQueue(queue, exchange, key)
        
    return channel

  }catch(err){
    console.log(err);
    return null
  }
}