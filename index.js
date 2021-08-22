window.fbAsyncInit = function() {
  FB.init({
    appId      : '1229103174227463',
    cookie     : true,
    xfbml      : true,
    version    : 'v11.0'
  });
  consloe.log(fb.accessToken);
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

 function statusChangeCallback(response){
   if(response.status === 'connected'){
    console.log('Logged in and authenticated');
    var access_token = response.authResponse.accessToken;
    }
        else {
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
 function get(access_token)
 { var url1 = 'https://graph.facebook.com/v11.0/102135788849157/feed?';
    $.get(url1+"access_token="+access_token, function(data2, status){
      console.log(data2)
      $.each(data2.data, function( index, value ) {
        console.log(value.created_time)
        var row = $("<tr><td>" + "&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>" +"&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>" + "&emsp;&emsp;Content:&emsp;"+value.message + "</td></tr>");
        $(".get").append(row);
     });
    });
  }

