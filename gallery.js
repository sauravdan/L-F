$(document).ready(function()
{
	$("#signup").submit(function(e)
	{
		e.preventDefault();
		saveUser();
	});
	$("#signin").click(function(e)
	{
		var user = new Parse.User();
		var username=$("#signin_username").val();
		user.set("username", username);
		var password=$("#signin_password").val();
		
		Parse.User.logIn(username, password,
		{
			success: function(user)
			{
		
				window.open("file:///C:/Users/Acer/Documents/SE%20Project/user.html","_self");
			},
			error: function(user, error)
			{
				//	alert("Error: " + error.code + " " + error.message);
				alert("error  incorrect password");
			}	
		});
	});
	$("#fileUploadBtn").on("click", function(e)
	{
		var user=Parse.User.current();
		saveData(user);
	});
		
	getData();

});
function saveUser()
{
	var user = new Parse.User();
	var username=$("#username").val();
	user.set("username", username);
	var password=$("#password").val();
	user.set("password", password);
	
	user.signUp(null, {
		success: function(user)
		{
			window.open("file:///C:/Users/Acer/Documents/SE%20Project/user.html","_self");
		},
		error: function(user, error)
		{
			alert("Error: " + error.code + " " + error.message);
		}	
	});
}
function saveData(user)
{
	var Image=Parse.Object.extend("Page");
	var image=new Image();
	var firstName=$("#firstName").val();
	var lastName=$("#lastName").val();
	var age=$("#age").val();
	//var sex=$('input[name=sex]:checked','#user').val();
	var sex=$('input[name=sex]:checked').val();
	var complexion=$('select[name=complexion] option:selected').val();
	//image.set("sex",sex);
	var fileUploadControl = $("#fileUploader")[0];
	if (fileUploadControl.files.length > 0)
	{
		var file = fileUploadControl.files[0];
		var name = "photo.jpg";
		console.log("here goes nothing...");
		var parseFile = new Parse.File(name, file);
		parseFile.save().then(function()
		{
			image.set("user",user);
			image.set("firstName",firstName);
			image.set("lastName",lastName);
			image.set("age",age);
			image.set("picture",parseFile);
			image.set("sex",sex);
			image.set("complexion",complexion);
			image.save(null,
			{
				success: function (image)
				{
					console.log('saved');
					//getData();
					window.open("file:///C:/Users/Acer/Documents/SE%20Project/test.html","_self");
				},
				error: function (error)
				{
					alert('Failed' + error.description);
				}
			});
			console.log("Woot!");
			console.dir(arguments);
		},
		function(error)
		{
			console.log("Error");
			console.dir(error);
		});
	}
 /*},
error:function(error) {
console.log("error");
}
});*/
}
function getData()
{
	var Image=Parse.Object.extend("Page");
	var query=new Parse.Query(Image);
	query.descending("createdAt");
	query.limit(10);
	query.find({
		success:function(results) {
			//for(var i=0;i<=results.length;i++)
			//var template=Handlebars.compile($("#single-image-template").html());
			/*$(results).each(function(i,e)
			{
				var q=e.toJSON();
				var profilePhoto = results[0].get("picture");
				var s="";
				q += profilePhoto.url();
				$("#lList").append(template(q));
			});*/
			var s="";
			$(results).each(function(i,e)
			{
				//s +="<div class='rowDividerGrid entireRowGrid'></div>";
				s += "<div style='display:block;width:614px;margin-left:auto;margin-right:auto'>";
				s += "<div style='border-style:solid;border-width:1px;border-radius:3px;border-color:threedface;box-shadow: 0px 1px 0px 0px #d8deeb;margin-top:8px;overflow:hidden;background-color:#fff'>";
				s += "<div style='display:block;overflow:hidden;text-overflow:ellipsis'>";
				//s += results[i].get("text");
				var pic = results[i].get("picture");
				if(pic)
				{
					s += "<a style='display:block;border-top-left-radius:3px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:3px;float:left'><img style='display:block' src='" + pic.url() + "' width='168' height='168'></a>";
				}
				s += "<div style='display:block;overflow:hidden'>";
				s += "<div style='overflow:auto;margin-top:12px;margin-left:16px;margin-right:16px;margin-bottom:0px;max-width:1200px;max-height:165px'>";
				s += "<div style='font-size:16px;font-weight:bold'>";
				s += results[i].get("firstName");
				s += " ";
				s += results[i].get("lastName");
				s += "</div>";
				s += "<div style='font-size:16px'>";
				s += results[i].get("sex");
				s += "</div>";
				s += "<div style='font-size:16px'>";
				s += results[i].get("age");
				s += "</div>";
				s += "<div style='font-size:16px'>";
				s += results[i].get("complexion");
				s += "</div>";
				s += "<div style='font-size:16px'>";
				s += "Submitted on "+results[i].createdAt;
				s += "</div>";
				s += "</div>";
				s += "</div>";
				s += "</div>"
				s += "</div>";
				s += "</div>";
			});
			$("#lList").html(s);
		}
	});
}