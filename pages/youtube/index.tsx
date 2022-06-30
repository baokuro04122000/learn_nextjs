import type { GetServerSideProps, NextPage } from "next";
import classes from '../../components/PlayListYoutube/playlist.module.css'
import React, {useEffect, useState} from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import data from '../../assets/data.json'
import Head from 'next/head';
import PlayList from '../../components/PlayListYoutube'
import {Song} from '../../definitions/songs'
const youtube: NextPage<{dataRender: Array<Song>}> = ({dataRender}) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [videoId, setVideoId] = useState(dataRender[Math.floor(Math.random()*data.length)])
  
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    
  },[videoId])
  
  function handleEnd(){
    setVideoId(dataRender[Math.floor(Math.random()*dataRender.length)])
  }
  function handleClickSong(song: {"id":string, "name":string}){
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
    width: '640',
  };
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
        <PlayList list={dataRender} onClick={handleClickSong}/>  
      </div>      
    </>
  );
  
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dataRender = [...data];
  return { props: { dataRender } };
};

export default youtube;
