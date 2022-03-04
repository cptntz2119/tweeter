$(document).ready(function () {
  //when the input has keyup event, we use callback to count
  $("#tweet-text").keyup(function () {
    eventLength = $(this);
    if (eventLength.val().length > 140) {
      $("#counter").text(140 - eventLength.val().length);
    } else {
      $("#counter").text(140 - eventLength.val().length);
    }
  });
});
