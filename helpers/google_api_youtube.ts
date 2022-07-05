export const fetchApiYoutube = (videoId:string, API_Key?:string) => {
  const api_key = API_Key ? API_Key : "AIzaSyC_zZFek83XXHGqGSUhI5lxrU4qEIhBJKY"
  return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`
}