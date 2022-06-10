export type TweetBody = {
    text: string
    username: string
    profileImg: string
    image?: string
  }
  
  export type CommentBody = {
    comment: string
    tweetId: string
    username: string
    profileImg: string
  }
  
  export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'tweet'
    blockTweet: boolean
  }
  
  export interface Comment extends CommentBody {
    _createdAt: string
    _id: string
    _rev: string
    _type: 'comment'
    _updatedAt: string
    tweet: {
      _ref: string
      _type: 'reference'
    }
  }

  export interface Like {
    _id: string
    _rev: string
    _type: 'like'
    _createdAt: string
    _updatedAt: string
    tweet: { _ref: string, _type: 'reference' }
    username: string
    profileImg: string
    tweetId: string


  }