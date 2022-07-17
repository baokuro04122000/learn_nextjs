import Redis from 'ioredis'

const redis = new Redis({
  port: 18798, // Redis port
  host: "redis-18798.c73.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "2e4FKR4b5TYNgtNAdn2DqPqcxsQfXF3P"
})

export default redis