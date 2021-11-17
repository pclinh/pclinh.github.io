$(".post_ctrl_btn").click(function () {
    window.location.href = "post.html"
});
$(".back_btn").click(function () {
    window.location.href = "homepage.html"
})
$("#post_create_btn").click(function () {
    $("#title").empty();
    $("#title").append($('<option>', {
        value: "0",
        text: "Chọn chủ đề...."
    }));
    $.ajax({
        type: "POST",
        url: "php/get_category.php",
        dataType: "json",
        success: function (response) {
            if (response.result !== "NOT_GOOD") {
                $.each(response.data, function (key, value) {
                    $("#title").append($('<option>', {
                        value: value.id,
                        text: value.name
                    }));
                });
            } else {
            }
        }
    });
    $("#show").replaceWith('<p id="show"></p>');
    $("#editor_forms").css({ "visibility": "visible", "width": "50%", "height": "500px", })
    $("#post_ctrl").css("visibility", "hidden");
})
$("#cancel_btn").click(function () {
    $("#editor_forms").css({ "visibility": "hidden", "width": "0", "height": "0", })
    $("#post_ctrl").css("visibility", "visible");
})
