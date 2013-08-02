jQuery(document).ready(function(){
	
	var currentLocArr = window.location.pathname.split("/");
	
	var currentLoc = currentLocArr[1];
	
	if(currentLoc!==""){
		jQuery('.navbar-items a').each(function(index) {
			
			/* Get the controller name */
			var linkLocArr = this.href.split("/");
			
			var linkLoc = linkLocArr[3];
			
			if(linkLoc == currentLoc){
	            jQuery(this).closest('li.menu-item').addClass("active");
			}else{
				jQuery(this).closest('li.menu-item').removeClass("active");
			}
		});
	}
});