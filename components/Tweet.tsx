import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { fetchComments } from '../utils/fetchComments'
import { AiOutlineRetweet } from 'react-icons/ai'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])

  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
    }

    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  return (
    <div
      key={tweet._id}
      className="flex cursor-pointer flex-col space-x-3 border-y border-[#38444d] bg-twitterDark p-5 transition-all duration-200 hover:bg-[#203041]  "
    >
      <div className="flex space-x-3 ">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg || 'https://links.papareact.com/gll'}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold text-white">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} ??
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1 text-white">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              className="m-5 ml-0 mb-1 max-h-60  rounded-lg object-cover shadow-sm"
              alt=""
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={(e) => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-7 w-7 p-1 hover:text-sky-500" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <AiOutlineRetweet className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 rounded-full p-1 text-gray-400  hover:bg-pink-600/20">
          <HeartIcon className="h-5 w-5 hover:text-pink-600" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl bg-transparent/20 p-2 text-white outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-[#38444d] p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-[#38444d]" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold text-white">
                    {comment.username}
                  </p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} ??
                  </p>

                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p className="text-white">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet

// import React, { useEffect, useState } from 'react'
// import { Comment, CommentBody, Tweet } from '../typings'
// import TimeAgo from 'react-timeago'
// import {
//   ChatAlt2Icon,
//   HeartIcon,
//   SwitchHorizontalIcon,
//   UploadIcon,
// } from '@heroicons/react/outline'
// import { fetchComments } from '../utils/fetchComments'
// import { useSession } from 'next-auth/react'
// import toast from 'react-hot-toast'

// interface Props {
//   tweet: Tweet
// }

// const Tweet = ({ tweet }: Props) => {
//   const [comments, setComments] = useState<Comment[]>([])
//   const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
//   const [input, setInput] = useState<string>('')

//   const { data: session } = useSession()
//   console.log('???? ~ file: Tweet.tsx ~ line 23 ~ Tweet ~ session', session)

//   const refreshComments = async () => {
//     const comments: Comment[] = await fetchComments(tweet._id)
//     setComments(comments)
//   }

//   useEffect(() => {
//     refreshComments()
//   }, [])

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const commentToast = toast.loading('Posting Comment...')

//     // Comment logic
//     const comment: CommentBody = {
//       comment: input,
//       tweetId: tweet._id,
//       username: session?.user?.name || 'Unknown User',
//       profileImg: session?.user?.image || 'https://links.papareact.com/gll',
//     }

//     const result = await fetch(`/api/addComment`, {
//       body: JSON.stringify(comment),
//       method: 'POST',
//     })

//     console.log('WOOHOO we made it', result)
//     toast.success('Comment Posted!', {
//       id: commentToast,
//     })

//     setInput('')
//     setCommentBoxVisible(false)
//     refreshComments()
//   }

//   return (
//     <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
//       <div className="flex space-x-3">
//         <img
//           className="h-10 w-10 rounded-full object-cover"
//           src={tweet.profileImg}
//           alt=""
//         />

//         <div>
//           <div className="flex items-center space-x-1">
//             <p className="mr-1 font-bold">{tweet.username}</p>
//             <p className="hidden text-sm text-gray-500 sm:inline">
//               @{tweet.username.replace(/\s+/g, '').toLowerCase()} ??
//             </p>

//             <TimeAgo
//               className="text-sm text-gray-500"
//               date={tweet._updatedAt}
//             />
//           </div>

//           <p className="pt-1">{tweet.text}</p>
//           {tweet.image && (
//             <img
//               src={tweet.image}
//               alt=""
//               className="m-5 ml-0 max-h-60 rounded-lg object-cover shadow-sm"
//             />
//           )}
//         </div>
//       </div>

//       <div className="mt-5 flex justify-between">
//         <div
//           onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
//           className="flex cursor-pointer items-center space-x-3 text-gray-400"
//         >
//           <ChatAlt2Icon className="h-5 w-5" />
//           <p>{comments.length}</p>
//         </div>
//         <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
//           <SwitchHorizontalIcon className="h-5 w-5" />
//         </div>
//         <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
//           <HeartIcon className="h-5 w-5" />
//         </div>
//         <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
//           <UploadIcon className="h-5 w-5" />
//         </div>
//       </div>

//       {/* comment box logic */}
//       {commentBoxVisible && (
//         <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Write your comment..."
//             className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
//           />
//           <button
//             disabled={!input}
//             className="text-twitter disabled:text-gray-200"
//           >
//             Post
//           </button>
//         </form>
//       )}

//       {comments?.length > 0 && (
//         <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
//           {comments.map((comment) => (
//             <div key={comment._id} className="relative flex space-x-2">
//               <hr className="absolute left-5 top-10 h-10 border-x border-twitter/30" />
//               <img
//                 src={comment.profileImg}
//                 className=" mt-2 h-7 w-7 rounded-full object-cover"
//                 alt=""
//               />
//               <div>
//                 <div className="flex items-center space-x-1">
//                   <p className="mr-1 font-bold">{comment.username}</p>
//                   <p className="hidden text-sm text-gray-500 lg:inline">
//                     {' '}
//                     @{comment.username.replace(/\s+/g, '').toLowerCase()} ??
//                   </p>

//                   <TimeAgo
//                     className="text-sm text-gray-500"
//                     date={comment._createdAt}
//                   />
//                 </div>
//                 <p>{comment.comment}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Tweet
