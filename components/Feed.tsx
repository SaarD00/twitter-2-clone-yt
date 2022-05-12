import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: tweetsProps }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweet = await fetchTweets()
    setTweets(tweet)
    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }

  return (
    <div className="scrollbar-hide  col-span-6 max-h-screen overflow-scroll border-x lg:col-span-4">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      {/* feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
