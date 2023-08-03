import React from 'react'
import classes from './playlist.module.css'
import { Song } from '../../definitions/songs'
import { FiDelete } from 'react-icons/fi'
type Props = {
  song: Song
  onClick: (song: Song) => void
  width: number
  handleDelete: any,
  index: number
}

const Items: React.FC<Props> = ({ index, song, onClick, width, handleDelete }) => {
  return (
    <>
      <div
        style={{
          justifyContent: 'space-between'
        }}
        className={width < 700 ? classes.list_responsive : classes.list}
      >
        <div
        >
          {index + 1}
        </div>
        <h3
          onClick={() => {
            onClick(song)
          }}
          className={width < 700 ? classes.list_title_responsive : classes.list_title}
        >
          {song.name}
        </h3>
        <div
          onClick={() => {
            handleDelete(song.id)
          }}
        >
          <FiDelete />
        </div>
      </div>
    </>
  )
}
export default Items
