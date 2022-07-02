import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import classes from '../../components/PlayListYoutube/playlist.module.css'
import fs from 'fs/promises'
import path from 'path'
import YouTube, { YouTubeProps } from 'react-youtube'

import PlayList from '../../components/PlayListYoutube'
import { Song } from '../../definitions/songs'
const Youtube: NextPage<{dataRender: Array<Song>}> = ({ dataRender }) => {

  const [videoId, setVideoId] = useState(dataRender[Math.floor(Math.random()*dataRender.length)])
  const [listSongs, setListSongs] = useState(dataRender)

  useEffect(() => {
    if(JSON.stringify(listSongs) !== JSON.stringify(dataRender)) {
      updateListSongs()
    }
  }, [ listSongs ])
  
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

  function handleEnd() {
    setVideoId(dataRender[Math.floor(Math.random()*dataRender.length)])
  }
  function handleClickSong(song: Song) {
    setVideoId(song)
  }
  const videoOptions:YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 1,
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
     
      <div className={classes.container}>
        <div className={classes.main_video_container}>
          <YouTube 
            videoId={videoId.id} 
            className={classes.main_video}
            opts={videoOptions}
            onEnd={handleEnd}
          />
          <h3 className={classes.main_vid_title}>{videoId.name}</h3>
        </div>
        <PlayList list={listSongs} onClick={handleClickSong} onChangeList={changeListSong} />  
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
