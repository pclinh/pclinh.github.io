$.getScript("./js/fbsdk.js");
console.log("3");
var gb_id = "";
var per_url = "";

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

$("#cmt_filter").click(function () {
  const content = $("#ip_filter").val();
  cmt_filter(gb_id, per_url, content)
})
$("#post_delete_btn").click(function () {
  delete_post(gb_id);
})
function insert_post(id) {
  category_id = $("#title").val();
  $.ajax({
    type: "POST",
    url: "php/insert_data.php",
    data: {
      "id": id,
      "category_id": category_id
    },
    dataType: "json",
    success: function (rpData) {
      console.log(rpData);
    }
  });
}
