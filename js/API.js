console.log("14");
$.getScript("./js/fbsdk.js");
var message="";
$("#get_btn").click(function get_clicked(){
  $("#show").replaceWith('<p id="show"></p>');  
  $.get(url1+"access_token="+access_token+"&fields=id,permalink_url,message,created_time", async function(data2, status){
   await $.each(data2.data, function( index, value ) {
     var limitW = 10;
      //Số ký tự của từ
      var char = 4;
      var showtxt = value.message;
      var txtStart = showtxt.slice(0,limitW);
        console.log(txtStart);
      var txtEnd = showtxt.slice(txtStart.length);
      if ( showtxt > limitW ) {
          showtxt = txtStart+"...";
      }
    var row = $("<tr><td>&emsp;&emsp;ID:&emsp;"+value.id + "</td><td>&emsp;&emsp;Created time:&emsp; "+value.created_time+ "</td><td class='show_content'id='Show_"+value.id+"'>&emsp;&emsp;Content:&emsp;"+showtxt + "</td><td><button class=\"detail_btn\" id=\'detail_"+value.id+"\'>detail</button><td><button class=\"delete_btn\" id=\'delete_"+value.id+"\'>delete</button></td><td><button class=\"update_btn\" id=\'update_"+value.id+"\'>update</button></td></tr>");
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
$("#photo_upload").change(function(evt){
    alert("trggied");
  var fileReader = new FileReader();
  var files = evt.target.files;
  console.log(files);
  var file = files[0];
  console.log(file);
  var x= $("#editor_forms").append("source",file);
  console.log(x)
  });


$("#post_btn").click(async function(){
    console.log(access_token)
    message=document.getElementById("post_content").value
    if(document.getElementById("post_content").value==""){
      alert("Vui lòng nhập nội dung");
    }
    else if($("#photo_upload").prop('files').length==0){ 
       message=document.getElementById("post_content").value;
      console.log(message) 
      FB.api(
      '102135788849157/feed',
      'POST',
      {
        "message":document.getElementById("post_content").value,
        "access_token":access_token},
      function(response) {
          console.log(response);
      }
    );      
  }else{
    console.log(message)
    FB.api(
    '/102135788849157/photos',
    'POST',
    {
    "message":document.getElementById("post_content").value,
    "access_token":access_token
    },
    function(response) {
        // Insert your code here
    })
}
});
