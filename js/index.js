access_token='';
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
     console.log('5');
    /*var access_token =$.parseJSON($.getJSON("https://graph.facebook.com/102135788849157?fields=access_token&access_token="+response.authResponse.accessToken, function(data, status){
    
    });).responseJSON.access_token;*/
    
     await  $.ajax({ 
        type: 'GET', 
        url: 'https://graph.facebook.com/102135788849157?fields=access_token&access_token='+response.authResponse.accessToken, 
        data: { get_param: 'value' },
        success: function (data) {
         access_token=data.access_token;
          console.log(access_token);
        },
    }).catch(e => {
    console.log(e);
});
    var url1 = 'https://graph.facebook.com/v11.0/102135788849157/feed?';
        $("#Get_btn").click(function (){ 
         var content="";
       $.get(url1+"access_token="+access_token, function(data2, status){
         console.log(data2)
         $.each(data2.data, function( index, value ) {      
           var row ="<tr><td>" + "&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>" +"&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>" + "&emsp;&emsp;Content:&emsp;"+value.message + "</td></tr>";
            content+=row;
         });
       });
          console.log(content);
       $("#show").replaceWith(content);
     });
   $("#Post_btn").click(function (){ 
     message=document.getElementById("post_content").value;
    $.post(url1+"access_token="+access_token+"&message="+message, function(data2, status){
      alert('post thành công');
    });
  } 
);
   } else {
     console.log('Not authenticated');
   }
 }
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
function logout (){
      FB.logout(function(response){
          window.location.href='index.html'
    });
  }
 
