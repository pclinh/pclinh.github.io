console.log('4');
var access_token='';
var url1 = 'https://graph.facebook.com/v11.0/102135788849157/feed?';
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1229103174227463',
    cookie     : true,
    xfbml      : true,
    version    : 'v11.0'
  });

  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
     
  });
};
 (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
 async function statusChangeCallback(response){
   if(response.status === 'connected'){
    console.log('Logged in and authenticated');
     await  $.ajax({ 
        type: 'GET', 
        url: 'https://graph.facebook.com/102135788849157?fields=access_token&access_token='+response.authResponse.accessToken, 
        data: { get_param: 'value' },
        success: function (data) {
         access_token=data.access_token;
        },
    }).catch(e => {
    console.log(e);
});
   } else {
     console.log('Not authenticated');
   }
 }
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
async function deletePost(){ 
  $.ajax({
    url: 'url1+"access_token="+access_token+"&id="+id_post',
    type: 'DELETE',
    success: function(result) {
        alert("Delete succeed");
    }
  });
}
/*async function deletePost(id_post){
  await $.delete(url1+"access_token="+access_token+"&id="+id_post)
  alert('Delete succeed')
};*/
$("#Get_btn").click(function (){ 
  $("#show").replaceWith('<p id="show"></p>');
  $.get(url1+"access_token="+access_token, function(data2, status){
    console.log(data2)
  $.each(data2.data, function( index, value ) {      
    var row = $("<tr><td>&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>&emsp;&emsp;Content:&emsp;"+value.message + "</td><td><button class='delete_btn' id=\'"+value.id+"\' onclick=<script>
                alert('clicked');
                console.log('ah');
                console.log(event.target.id);
             </script> >delete</button></td></tr>");
    $("#show").append(row);
   });
  });
});

$("#Post_btn").click(async function (){ 
  message=document.getElementById("post_content").value;
  await $.post(url1+"access_token="+access_token+"&message="+message, function(data2, status){
  alert('Post succeed');
}).catch(e =>{
    console.log(e);
  }
)} 
);
$(".delete_btn").click(function(event){
    alert('clicked');
    console.log('ah');
    console.log(event.target.id);
  });
