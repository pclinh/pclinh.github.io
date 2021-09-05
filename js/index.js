console.log("13");
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
     window.location.href='index.html';
   }
 }
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
$("#Get_btn").click(function get_clicked(){
  $("#show").replaceWith('<p id="show"></p>');
  $.get(url1+"access_token="+access_token+"&fields=id,permalink_url,message,created_time", async function(data2, status){
   await $.each(data2.data, function( index, value ) {
     var limitW = 10;
      //Số ký tự của từ
      var char = 4;
      var txt = value.message;
      var txtStart = txt.slice(0,limitW).replace(/\w+$/,'');
        console.log(txtStart);
      var txtEnd = txt.slice(txtStart.length);
      if ( txtEnd.replace(/\s+$/,'').split(' ').length > char ) {
        var showtxt = textStart+"<a>...more</a>";
      }
    var row = $("<tr><td>&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td class='show_content'id='Show_"+value.id+"'>&emsp;&emsp;Content:&emsp;"+showtext + "</td><td><button class=\"delete_btn\" id=\'delete_"+value.id+"\'>delete</button></td><td><button class=\"update_btn\" id=\'update_"+value.id+"\'>update</button></td></tr>");
    idshow = "'#Show_"+value.id+"'";
     console.log(idshow);
     var content = " <div class='fb-post' data-href='"+value.permalink_url +"' data-width='500'>12</div>";
    $("#show").append(row)
           document.getElementById("update_"+value.id).addEventListener('click',()=>{
             var content = "<div class='fb-post' data-show-text='true' data-href='"+value.permalink_url +"' data-width='500'></div>";
             function setAttr(){
              document.querySelector("#showPost").setAttribute('class', 'fb-post' );
              document.querySelector("#showPost").setAttribute('data-href', permalink_url);
              document.querySelector("#showPost").setAttribute('data-width', 500);
             }
             window.location.href='./show.html';
            });
     
          document.getElementById("delete_"+value.id).addEventListener('click',()=>{
          rurl=url+value.id+"?access_token="+access_token; 
            $.ajax({
            url: rurl,
            method: 'DELETE',
            success: function(result) {
                alert("Delete succeed");
                get_clicked();
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

