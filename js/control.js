$(".post_ctrl_btn").click( function(){
    window.location.href="post.html"
});
$(".back_btn").click( function(){
    $("#main_ctrl").css("visibility","visible");
    $("#post_ctrl").css("visibility","hidden");
})
$("#post_create_btn").click(function(){
    $("#show").replaceWith('<p id="show"></p>');
    $("#editor_forms").css({"visibility":"visible","width": "50%","height": "500px",})
    $("#post_ctrl").css("visibility","hidden");
})
$("#cancel_btn").click(function(){
    $("#editor_forms").css({"visibility":"hidden","width": "0","height": "0",})
    $("#post_ctrl").css("visibility","visible");
})
