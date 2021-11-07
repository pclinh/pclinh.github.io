$.getScript("./js/fbsdk.js");
console.log("3");
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
            $("#cmt_filter").off('click')
            $("#delete_post").off('click')
            await show_post(value.id, value.permalink_url);
            await cmt(value.id, value.permalink_url);
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
  $(".selected_post").removeClass("selected_post")
  $("#" + id).addClass("selected_post");
  $("#postdtail").replaceWith("<div id='postdtail'></div>");
  FB.api(
    '/oembed_post',
    'GET',
    { "url": permalink, "maxwidth": "730", "useiframe": "true" },
    function (response) {
      $("#postdtail").append(response.html);
      document.getElementById("post_delete_btn").addEventListener('click', () => {
        delete_post(id);
      })
    }
  );
  $("iframe").css("background-color", "whitesmoke");
}
function delete_post(id) {
  FB.api(
    id + "/",
    'DElETE',
    {
      "access_token": access_token
    },
    function (response) {
      alert("Xoá thàng công")
      getPost();
    })
}
function cmt_filter(id, permalink_url, content) {
  FB.api(
    id + "/",
    'GET',
    {
      "fields": "comments",
      "access_token": access_token
    },
    async function (response) {
      $("#comment_detail").replaceWith("<div id='comment_detail'></div>")
      if (response && !response.error) {
        Cốnle.log(response)
        await $.each(response.comments.data, async function (index, value) {
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
    id + "/",
    'GET',
    {
      "fields": "comments",
      "access_token": access_token
    },
    async function (response) {
      document.getElementById("cmt_filter").addEventListener('click', async () => {
        const content = $("#ip_filter").val();
        cmt_filter(id, permalink_url, content)
      });
      $("#comment_detail").replaceWith("<div id='comment_detail'></div>")
      if (response && !response.error && response.data != null) {
        await $.each(response.comments.data, async function (index, value) {
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
function show(messagetxt) {
  var showtxt = messagetxt;
  var limitW = 20;
  var txtStart = showtxt.slice(0, limitW);
  if (messagetxt.length > limitW) {
    showtxt = txtStart + "...";
  }
  return showtxt;
}

function create_time(date) {
  var d = new Date(date)
  dt = d.toLocaleDateString('en-GB');
  time = d.toLocaleTimeString('en-GB');
  showtime = dt + " " + time;
  return showtime;
}
function change_time(time) {
  console.log(time)
  const d = new Date(time)
  return d.toISOString();
}
