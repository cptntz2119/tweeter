/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //prevent cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweetData) {
    return `
          <article class = "newest-tweet">
            <header class="tweet-header">
              <div class="ava-name-container">
                <img id ="user-avatar" src=${tweetData.user.avatars}> 
                <div id="user-name">${tweetData.user.name}</div>
              </div> 
              <div id ="user-handle">${tweetData.user.handle}</div>
            </header>
            <p id="tweet-content">${escape(tweetData.content.text)}</p>
            <footer class = "tweet-footer">
              <div id="tweet-dates">${timeago.format(
                tweetData.created_at
              )}</div>
              <div class="user-icons">
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-flag"></i>
              </div>
            </footer>
          </article>   
  `;
  };

  const renderTweets = function (tweets) {
    $(".tweet-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((error) => {
        alert("error:" + error);
      });
  };
  loadTweets();

  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const tweet = $("#tweet-text").val();
    if (tweet === "") {
      $("#error-message").show();
      $("#error-message").text("Your tweet is empty!");
    }
    if (tweet.length > 140) {
      $("#error-message").show();
      $("#error-message").text("You reach maximum message length!");
    } else {
      const val = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: val,
      }).then((data) => {
        $("#error-message").hide();
        loadTweets();
        $("#tweet-text").val("").focus(); //clear input data in textarea
        $("#counter").text(140);
      });
    }
  });
});
