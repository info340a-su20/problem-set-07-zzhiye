'use strict';

//import { getRecentTweets } from './Model';

export function printTweets(tweetArray) {
  if(tweetArray.length == 0) {
    console.log("No tweets found")
  }

  for (let tweetObj of tweetArray) {
    let time = new Date(tweetObj.timestamp)
    console.log("- \""+
    tweetObj.text+"\" ("+
    time.toLocaleString("en-US") +
    ")")
  }
}

// testing!
// let recent = getRecentTweets();
// printTweets(recent);