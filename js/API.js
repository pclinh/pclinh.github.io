console.log("1")
var message;
var multi = false;
var formData;
var type;
var scheduled_time = "";
var engagemet_count;
$.getScript("./js/index.js");
var values = $(this).serialize();
$.ajax({
  method: "post",
  url: "./php/avg_engagement.php",
})
  .done(function (response) {
    console.log(response);
    if (response.result !== "NOT_GOOD") {
      $.each(response.data, function (key, value) {
        console.log(response.data);
      })
    }
    else { }
  });


$("#photo_upload").change(function () {
  formData = new FormData();
  formData.append("access_token", access_token);
  if ($("#photo_upload").prop("files").length > 1) {
    multi = true;
  } else {
    multi = false
  }
  for (let i = 0; i < $("#photo_upload").prop("files").length; i++) {
    const fileReader = new FileReader();
    const file = document.getElementById("photo_upload").files[i];
    fileReader.onload = () => {
      type = file.type;
      const data = new Blob([fileReader.result], { name: ".mp4", }, { type: file.type, });
      var fileOfBlob = new File([data], '.mp4')
      formData.append("source" + i, fileOfBlob);
      for (var value of formData.values()) {
        console.log(value);
      }
    };
    fileReader.readAsArrayBuffer(file);
  }
})
function delete_post(id) {
  FB.api(
    id,
    'DELETE',
    {
      "access_token": access_token
    },
    function (response) {
      alert("Xoá thàng công");
      $(".selected_post").removeClass("selected_post")
      $("#" + id).addClass("selected_post");
      $("#postdtail").replaceWith("<div id='postdtail'></div>");
      getPost();
    })
}
$("#post_btn").click(async function () {
  if ($("#schedule").prop('checked') == true) {
    const time = $("#schedule_date").val() + " " + $("#schedule_time").val();
    scheduled_time = await change_time(time);
  }
  message = document.getElementById("post_content").value;
  if (message == "") {
    alert("Vui lòng nhập nội dung");
  } else if ($("#title").val() == "0") {
    alert("Hãy chọn chủ đề");
  } else if ($("#photo_upload").prop("files").length == 0) {
    message = document.getElementById("post_content").value;
    console.log(scheduled_time)
    FB.api(
      "102135788849157/feed",
      "POST",
      {
        message: message,
        published: false,
        access_token: access_token,
        scheduled_publish_time: scheduled_time
      },
      function (response) {
        console.log(response.id);
        insert_post(response.id);
      }
    );
  } else {
    if (type.search("image") >= 0 && multi == false) {
      formData.append("message", message);
      formData.append("scheduled_publish_time", scheduled_time);
      await fetch("https://graph.facebook.com/102135788849157/photos", {
        body: formData,
        method: "post",
      })
        .then(response => response.json())
        .then(data => insert_post(data.post_id))
        .then(getPost());
    }
    else if (type.search("image") >= 0 && multi == true) {
      formData.append("message", message);
      formData.append("scheduled_publish_time", scheduled_time);
      await fetch("https://graph.facebook.com/102135788849157/photos", {
        body: formData,
        method: "post",
      })
        .then(response => response.json())
        .then(data => insert_post(data.post_id))
        .then(getPost());
    }
    else if (type.search("video") >= 0) {
      await formData.append("description", message);
      await formData.append("scheduled_publish_time", scheduled_time);
      await fetch("https://graph.facebook.com/102135788849157/videos", {
        body: formData,
        method: "post",
      })
        .then(response => response.json())
        .then(data => insert_post(data.post_id))
        .then(getPost());
    }
  }
  $("#editor_forms").css({ "visibility": "hidden", "width": "0", "height": "0", })
});

