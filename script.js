//run search when user presses 'enter' key
$(document).keypress(function(event) {
  if (event.keyCode == 13) {
    run_search();
  }
});
//run search when user clicks search icon
$("#search_icon").click(function() {
  run_search();
});
//run search function
var run_search = function() {
    //gather the value of the user's input
    var user_search_term = $("#search_term").val();
    //jquery to make ajax xmlhttprequest object
    $.ajax({
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        url: 'http://en.wikipedia.org/w/api.php?&callback=?',
        dataType: 'jsonp',
        async: false,
        data: {
          'action': 'query',
          'format': 'json',
          'exintro' : true,
          'exlimit': 10,
          'exchars': 250,
          'explaintext': true,
          'generator': 'search',
          'gsrsearch': user_search_term,
          'gsrnamespace': 0,
          'gsrlimit': 20,
          'prop': 'extracts|pageimages',
          'piprop': 'thumbnail',
          'pilimit': 'max',
          'pithumbsize': '130',
          //allows CORS request to succeed

          headers: {
            'Api-User-Agent': 'Example/1.0'
          },
          xhrFields: {
            withCredentials: true
          }
        },
        success: function(data) {
          //object with 10 pages of results matching search term
          var results = data.query.pages;
          console.log("succeeded");
          //console.log(rresults);

          $("#holder").html("<h3>Results: " + user_search_term + "</h3>");
          //delete contents of previous search by checking to see if there is any text in div
          if ($("#results_container").text()) {
            $("#results_container").empty();
          }
          console.log(results);
          //iterate through the results and run a function on each of them which makes a list of results
          $.each(results, function(index, value) {
                console.log(value);
                //make li and anchor items
                var list_item = document.createElement('li');

                //create the main row div, which contains the description div and the img div
                var list_row = document.createElement('div');
                $(list_row).addClass('row');

                //create the description div
                var list_desc_div = document.createElement('div');
                $(list_desc_div).addClass('col-lg-10');

                //create the image div
                var list_img_div = document.createElement('div');
                $(list_img_div).addClass('col-lg-2');

                //create anchor and description elements
                var list_anchor = document.createElement('a');
                var list_desc = document.createElement('p');
                //make thumbnail image
                var list_thumbnail = document.createElement('img');

                // set the attribute of hrf on the anchor to be the link to the wikipedia article
                $(list_anchor).attr("href", "http://en.wikipedia.org/?curid=" + value.pageid);
                //ensure that wiki article opens in a new window
                $(list_anchor).attr("target", "_blank");
                //create a text node with the title of that article
                list_anchor.appendChild(document.createTextNode(value.title));
                //put the anchor in the list description div
                $(list_desc_div).append(list_anchor);
            //insert br element to make space between title and extract
            var breaker = document.createElement("br");
            list_desc_div.appendChild(breaker);
            // put in extract
            $(list_desc).text(value.extract);
            $(list_desc_div).append(list_desc);
                  //put the thumbnail in the li
                  if (value.thumbnail) {
                    $(list_thumbnail).attr("src", value.thumbnail.source);
                    //$(list_thumbnail).addClass("pull-right");
                    $(list_thumbnail).addClass("img-thumbnail");
                    list_img_div.appendChild(list_thumbnail);
                  }
                  $(list_row).append(list_desc_div);
                  $(list_row).append(list_img_div);
                  $(list_item).append(list_row);
                  //put the finished li in the container
                  document.getElementById("results_container").appendChild(list_item);
                });
            },
            error: function() {
              console.log("erred");
            }
        });
    };

    //language selector
    //$("#lang").html("<small>" + " EN" + "</small>");
