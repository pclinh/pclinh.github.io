console.log("12")
var message;
var multi=false;
var formData;
var type;
var scheduled_time="";
$.getScript("./js/index.js");

$(".select_post").click(function(){
  var x= $(".selected_post").id;
  console.log(x);
})
$("#photo_upload").change(function(){
formData = new FormData();
formData.append("access_token",access_token);
  if($("#photo_upload").prop("files").length > 1){
        multi=true;
  }else{
        multi=false
}
for (let i = 0; i < $("#photo_upload").prop("files").length; i++){
    const fileReader = new FileReader();
    const file = document.getElementById("photo_upload").files[i];
    fileReader.onload = () =>{
       type= file.type;
       const data = new Blob([fileReader.result],{name:".mp4",},{type:file.type,});
        var fileOfBlob = new File([data], '.mp4')
        formData.append("source"+i, fileOfBlob);
          for (var value of formData.values()) {
               console.log(value);
            }
        };
        fileReader.readAsArrayBuffer(file);
        }
})
$("#get_btn").click(function get_clicked(){
  $("#post_selection").replaceWith('<div id="post_selection"></div>');
  FB.api(
    "/102135788849157/feed",
    "GET",
    {
     access_token: access_token,
     fields:"id,permalink_url,message,created_time",
    },
   async function (response){
      if (response && !response.error){
      $.each(response.data,async function (index, value){
            if(value.message != null){
                 var showtxt = await show(value.message)
            }else{
                  var showtxt =""
            }
          showtime= await create_time(value.created_time)
      var row = $("<div class='select_post' id="+value.id+">"+showtxt+"<div class='select_post_createtime'> "+showtime+"</div></div>");
      await $("#post_selection").append(row)
      document.getElementById(value.id).addEventListener('click', () =>{
        $(".selected_post").removeClass("selected_post")
        $("#"+value.id).addClass("selected_post");
      });
       /* 
     
     document.getElementById("delete_" + value.id).addEventListener('click', () =>{
        var url ="https://graph.facebook.com/v11.0/"+value.id+"?access_token=" + access_token;
       $.ajax({
          url:url,
          method: 'DELETE',
          success: function (result) {
            alert("Delete succeed");
          }
        });
      })
      */
      $(".select_post").css({"color":"beige","padding-top": "20px", "height":"50px"});
      $(".select_post_createtime").css({  "float":"right"});
      $(".select_post").hover(function(){
        $(this).css({"cursor":"pointer","background-color":"rgba(9, 7, 44, 0.274)"});
            }, function(){
         $(this).css({"background-color":"transparent"});
        });
    });    
  }}
  )}
)

$("#post_btn").click(async function(){
  if($("#schedule").prop('checked')== true){
    const time = $("#schedule_date").val()+" "+$("#schedule_time").val();
    scheduled_time= await change_time(time);
  }
  message = document.getElementById("post_content").value;
  if (message == "") {
    alert("Vui lòng nhập nội dung");
  } else if ($("#photo_upload").prop("files").length == 0) {
    message = document.getElementById("post_content").value;
    console.log(scheduled_time)
    FB.api(
      "102135788849157/feed",
      "POST",
      {
        message: message,
        published:false,
        access_token: access_token,
        scheduled_publish_time:scheduled_time
      },
      function(response) {
        console.log(response);
      }
    );
  } else {
      if(type.search("image")>=0 && multi==false){
        formData.append("message", message);
        formData.append("scheduled_publish_time",scheduled_time);
        await fetch("https://graph.facebook.com/102135788849157/photos",{
            body:formData,
            method: "post",
          })
        .then(response => response.json())
        .then(data => alert(data))
      }
        else if(type.search("image")>=0 && multi==true){
          formData.append("message", message);
          formData.append("scheduled_publish_time",scheduled_time);
          await fetch("https://graph.facebook.com/102135788849157/photos",{
            body:formData,
            method: "post",
          })
        .then(response => response.json())
        .then(data => alert(data))
        }
      else if(type.search("video")>=0){
            await formData.append("description", message);
            await formData.append("scheduled_publish_time",scheduled_time);
            await fetch("https://graph.facebook.com/102135788849157/videos",{
            body:formData,
            method: "post",
          })
        .then(response =>{if(!response.error)alert("Đăng bài thành công")})
        .then(data => console.log(data));
        }
    }
});
