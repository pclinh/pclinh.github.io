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

   function statusChangeCallback(response){
     if(response.status === 'connected'){
      console.log('Logged in and authenticated');
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
      });
    }