import type { GetServerSideProps, NextPage } from 'next'

import Head from 'next/head'
import React, { useEffect, useState, useTransition } from 'react'
import classes from '../../components/PlayListYoutube/playlist.module.css'

import fs from 'fs/promises'
import redis from '../../helpers/connect_redis'
import { handlerPromise, arrayRandomWithoutRepetitions } from '../../helpers/utils'
import path from 'path'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'


import PlayList from '../../components/PlayListYoutube'
import NavigationPlayList from '../../components/NavigationPlayList'
import { Song } from '../../definitions/songs'
const Youtube: NextPage<{dataRender: Array<Song>}> = ({ dataRender }) => {

  const [orderSong, setOrderSong] = useState(0)
  const [arrayRandomSong, setArrayRandomSong] = useState(arrayRandomWithoutRepetitions(dataRender.length))
  const [videoId, setVideoId] = useState(dataRender[arrayRandomSong[orderSong]])
  const [listSongs, setListSongs] = useState(dataRender)
  const [width, setWindowWidth] = useState(1000)
  const [isPending, StartTransition] = useTransition()
  
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
    e.target.loadVideoById({
      'videoId': videoId.id,
      'startSeconds': 2,
      'endSeconds': e.target.getDuration() - 2
    })
    if(e.target.getDuration() == 0) {
      let songs = [...listSongs]
      const x = songs.filter((value) => 
        value.id != videoId.id 
      )
      setListSongs([...x])
      StartTransition(() => {
        setArrayRandomSong(arrayRandomWithoutRepetitions(x.length))
        setOrderSong(0)
        setVideoId(dataRender[arrayRandomSong[0]])  
      })
    }
    StartTransition(() => {
      e.target.playVideo()
    })
  }
  function handleEnd() {
    setOrderSong((pre) => pre + 1)
    StartTransition(() => {
      setVideoId(dataRender[arrayRandomSong[orderSong]])
    })
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
      loop: 0,
      startSeconds:2
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
  const [err, data] = await handlerPromise(redis.get('listSong'))  
  if(err) {
    console.log(err)
    const filePath:string = path.join(process.cwd(),'assets','dinh_bao.json')
    const jsonData:any = await fs.readFile(filePath)
    const dataRender = JSON.parse(jsonData)
    return { props: { dataRender } }
  }

  return { props: { dataRender:JSON.parse(data) } }
}

export default Youtube
