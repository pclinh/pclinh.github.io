console.log('final');
var access_token='';
var url = 'https://graph.facebook.com/v11.0/'
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
$("#Get_btn").click(function (){ 
  $("#show").replaceWith('<p id="show"></p>');
  $.get(url1+"access_token="+access_token, async function(data2, status){
   await $.each(data2.data, function( index, value ) {      
    var row = $("<tr><td>&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>&emsp;&emsp;Content:&emsp;"+value.message + "</td><td><button class=\"delete_btn\" id=\'delete_"+value.id+"\'>delete</button></td><td><button class=\"delete_btn\" id=\'update_"+value.id+"\'>update</button></td></tr>");
    $("#show").append(row);
          document.getElementById("delete_"+value.id).addEventListener('click',()=>{
          rurl=url+value.id+"?access_token="+access_token; 
            $.ajax({
            url: rurl,
            method: 'DELETE',
            success: function(result) {
                alert("Delete succeed");
            }
          });
        })
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
$(".delete_btn").click(function (){
  console.log('clicked 2');
})
