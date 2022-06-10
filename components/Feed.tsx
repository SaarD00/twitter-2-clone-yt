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
    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full col-span-11 max-h-screen overflow-y-scroll border-x border-[#38444d] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-twitterDark md:col-span-7  lg:col-span-5">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-twitterDark  ">
        <h1 className="p-3 pb-0 text-xl font-bold text-white">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-white transition-all duration-500 ease-out hover:rotate-180 hover:text-twitter active:scale-125"
        />
      </div>

      <div className="sticky top-5 z-30 scroll-smooth bg-twitterDark ">
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
