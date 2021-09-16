$.getScript("fbsdk.js");
console.log(access_token)
$("#post_btn").click(async function(){
    await if(message=document.getElementById("post_content").value="")
    alert("Vui lòng nhập nội dung");
    else if($("#photo_upload").prop('files').length==0){ 
    message=document.getElementById("post_content").value;
    FB.api(
  'https://graph.facebook.com/v11.0/102135788849157/feed',
  'POST',
  {"message":"123\n"},
  function(response) {
      alert(reponse);
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
});
