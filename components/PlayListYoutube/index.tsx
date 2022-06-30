import type { NextPage } from "next";

import React from 'react'
import classes from './playlist.module.css'
import {Song} from '../../definitions/songs'

type Props = {
  list: Array<Song>,
  onClick:(song:Song)=>void  
}

const PlayListYoutube:NextPage<Props> = ({list, onClick}) => {
  
  return (
    <>
      

    <div className={classes.video_list_container}>

        {list.map((song)=>{
          
          return (
            <>
             <div className={classes.list +" "+classes.active} onClick = {()=>{
              onClick(song)
             }}>

              <h3 className={classes.list_title}>{song.name}</h3>
            </div>
            </>
           ) 
            
          })}

   </div>

    </>
  )
}

export default PlayListYoutube