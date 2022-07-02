import React from 'react'
import classes from './playlist.module.css'
import { Song } from '../../definitions/songs'
type Props = {
  song:Song,
  onClick: ( song:Song ) => void
}

const Items:React.FC<Props> = ({ song, onClick }) => {
  return (
    <>
      <div className={classes.list +" "+classes.active} onClick = {() => {
        onClick(song)
      }}>
        <h3 className={classes.list_title}>{song.name}</h3>
      </div>
    </>
  )

}
export default Items