function engagement() {
  engagemet_count = 0;
  FB.api(
    '/102135788849157_130774692651933/reactions',
    'GET',
    { access_token: access_token },
    function (response) {
      engagemet_count += response.data.length;
      console.log(response.data.length)
    }
  );
  FB.api(
    '/102135788849157_130774692651933/comments',
    'GET',
    { access_token: access_token },
    function (response) {
      engagemet_count += response.data.length;
      console.log(response.data.length)
      console.log(engagemet_count)
    }
  );
  return engagemet_count;
}
function getPost() {
  $("#post_selection").replaceWith('<div id="post_selection"></div>');
  FB.api(
    "/102135788849157/feed",
    "GET",
    {
      access_token: access_token,
      fields: "id,permalink_url,message,created_time",
    },
    async function (response) {
      if (response && !response.error) {
        $.each(response.data, async function (index, value) {
          if (value.message != null) {
            var showtxt = await show(value.message)
          } else {
            var showtxt = ""
          }
          showtime = await create_time(value.created_time)
          var row = $("<div class='select_post' id=" + value.id + ">" + showtxt + "<div class='select_post_createtime'> " + showtime + "</div></div>");
          await $("#post_selection").append(row);
          document.getElementById(value.id).addEventListener('click', async () => {
            show_post(value.id, value.permalink_url);
            cmt(value.id, value.permalink_url);
          });
          $(".select_post").css({ "color": "beige", "padding-top": "20px", "height": "50px" });
          $(".select_post_createtime").css({ "float": "right" });
          $(".select_post").hover(function () {
            $(this).css({ "cursor": "pointer", "background-color": "rgba(9, 7, 44, 0.274)" });
          }, function () {
            $(this).css({ "background-color": "transparent" });
          });
          $(".cmt_link").css({ "color": "beige", "padding-top": "20px", "height": "50px" });
          $(".cmt_link").hover(function () {
            $(this).css({ "cursor": "pointer", "background-color": "rgba(9, 7, 44, 0.274)" });
          }, function () {
            $(this).css({ "background-color": "transparent" });
          });
        });
      }
    }
  )
}
function show_post(id, permalink) {
  gb_id = id;
  per_url = permalink;
  $(".selected_post").removeClass("selected_post")
  $("#" + id).addClass("selected_post");
  $("#postdtail").replaceWith("<div id='postdtail'></div>");
  FB.api(
    '/oembed_post',
    'GET',
    { "url": permalink, "maxwidth": "730", "useiframe": "true" },
    function (response) {
      $("#postdtail").append(response.html);
      // document.getElementById("post_delete_btn").addEventListener('click', delete_post.bind("click", id));
      $("iframe").css("background-color", "whitesmoke");
    })
}
function cmt_filter(id, permalink_url, content) {
  FB.api(
    id + "/comments",
    'GET',
    {
      "access_token": access_token
    },
    async function (response) {
      $("#comment_detail").replaceWith("<div id='comment_detail'></div>")
      if (response && !response.error) {
        await $.each(response.data, async function (index, value) {
          if (value.message.search(content) != -1) {
            var cmt_detail = "<div class=cmt_link id=" + value.id + ">" + value.from.name + ": " + value.message + "</div>";
            $("#comment_detail").append(cmt_detail);
            document.getElementById(value.id).addEventListener('click', async () => {
              const cmt_id = value.id.slice(value.id.search("_") + 1, value.id.length)
              console.log(cmt_id)
              const cmt_url = permalink_url + "&comment_id=" + cmt_id;
              window.open(cmt_url);
            });
          }
        }
        );
      }
    }
  );
}
function cmt(id, permalink_url) {
  FB.api(
    id + "/comments",
    'GET',
    {
      "access_token": access_token
    },
    async function (response) {
      $("#comment_detail").replaceWith("<div id='comment_detail'></div>")

      if (response && !response.error && response != null) {
        await $.each(response.data, async function (index, value) {
          var cmt_detail = "<div class=cmt_link id=" + value.id + ">" + value.from.name + ": " + value.message + "</div>";
          console.log(cmt_detail);
          $("#comment_detail").append(cmt_detail);
          document.getElementById(value.id).addEventListener('click', async () => {
            const cmt_id = value.id.slice(value.id.search("_") + 1, value.id.length)
            console.log(cmt_id)
            const cmt_url = permalink_url + "&comment_id=" + cmt_id;
            window.open(cmt_url);
          });
        }
        );
      }
    }
  );
}
