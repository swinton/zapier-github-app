const moment = require('moment')

const sample = require('../samples/sample_pushevent');

// triggers on GitHub PushEvent
const handlePushEvent = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL's query string.
  const push = {
    repo: bundle.cleanedRequest.repository.full_name,
    sha: bundle.cleanedRequest.head_commit.id.substr(0, 6),
    message: bundle.cleanedRequest.head_commit.message,
    ref: bundle.cleanedRequest.ref,
    repo_url: bundle.cleanedRequest.repository.html_url,
    commit_url: bundle.cleanedRequest.head_commit.url,
    author_name: bundle.cleanedRequest.head_commit.author.name,
    author_email: bundle.cleanedRequest.head_commit.author.email,
    author_username: bundle.cleanedRequest.head_commit.author.username,
    timestamp: moment(bundle.cleanedRequest.head_commit.timestamp).format("MMMM Do YYYY, h:mm:ss a"),
    // Include the original "raw" event
    raw: bundle.cleanedRequest
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
