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

    // List of user in database
    const keys = await redis.keys('*')
    context.log('keys', keys);

  balance = parseFloat(await redis.get(mySbMsg.user_id))
  context.log("current balance" + balance)
  switch (mySbMsg.action) {
    case "spending":
      amount = balance - parseFloat(mySbMsg.amount);
      write = redis.set(mySbMsg.user_id, amount);
      context.log('Spending, new amount :'+ amount);
      break;
    case "payment":
      amount = balance + parseFloat(mySbMsg.amount);
      write = redis.set(mySbMsg.user_id, amount);
      context.log('Payment, new amount :'+ amount);
      break;
    default:
      console.log(`Sorry`);
  }

};