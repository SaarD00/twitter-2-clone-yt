export default {
  name: 'reply',
  title: 'Reply',
  type: 'document',
  fields: [
    {
      name: 'reply',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      description: 'Reference the Message the reply i accociated to:',
      type: 'reference',
      to: {
        type: 'message',
      },
    },
  ],
}
