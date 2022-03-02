/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const createTweetElement = function (tweetData) {
    return `
          <article class = "newest-tweet">
            <header class="tweet-header">
              <img  id ="user-avatar" src=${tweetData.user.avatars}> 
              <div id="user-name">${tweetData.user.name}</div>
              <div id ="user-handle">${tweetData.user.handle}</div>
            </header>
            <p id="tweet-content">${tweetData.content.text}</p>
            <footer class = "tweet-footer">
              <div id="tweet-dates">${tweetData.created_at}</div>
              <div class="user-icons">
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-flag"></i>
              </div>
            </footer>
          </article>   
  `;
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $(".tweet-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
