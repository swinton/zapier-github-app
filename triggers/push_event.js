// triggers on pushevent with a certain tag
const triggerPushevent = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      tag: bundle.inputData.tagName
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'push_event',
  noun: 'Pushevent',

  display: {
    label: 'Get Pushevent',
    description: 'Triggers on a new pushevent.'
  },

  operation: {
    inputFields: [
      
    ],
    perform: triggerPushevent,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
