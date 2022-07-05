import React, {useState, useEffect} from 'react'
import classes from './playlist.module.css'
import { Song } from '../../definitions/songs'
type Props = {
  song:Song,
  onClick: ( song:Song ) => void,
  width: number
}

const Items:React.FC<Props> = ({ song, onClick, width }) => {
  

  return (
    <>
      <div className={(width < 700 ?classes.list_responsive : classes.list)} onClick = {() => {
        onClick(song)
      }}>
        <h3 className={(width < 700 ? classes.list_title_responsive : classes.list_title)}>{song.name}</h3>
      </div>
    </>
  )

}
export default Items