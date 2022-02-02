const Redis = require('ioredis');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    const redis = new Redis({
        port: 6380, // Redis port
        host: "XXXX.redis.cache.windows.net", // Redis host
        password: "XXXX",
        timeout:300,
          tls: {
              servername: "XXXX.redis.cache.windows.net",
          },
        database: 0,
      });

    write = redis.set(mySbMsg.user_id, mySbMsg.amount); 
    user_sum = redis.get(mySbMsg.user_id);

};