'use strict';

import allTweets from './uw_ischool_tweets';

//private! Do not share!
const tweetData = allTweets.map((tweetObj) => {
  let mappedObj = {
    text: tweetObj.text,
    timestamp: Date.parse(tweetObj.created_at)
  }
  return mappedObj
});

export function getRecentTweets() {
  tweetData.sort( (tweet1, tweet2) => {
    return tweet2.timestamp - tweet1.timestamp;
  })
  return tweetData.slice(0, 5);
}

export function searchTweets(searchQuery) {
  let results = tweetData.filter((tweetObj) => {
    //return if query is in text
    return (
      tweetObj.text
      .toLowerCase()
      .indexOf(searchQuery.toLowerCase()) >= 0
    )
  })
  return results;
}

