window.fbAsyncInit = function() {
  FB.init({
    appId      : '1229103174227463',
    cookie     : true,
    xfbml      : true,
    version    : 'v11.0'
  }); 
$("#Get_btn").click(function(){
    $.get(response.authResponse.url+"access_token="+response.authResponse.accessToken, function(data2, status){
      console.log(data2)
      $.each(data2.data, function( index, value ) {
        console.log(value.created_time)
        var row = $("<tr><td>" + "&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>" +"&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>" + "&emsp;&emsp;Content:&emsp;"+value.message + "</td></tr>");
        $(".get").append(row);
     });
    });
  })
}