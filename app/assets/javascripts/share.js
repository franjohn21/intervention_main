var share = (function(){
	var clicks = 0;

	function incrementClicks(){
		clicks++;
        var percent = Math.min(Math.round(clicks / 3 * 100), 100);
        $('#percent').width(percent + '%');
        $('#percentage').text(percent + '%');
	}

	function shareOnFacebook(e){
		var w = 580, h = 300,left = (screen.width/2)-(w/2),top = (screen.height/2)-(h/2);
		e.preventDefault();
		incrementClicks();
		window.open ('http://www.facebook.com/share.php?u=http://kck.st/1uWhteU', '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}

	function shareOnTwitter(e){
		var title = "Help support Intervention: A Party Game for Everyone's Worst Habits on Kickstarter!", w = 580, h = 300, left = (screen.width/2)-(w/2), top = (screen.height/2)-(h/2);
		e.preventDefault();
		incrementClicks();
		window.open ('http://twitter.com/share?text=' + title + '&url=http://kck.st/1oCuyqY', '', 'height=' + h + ', width=' + w + ', top='+top +', left='+ left +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
	}

	function viewKickstarter(e){
		e.preventDefault();
		incrementClicks();
		console.log("why double")
		window.location.href = "http://kck.st/1srNSmc";
	}

	function bindEvents(){
		$('.facebook_share').on("click", shareOnFacebook);
		$('.twitter_share').on("click",shareOnTwitter);
		$('.kick_share').on("click",viewKickstarter);
	}

	return {
		bindEvents: bindEvents
	}
})(); 

$(function() {
    share.bindEvents();
});