import * as core  from "@actions/core";
import * as github  from "@actions/github";
import { logger } from './logger.js';

function sendNotification(url, message,author) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      message,
      author
    }
  };

   return fetch(url, options)
    .then(response => response.json())
};


(async () => {
  const message = core.getInput("message");
  const url =  core.getInput("url");
  const { sha, actor } = github.context;
  logger.info("sha" + sha);
  logger.info("actor" + actor);

  try {
    await sendNotification(url, message,actor);
    core.setOutput("id", Math.random());
  } catch (e) {
     core.setFailed(e)
  }
})();