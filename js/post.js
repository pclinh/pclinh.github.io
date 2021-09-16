require("fbsdk.js")
if($("#photo_upload").prop('files').length==0){ 
    message=document.getElementById("post_content").value;
    FB.api(
  '/102135788849157/feed',
  'POST',
  {"message":"123\n"},
  function(response) {
      // Insert your code here
  }
);      
  }else{
    message=document.getElementById("post_content").value;
    FB.api(
    '/102135788849157/photos',
    'POST',
    {"message":message},
    function(response) {
        // Insert your code here
    })
}
