const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

// const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST); // create the redis client
const redisClient = redis.createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
}); // create the redis client

let showRedisError = 0;
let redisConnected = false;

redisClient.on('error', async (err) => {
    redisConnected = false;
    if (!showRedisError++) {
        console.log(`\nError While Connecting Redis \n${err}\n Reconnecting Redis after 5000 ms`);
        await redisClient.disconnect();
        setTimeout(async () => {
            showRedisError = 0;
            await connectRedis();
        }, 5000);
    }
});

async function connectRedis() {
    await redisClient.connect();
    if (!showRedisError) { console.log('Redis Connected'), redisConnected = true };
}

connectRedis();

module.exports = redisClient;