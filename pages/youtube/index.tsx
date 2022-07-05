import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import classes from '../../components/PlayListYoutube/playlist.module.css'
import responsive from '../../components/PlayListYoutube/responsive.module.css'
import fs from 'fs/promises'
import path from 'path'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'


import PlayList from '../../components/PlayListYoutube'
import NavigationPlayList from '../../components/NavigationPlayList'
import { Song } from '../../definitions/songs'
const Youtube: NextPage<{dataRender: Array<Song>}> = ({ dataRender }) => {

  const [videoId, setVideoId] = useState(dataRender[Math.floor(Math.random()*dataRender.length)])
  const [listSongs, setListSongs] = useState(dataRender)
  const [width, setWindowWidth] = useState(1000)
  
  useEffect(() => {
    const width = window.innerWidth
    setWindowWidth(width)
    console.log(width)
  }, [])

  useEffect(() => {
    if(JSON.stringify(listSongs) !== JSON.stringify(dataRender)) {
      updateListSongs()
    }
  }, [ listSongs ])

  
  function addNewSong(newSong:Song) {
    setListSongs((preList:any) => {
      return [newSong,...preList]
    })
  }
  async function updateListSongs() {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ newData:listSongs, fileName:"dinh_bao" })
    }
    try {
      await (await fetch("/api/update",options)).json()
    } catch (err) {
      console.log(err)
    }
  }

  function changeListSong(newList: Array<Song>) {
    setListSongs([...newList])
  }

  function handleOnReady(e: YouTubeEvent) {
    e.target.playVideo()
  }

  function handleEnd() {
    setVideoId(dataRender[Math.floor(Math.random()*dataRender.length)])
  }
  function handleClickSong(song: Song) {
    setVideoId(song)
  }
  const videoOptions:YouTubeProps['opts'] = {
    playerVars: {
      autoplay:1,
      controls: 1,
      rel: 0,
      showinfo: 1,
      mute: 0,
      loop: 0
    },
    height: '390',
    width: '640'
  }
  return (
    <>
      <Head>
        <title>Playlist Youtube Clone for MySelf</title>
      </Head>
      <NavigationPlayList changeListSong={addNewSong} activeSong = {handleClickSong}/>
      <div className={classes.container+" "+(width < 700 ? classes.set_margin_0px : "")}  >
        <div className={classes.main_video_container + " " + (width < 700 ? classes.set_flex_487px : "")}>
          <YouTube 
            onReady={handleOnReady}
            videoId={videoId.id} 
            iframeClassName={(width < 700 ? "" : classes.edit_iframe)}
            className={classes.main_video}
            opts={videoOptions}
            onEnd={handleEnd}
          />
          <h3 className={width < 700 ? classes.main_vid_title_responsive : classes.main_vid_title}>{videoId.name}</h3>
        </div>
        <div className={classes.video_list_container + " " + (width < 700 ? classes.set_width_651px : "")}>
          <PlayList 
            list={listSongs} 
            onClick={handleClickSong} 
            onChangeList={changeListSong}
            width={width}
          />  
        </div>
      </div>      
    </>
  )
  
}


export const getServerSideProps: GetServerSideProps = async () => {
  
  const filePath:string = path.join(process.cwd(),'assets','dinh_bao.json')
  const jsonData:any = await fs.readFile(filePath)
  const dataRender = JSON.parse(jsonData)
  
  return { props: { dataRender } }
}

export default Youtube
