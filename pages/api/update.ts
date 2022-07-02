// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
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
    try {
      await fs.writeFile(filePath, JSON.stringify(newData))
    } catch (error) {
      res.status(401).json({
        message:error+""
      })
    }
    
    res.status(200).json({
      message: 'success'
    })
    break
  default:
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
