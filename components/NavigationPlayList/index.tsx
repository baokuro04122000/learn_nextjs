import React, {EventHandler} from 'react'
import classes from './navigationPlayList.module.css'
import { MdOutlineAddchart } from 'react-icons/md'
import { handleNotify } from '../../helpers/utils'
import {fetchApiYoutube} from '../../helpers/google_api_youtube'
import { Song } from '../../definitions/songs'


type Props = {
  changeListSong: (newSong: Song) => void,
  activeSong: (song: Song) => void
}

const NavigationPlayList = ({ changeListSong, activeSong  }:Props) => {
  const handleSubmitForm = async (e: any) => {
    e.preventDefault()
    const form:any = e.target
    const input:any = form.querySelector("input")
    const value = input.value.trim().toLowerCase()
    if(!value) {
      return
    }
    console.log(value)
    if(value.slice(0,32) !== "https://www.youtube.com/watch?v=") {
      handleNotify("Link Url not valid") 
      return
    }

    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    try {
    
      const html:any = await (await fetch(fetchApiYoutube(input.value.trim().slice(32,value.length)), options)).json()
      if(html.pageInfo.totalResults == 0) {
        handleNotify('Not found the song, please check your link again')
        return
      }
      let newSong = {
        id: html.items[0].id,
        name:html.items[0].snippet.title,
        thumbnail: html.items[0].snippet.thumbnails.default.url
      }
      input.value = ""
      input.focus()            
      changeListSong(newSong)
      activeSong(newSong)
      return
    } catch (err) {
      handleNotify('not found')
      console.log(err)
      return
    }

  }
  
  return (
    <div className={classes.navigation_playlist_wrapper}>
      <div className={classes.main_video_navigation}>
        <form onSubmit={handleSubmitForm} className={classes.search}>
          <input
            type="text"
            className={classes.search_input}
            placeholder="Type url's video youtube ex: https://www.youtube.com/watch?v=DB5USH8Vr1w"
          />
          <button className={classes.search_btn}><MdOutlineAddchart/></button>
        </form>
      </div> 
      <div className={classes.video_list_navigation}>
        <div className={classes.list_features_playlist_wrapper}>

        </div>
      </div>
    </div>  
  )
}
export default NavigationPlayList