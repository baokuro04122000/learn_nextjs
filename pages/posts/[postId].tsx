import React from 'react'
import { useRouter } from 'next/router'
export interface PostIdPageProps{

}

export default function PostIdPage(props: PostIdPageProps){
  const router = useRouter()
  const {postId} = router.query

  return (
      <div>
        postId:  {postId}
      </div>
  )
}