const Redis = require('ioredis');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    const redis = new Redis({
        port: 6380, // Redis port
        host: "XXX.redis.cache.windows.net", // Redis host
        password: "XXX",
        timeout:300,
          tls: {
              servername: "redis-balance-account.redis.cache.windows.net",
          },
        database: 0,
      });

    write = redis.set(mySbMsg.user_id, mySbMsg.amount); 
    user_sum = redis.get(mySbMsg.user_id);

    // List of user in database
    const keys = await redis.keys('*')
    context.log('keys', keys);

    subGetbalance = (a,b) => {
        return a - b;
    }

    let result1 = subGetbalance(2,4);

    context.log(result1);

    addGetbalance = (a,b) => {
        return a + b;
    }

    let result2 = addGetbalance(2,4);

    context.log(result2);

  let credit = 20;  
  balance = parseInt(await redis.get(mySbMsg.user_id)) + credit;
  context.log(balance + 1);
  context.log("current balance" + balance)
  switch (mySbMsg.action) {
    case "spending":
      amount = balance - parseInt(mySbMsg.amount);
      write = redis.set(mySbMsg.user_id, amount);
      context.log('Spending, new amount :'+ amount);
      context.log(typeof(amount));
      break;
    case "payment":
      amount = balance + parseInt(mySbMsg.amount);
      write = redis.set(mySbMsg.user_id, amount);
      context.log('Payment, new amount :'+ amount);
      break;
    default:
      console.log(`Sorry`);
  }

};