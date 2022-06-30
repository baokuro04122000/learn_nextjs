import React, {useEffect, useState} from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import data from '../../assets/data.json'
function youtube() {

  const [videoId, setVideoId] = useState(data[Math.floor(Math.random()*data.length)].id)

  useEffect(()=>{
    console.log(videoId)
  },[videoId])
  
  function handleEnd(){
    setVideoId(data[Math.floor(Math.random()*data.length)].id)
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
    <YouTube videoId={videoId}
     opts={videoOptions}
     onEnd={handleEnd} />
  );
  
}

export default youtube;
