$(document).ready(function()
{
	/*$("#newImage").each(function() {
        	$(this).find('input').keypress(function(e) {
            	// Enter pressed?
            	if(e.which == 10 || e.which == 13) {
                	this.form.submit();
            	}
			}
        });*/
	$("#newImage").submit(function(e)
	{
		e.preventDefault();
		saveImage();
	});
	getImages();
});
function getImages()
{
	var Image=Parse.Object.extend("Page");
	var query=new Parse.Query(Image,{
	      success: function(query)
		{
			alert('$(".success").show();');
		},
	      error: function(query, error)
		  {
			alert('$(".error").show();');
			}
	      });
	query.descending("CreatedAt");
	query.limit(10);
	query.find(
	{
		success:function(results)
		{
			var template=Handlebars.compile($("#xyz").html());
			$(results).each(function(i,e)
			{
				var q=e.toJSON;
				$("#qL").append(template(q));
			});
		},
		error:function(error)
		{
			alert('Failed'+error.description);
		}
	});
}
function saveImage()
{
	var imageLink=$("#imageLink").val();
	var Image=Parse.Object.extend("Page");
	var image=new Image();
	image.set("imageLink",imageLink);
	image.save(null,
	{
		success:function(image)
		{
			alert('saved');
		},
		error:function(error)
		{
			alert('Failed'+error.description);
		}
	});
}