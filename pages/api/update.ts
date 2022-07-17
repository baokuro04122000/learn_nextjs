// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import redis from '../../helpers/connect_redis'
import { handlerPromise } from '../../helpers/utils'
type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const {
    body: { newData, fileName },
    method
  } = req

  switch (method) {
  case 'POST':
    // update list songs 
    const filePath:string = path.join(process.cwd(),'assets',fileName+".json")
    let err, data;
    [err] = await handlerPromise(fs.writeFile(filePath, JSON.stringify(newData)))
    
    if(err) {
      res.status(401).json({
        message:err+""
      })
    }

    [err, data] = await handlerPromise(redis.set('listSong', JSON.stringify(newData)))
    if(err) {
      res.status(401).json({
        message: err + ""
      })
    }

    res.status(200).json({
      message: data
    })
    break
  default:
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
