const sample = require('../samples/sample_pushevent');

// triggers on GitHub PushEvent
const handlePushEvent = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL's query string.
  const push = {
    ref: bundle.cleanedRequest.ref,
    before: bundle.cleanedRequest.before,
    after: bundle.cleanedRequest.after,
    created: bundle.cleanedRequest.created,
    deleted: bundle.cleanedRequest.deleted,
    forced: bundle.cleanedRequest.forced,
    base_ref: bundle.cleanedRequest.base_ref,
    compare: bundle.cleanedRequest.compare,
    commits: bundle.cleanedRequest.commits,
    head_commit: bundle.cleanedRequest.head_commit,
    repository: bundle.cleanedRequest.repository,
    pusher: bundle.cleanedRequest.pusher,
    sender: bundle.cleanedRequest.sender
  };

  return [push];
};


const returnSamplePushEvent = (z, bundle) => {
  // For the test poll, you should get some real data, to aid the setup process.
  return [sample];
};

module.exports = {
  key: 'pushevent',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Push Event',
  display: {
    label: 'New Push Event',
    description: 'Triggers on a new Push Event.'
  },

  // `operation` is where the business logic goes.
  operation: {
    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [],

    // Type: https://zapier.github.io/zapier-platform-schema/build/schema.html#basichookoperationschema
    type: 'hook',

    // Optional: Takes a URL and any necessary data from the user and subscribes.
    // performSubscribe: undefined,

    // Optional: Takes a URL and data from a previous subscribe call and unsubscribes.
    // performUnsubscribe: undefined,

    // A function that processes the inbound webhook request.
    perform: handlePushEvent,

    // Can get "live" data on demand instead of waiting for a hook.
    performList: returnSamplePushEvent,

    // What does a sample of data look like?
    // Via: https://developer.github.com/v3/activity/events/types/#pushevent
    sample: sample

    // Optional: What fields of data will this return?
    // outputFields: [
    //   {key: 'id', label: 'ID'},
    //   {key: 'name', label: 'Name'}
    // ]
  }
};
