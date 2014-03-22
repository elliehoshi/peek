// ===========================================================
// Update bucket functions
// ===========================================================
// Global bucketArray contains objects with article data
var bucketArray = [];
// ------------------------------------------
// Refresh bucket list
// ------------------------------------------
function refreshBucket() {
  var bucketContent = updateBucketContent();

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);

  // Make new list sortable
  $('.bucket').sortable({
    handle: '.handle',
    forcePlaceholderSize: true,
    items: ':not(.bucket_name)'
  });
}

// ------------------------------------------
// Update bucket content
// ------------------------------------------
function updateBucketContent() {
  var bucketContent = '<h4 class="bucket_name">BUCKET</h4>';

  bucketContent += bucketArray.length === 0 ? '<div class="bucket_item_holder"><strong>Drag to add article</strong></div>' : updateItemsInBucket();

  return bucketContent;
}

// ------------------------------------------
// Update items of bucket
// ------------------------------------------
function updateItemsInBucket() {
  var items = "";

  // Show latest bucket article
  for(var i = bucketArray.length - 1; i >= 0; i--) {

    // Inject HTML to update bucket
    items += '<div class="bucket_item" data-id="' + bucketArray[i].id + '">';
    items += '<div class="bucket_img">';
    if(bucketArray[i].thumbnail){

      items += '<div class="white_overlay"></div><img class="thumb" src="'+ bucketArray[i].thumbnail +'" height="50">';
      items += '<div class="bucket_title">' + bucketArray[i].title + '</div>';
    }
    else {
      
      items += '<div class="bucket_title" style="position: initial;">' + bucketArray[i].title + '</div>';
    }
    items += '<div class="moreInfo">';
    items += '<div class="remove_bucket_item glyphicon glyphicon-remove-circle" style="position: absolute;"></div>';
    items += '<button class="read btn btn-default">Read</button>';
    items += '<div class="handle glyphicon glyphicon-align-justify"></div>';
    items += '<div class="bucket_teaser">' + bucketArray[i].teaser + '</div>';
    items += '</div></div></div>';
  }
  
  return items;
}

// ===========================================================
// Bucket control functions
// ===========================================================
// ------------------------------------------
// Check that article id is valid
// ------------------------------------------
function validId(id) {
  return (locateItem(id) == -1 && id !== '') ? true : false;
}

// ------------------------------------------
// Create item object for bucket
// ------------------------------------------
function createItem(id) {
  // Set local variables
  var title, thumbnail, article_id, teaser, item;

  // Extract data from DOM by id
  title = $("#" + id + " .title b")[0].innerHTML;
  teaser = $("#" + id + " .text")[0].innerHTML;
  thumbnail = $("#" + id +" img").first().data("thumb");
  // If no thumbnail, use article main image as thumbnail
  if(thumbnail === null || thumbnail === '') {
    thumbnail = $("#" + id +" img").first().attr("src");
  }

  // Return article object
  return {"id": id, "title": title, "teaser": teaser, "thumbnail": thumbnail};
}

// ------------------------------------------
// Find article to delete by ID
// ------------------------------------------
function locateItem(id) {
  // Locate object in bucket by ID
  var item = $.grep(bucketArray, function(e){ return e.id == id; });
  // Return the array index of found object
  return bucketArray.indexOf(item[0]);
}

// ------------------------------------------
// Add article to bucket
// ------------------------------------------
function addItemToBucket(id) {
  bucketArray.push(createItem(id));
  addArticleToDatabase(id);
  $("#" + id).parent(".article").addClass("article_in_bucket");

  return true;
}

// ------------------------------------------
// Remove article from bucket
// ------------------------------------------
function removeItemFromBucket(id) {
  // Remove from bucketArray
  bucketArray.splice(locateItem(id),1);
  // Find article and remove it from bucketArray
  removeArticleFromBucket(id)

  $("#" + id).parent(".article").removeClass("article_in_bucket");

  return true;
}