import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

  const addImageToTweet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast.success('Tweet Posted', {
      icon: '💯',
    })
    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        className="mt-4 h-14 w-14 rounded-full object-cover"
        alt=""
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            onChange={(e) => {
              setInput(e.target.value)
            }}
            value={input}
            type="text"
            placeholder={!session ? 'Sign In to Tweet!' : "What's Happening?"}
            className="placeholder-text-gray-600 h-24 w-full bg-transparent text-xl text-white outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter image Url..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
