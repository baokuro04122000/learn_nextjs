import type { NextPage } from "next"
import Item from './Items'
import React from 'react'
import classes from './playlist.module.css'
import { Song } from '../../definitions/songs'
import { Container, Draggable } from '../../react-smooth-dnd'
import { applyDrag } from '../../helpers/utils'


type Props = {
  list: Array<Song>,
  onClick:( song:Song )=>void,
  onChangeList:(songs: Array<Song>) => void,
}

const PlayListYoutube = ({ list, onClick, onChangeList }:Props) => {
  
  const onColumDrop = ( dropResult:any ) => {
    onChangeList(applyDrag(list, dropResult))
  }

  return (
    <>
      
      <div className={classes.video_list_container}>
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
                <Item song={song} onClick={onClick}/>
              </Draggable>
            ) 
          })}
          
        </Container>
      </div>
    </>
)}

export default PlayListYoutube