$("#Get_btn").click(function(){
var json = $.getJSON( "../data.json", function(data) { 
    $.get(data.url+"access_token="+data.access_token, function(data2, status){
      console.log(data2)
      $.each(data2.data, function( index, value ) {
        console.log(value.created_time)
        var row = $("<tr><td>" + "&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>" +"&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td>" + "&emsp;&emsp;Content:&emsp;"+value.message + "</td></tr>");
        $(".get").append(row);
     });
    });
  }) 
});
$("#Post_btn").click(function(){
  var txt = "test123"
  var postApi=data.url+"access_token="+data.access_token +'&'+'message='+"\""+txt+"\""
});