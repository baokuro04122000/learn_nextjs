import type { NextPage } from "next"
import Item from './Items'
import React from 'react'
import classes from './playlist.module.css'
import { Song } from '../../definitions/songs'
import { Container, Draggable } from '../../react-smooth-dnd'
import {DropResult} from 'smooth-dnd'
import { applyDrag } from '../../helpers/utils'


type Props = {
  list: Array<Song>,
  onClick:( song:Song )=>void,
  onChangeList:(songs: Array<Song>) => void,
  width:number,
  handleDelete: any
}

const PlayListYoutube = ({ list, onClick, onChangeList, width, handleDelete }:Props) => {
  
  const onColumDrop = ( dropResult:DropResult ) => {
    onChangeList(applyDrag(list, dropResult))
  }

  return (
    <Container
      orientation="vertical"
      onDrop={onColumDrop}
      dropPlaceholder={{  
        animationDuration: 150,
        showOnTop: true,
        className: classes.drop_preview
      }}
      getChildPayload={index =>
        list[index]
      }
    > 
      {list?.map((song, index) => {
        return (
          <Draggable key={index} className={classes.edit_draggable}  >
            <Item index = {index} handleDelete={handleDelete} song={song} onClick={onClick} width={width}/>
          </Draggable>
        ) 
      })}
    </Container>
)}

export default PlayListYoutube