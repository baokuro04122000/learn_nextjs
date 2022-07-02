import React from 'react'
import { useRouter } from 'next/router'
export interface ParamsPageProps{

}

export default function ParamsPage(props: ParamsPageProps) {
  const router = useRouter()
  const { params } = router.query

  return (
    <div>
      postId:  {params}
    </div>
  )
}