//run search when user presses 'enter' key
$(document).keypress(function(event) {
  if (event.keyCode == 13) {
    run_search();
  }
});
//run search when user clicks search icon
$(".icon").click(function() {
  run_search();
})
//run search function
var run_search = function() {
  //gather the value of the user's input
  var user_search_term = $("#search_term").val();
  //jquery to make ajax xmlhttprequest object
  $.ajax({
    type: "POST",
    url: 'http://en.wikipedia.org/w/api.php?',
    dataType: 'jsonp',
    data: {
      'action': 'query',
      'format': 'json',
      'async': false,
      'gsrsearch': user_search_term,
      'generator': 'search',
      'prop': 'info'
    },
    //allows CORS request to succeed
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    xhrFields: {
      withCredentials: true
    },
    success: function(data) {
      //object with 10 pages of results matching search term
      var results = data.query.pages;
      console.log("succeeded");
      $("#holder").html("<h2>Wikipedia Results: " + user_search_term + "</h2>");
      //delete contents of previous search by checking to see if there is any text in div
      if ($("#results_container").text()) {
        $("#results_container").empty();
      }
      //iterate through the results and run a function on each of them which makes a list of results
      $.each(results, function(index, value) {
        //make li and anchor items
        var list_item = document.createElement('li');
        var list_anchor = document.createElement('a');
        // set the attribute of hrf on the anchor to be the link to the wikipedia article
        $(list_anchor).attr("href", "http://en.wikipedia.org/?curid=" + value.pageid);
        //create a text node with the title of that article
        list_anchor.appendChild(document.createTextNode(value.title));
        //put the anchor in the li
        list_item.appendChild(list_anchor);
        //put the finished li in the container
        document.getElementById("results_container").appendChild(list_item);
      });
    },
    error: function() {
      console.log("erred")
    }

  });
}
