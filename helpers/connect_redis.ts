import Redis from 'ioredis'

const redis = new Redis({
  port: 15209, // Redis port
  host: "redis-15209.c11.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "n8OOfny9Tn0IMjGkvQXK4hWWuVmRV5YU"
})

export default redis
