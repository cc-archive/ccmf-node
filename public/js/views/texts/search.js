jQuery(document).ready(function(){
	
	jQuery('#search-btn')
	.mouseenter(function(){
		jQuery(this).addClass('btn-info');
	})
	.mouseleave(function(){
		jQuery(this).removeClass('btn-info');
	});
	
});