jQuery(document).ready(function(){
	jQuery('#navbar-items a').each(function(index) {
		
		/* Get the controller name */
		var pathArr = window.location.pathname.split("/");
		
		var control = pathArr[1];
		
		var currentLocArr = this.href.split("/");
		
		var currentControl = currentLocArr[3];
		
		if(currentControl == control){
            jQuery(this).closest('li.dropdown').addClass("active");
		}else{
			jQuery(this).closest('li').removeClass("active");
		}
	});
});