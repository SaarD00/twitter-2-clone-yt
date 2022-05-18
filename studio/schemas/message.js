export default {
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in the message',
      type: 'string',
    },

    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Progile Image',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Message Image',
      type: 'string',
    },
  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return Object.assign({}, selection, {
  //       subtitle: author && `by ${author}`,
  //     })
  //   },
  // },
}
