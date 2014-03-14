// ---------------------------------------------------------------------------
// ------------------------------------------
// Create articles for development
// ------------------------------------------
var artArray = [];
for(var i = 0; i < 50; i++){
  artArray.push({
    'title': 'title' + i,
    'id': i,
    'text': 'Of course I peed my pants, everyone my age pees their pants. I ate some Triscuit crackers in the car, you should have had some. Knibb High football rules! This guy can stay in my room, I can tell you that much. I thought I was your snack-pack? When I graduated first grade, all my dad did was tell me to get a job.'
  });
}

// ---------------------------------------------------------------------------

// Global bucketArray
var bucketArray = [];

// ------------------------------------------
// jQuery
// ------------------------------------------
$(document).ready(function() {

  var popCount = 0;

  $("button").click(function() {
    console.log("Your popularity is " + (++popCount));
  });

  // Double click article to add to bucket
  $(document.body).on('dblclick', '.article' ,function(){
    // THIS IS TOO MESSY!!!
    var article_id = $($(this).first()).children()[0].id;

    // Check if article exists in bucket, if not, add it
    if(bucketArray.indexOf(article_id) == -1){

      bucketArray.push(article_id);
      // Adjust DOM, make article not draggable and gray out
      $("#" + article_id).parent().addClass("article_in_bucket");
      $("#" + article_id).attr({"draggable": false });
      refreshBucket();
    }
  });

  // Double click article to remove from bucket
  $(document.body).on('dblclick', '.bucket_item' ,function(){
    // MESSY!!!!!
    var article_id = $($(this).first()).attr("data-id");

    // Find article and remove it from bucketArray
    var index = bucketArray.indexOf(article_id);
    bucketArray.splice(index,1);
    // Adjust DOM, make article draggable
    $("#" + article_id).parent().removeClass("article_in_bucket");
    $("#" + article_id).attr({"draggable": true });
    refreshBucket();
  });

});

// ------------------------------------------
// Updating bucket list
// ------------------------------------------
// Refresh the bucket without refreshing the entire page
function refreshBucket() {
  // Reinitialize bucket content
  var bucketContent = '';

  // Loop through new bucket array and add content
  for(var i = 0; i < bucketArray.length; i++) {
    // console.log($("#" + bucketArray[i])[0]);
    bucketContent += '<div class="bucket_item" data-id="' + bucketArray[i] + '">';
    bucketContent += '<div>' + $("#" + bucketArray[i] + " .title b")[0].innerHTML + '</div>';
    bucketContent += '<button ng-click="makePopular()">Read</button>';
    bucketContent += '</div>';
    // bucketContent += '<div>' + bucketArray[i] + '</div><br>';
  }

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);
}

// ------------------------------------------
// Drag and Drop handlers
// ------------------------------------------
function onDragStart(ev) {
  // track article id
  ev.dataTransfer.setData("article_id",ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var article_id = ev.dataTransfer.getData("article_id");
  // Add to bucket
  bucketArray.push(article_id);
  // Adjust DOM, make article not draggable and gray out
  $("#" + article_id).parent().addClass("article_in_bucket");
  $("#" + article_id).attr({"draggable": false });

  // Increase popularity of ID HERE ****************
  // Notify database to increase popularity of article with article_id
  
  refreshBucket();
}

// ------------------------------------------
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope) {
  $scope.articles = artArray;
  // $scope.popularity;
  var popularity = 0;

  $scope.makePopular = function() {
    popularity++;
    console.log(popularity);
  };
});

