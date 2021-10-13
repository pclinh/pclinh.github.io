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
    if(window.location.href=="https://pclinh.github.io/homepage.html"){
      FB.api(
    '/102135788849157/insights/page_fans',
    'GET',
    {"date_preset":"today",
     "access_token":access_token 
    },
    function(response) {
      console.log(response)
        const fol = response.data[0].values[0].value
        $("#fol_count").text("Tổng số người thích trang:           "+fol);
    }
    );
  FB.api(
  '/102135788849157/insights/page_post_engagements/days_28',
  'GET',
  {"date_preset":"yesterday",
  "access_token":access_token},
  function(response) {
      const enga = response.data[0].values[0].value
        $("#month_like_count").text("Lượt tương tác bài viết trong một tháng vừa qua:           "+enga);
  }
);
FB.api(
  '/102135788849157/insights/page_impressions_unique/days_28',
  'GET',
  {"date_preset":"yesterday",
  "access_token":access_token},
  function(response) {
      const impres = response.data[0].values[0].value
        $("#month_impres_count").text("Số người tiếp cận được trong một tháng vừa qua:           "+impres);
  }
);

    }
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
        FB.login(function(response){
          if(response.status=='connected')
            window.location.href="homepage.html"
      });
    }
function logout (){
        FB.logout(function(response){
          if(response.status!='connected')
            window.location.href="index.html"
      });
    }
 
