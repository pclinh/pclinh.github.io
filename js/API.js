console.log("18")
$.getScript("./js/fbsdk.js");
var message;

$("#get_btn").click(function get_clicked(){
  $("#show").replaceWith('<p id="show"></p>');
  FB.api(
    "/102135788849157/feed",
    "GET",
    {access_token: access_token,
     fields:"id,permalink_url,message,created_time",  
    },
    async function (response)
      if (response && !response.error){
        alert("succeed")
        console.log(response)
      }
   );
})

$("#post_btn").click(function() {
  console.log(access_token);
  message = document.getElementById("post_content").value;
  if (message == "") {
    alert("Vui lòng nhập nội dung");
  } else if ($("#photo_upload").prop("files").length == 0) {
    message = document.getElementById("post_content").value;
    console.log(message);
    FB.api(
      "102135788849157/feed",
      "POST",
      {
        message: message,
        access_token: access_token,
      },
      function(response) {
        console.log(response);
      }
    );
  } else {
    	var formData = new FormData();
    formData.append("access_token", access_token);
    formData.append("message", message);
    const prom = async () => {
      try {
        for (let i = 0; i < $("#photo_upload").prop("files").length; i++) {
          const fileReader = new FileReader();
          const file = document.getElementById("photo_upload").files[i];
          fileReader.onloadend = async () => {
            const photoData = new Blob([fileReader.result], {
              type: file.type,
            });
            await formData.append("source"+i, photoData);
            for (var value of formData.values()) {
              console.log(value);
            }
          };
          fileReader.readAsArrayBuffer(file);
          //resolve(photoData);
        }
        return formData;
      } catch (err){}
    };
    const data= prom();
      fetch("https://graph.facebook.com/102135788849157/photos",{
        body: formData,
        method: "post",
      });
    };
});
