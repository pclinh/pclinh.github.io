var access_token="";
window.fbAsyncInit = function(){
  FB.init({
    appId      : '1229103174227463',
    cookie     : true,
    xfbml      : true,
    version    : 'v12.0'
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
    await FB.api(
    '/102135788849157/insights/page_fans',
    'GET',
    {"date_preset":"today",
     "access_token":access_token 
    },
    function(response) {
      console.log(response)
        const fol = response.data[0].values[0].value
        console.log(fol)
        $("#show_follower").text(fol);
    }
);
await FB.api(
  '/102135788849157/insights/page_post_engagements/days_28',
  'GET',
  {"date_preset":"yesterday",
  "access_token":access_token },
  function(response) {
      const fol = response.data[0].values[0].value
        console.log(fol)
        $("#show_month_engagements").text(fol);
  }
);
   } else {
     console.log('Not authenticated');
     
   }
 }
function checkLoginState(){
  FB.getLoginStatus(function(response){
    statusChangeCallback(response);
   })
}
function login (){
        FB.logout(function(response){
          console.log(response);
      });
    }
function logout (){
        FB.logout(function(response){
          console.log(response);
            window.location.href='index.html';
      });
    }
 
