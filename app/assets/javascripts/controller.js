var controller = (function(){
	var curr_timeout; 
	var current =$(window).scrollTop();
	var quotes = [
    {"quote": "A hilarious way to get to know your friends and yourself a little better.", "attribution": "Desiree Choy", "link_name": "Jetset Times", "link": "http://jetsettimes.com/2014/11/12/intervention-the-most-hilarious-way-to-get-to-know-your-flatmates/"},
    {"quote": "It's the antidote to the boring party game.", "attribution": "Bayard Catron", "link_name": "Game Theory", "link": "http://spielnacht.blogspot.com/2014/11/intervention-is-re-implementation-of.html"},
    {"quote": "All of the anal organization and over planning has yielded some rather hilarious content.", "attribution": "Danielle Palmer-Friedman", "link_name": "The Daily at the University of Washington", "link": "http://dailyuw.com/archive/2014/11/12/arts-leisure/new-party-game-asks-tough-questions#.VGN0d_ldWSo"},
    {"quote": "The gameplay of Intervention is quite simple but clever.", "attribution": "Chris James", "link_name": "Casual Game Revolution", "link": "http://casualgamerevolution.com/blog/2014/11/kickstarter-preview-explore-your-bad-habits-with-intervention"},
    {"quote": "The best parts of the 'social' board game.", "attribution": "Reed Campbell", "link_name": "Broadway Actor and Personality", "link": "https://twitter.com/reedcampbell90"},
    {"quote": "Laughs were had, drinks were drunk.", "attribution": "Forrest Bower", "link_name": "Bower's Game Corner", "link": "https://www.youtube.com/watch?v=WozjXYpSaUw"},
	];
	var quoteIndex = 0;


	function checkScroll(data){
		current = $(window).scrollTop();
		if(current < 400)
		{
			$("#navbar").addClass("transparent")
			$("#navbar .container-fluid").removeClass("shrink")
			//$(".landing_main").css("opacity",1.0/current)
			$(".landing_main").css("opacity",1)
			if(current > 30)
			{
				$(".landing_main").css("opacity",(0.95-(current/400)));

			}
			$(".navbar-right a").removeClass("btn btn-danger active")

		}
		else 
		{
			$(".landing_main").css("opacity",0);
			// $(".landing_main").fadeOut();
			$("#navbar").removeClass("transparent")
			$("#navbar .container-fluid").addClass("shrink")
			$(".navbar-right a").removeClass("btn btn-danger active")
			if (current > ($('.cards').first().offset().top)-150)
			{
				$("#nav-cards").addClass("btn btn-danger active")
			}
			else if(current > ($('.about').first().offset().top)-100)
			{
				$("#nav-about").addClass("btn btn-danger active")

			}
			else if(current > ($('.reviews').first().offset().top - 201))
			{
				$("#nav-reviews").addClass("btn btn-danger active")
			}
			
			if(current > $('.about').first().offset().top - 300)
			{
				$("#first_rule").addClass("fadeIn");
				$("#first_rule").show();
			}
			if(current > $('.about').first().offset().top - 150)
			{
				$("#second_rule").addClass("fadeIn");
				$("#second_rule").show();
			}
			if(current > $('.about').first().offset().top)
			{
				$("#third_rule").addClass("fadeIn");
				$("#third_rule").show();
			}
		}
	}

	function scrollToAbout(evt){
		evt.preventDefault();
		if($("#first_rule").hasClass("fadeIn"))
		{
			$('html, body').animate({
				scrollTop: ($('.about').first().offset().top)
			},1000);
		}
		else
		{
			$('html, body').animate({
    			scrollTop: ($('.about').first().offset().top-299),
    			easing: "easeOutQuart"
			},1500, function(){
				$('html, body').animate({
					scrollTop: ($('.about').first().offset().top - 149)
				},1500, function(){
					$('html, body').animate({
					scrollTop: ($('.about').first().offset().top + 1)
					},1000);
				});
			});
		}
	}

	function scrollToReview(evt){
		evt.preventDefault();
		$('html, body').animate({
		    scrollTop: ($('.reviews').first().offset().top) - 200,
		    easing: "easeOutQuart"
		},1000)
	}
	function scrollToCards(evt){
		evt.preventDefault();
		$('html,body').animate({
			scrollTop: ($('.cards').first().offset().top),
			easing: "easeOutQuart"
		},1000)
	}

	function addHatch(data){
		$("#ks_button").addClass("hatch")
		// setTimeout($("#ks_button").removeClass("hatch"),1000);
		clearTimeout(curr_timeout)
		curr_timeout = setTimeout(function(){$("#ks_button").removeClass("hatch")},3000)
		
	}
	function removeHatch(data){
		$(this).stop();
	}

	function rotateQuote(){
		quoteIndex = (quoteIndex + 1) % quotes.length;
		 $("#the_reviews").fadeOut(2500, function() { 
		 	$("#quote").text('"' + quotes[quoteIndex].quote + '"')
		 	$("#quote_author").text(" - " + quotes[quoteIndex].attribution)
		 	$("#quote_link").text(quotes[quoteIndex].link_name)
		 	$("#quote_link").attr("href",quotes[quoteIndex].link)
		 	rotateQuote();
		 }).fadeIn(2500);

	}
	function addNewPair(data)
	{
		$("#card1 p").fadeOut(500, function(){
			$("#card1").addClass("slideR");
			$("#card1 p").text(data.card1.content)
			$("#card1 span").attr("id",data.card1.id)
		}).fadeIn(500);

		$("#card2 p").fadeOut(500, function(){
			$("#card2").addClass("slideL");
			$("#card2 p").text(data.card2.content)
			$("#card2 span").attr("id",data.card2.id)
		}).fadeIn(500);
	
	}


	function handleVote(evt)
	{
		var winner, loser;
		if($(this)[0].id === "card1")
		{
			winner_id = $("#card1 span").attr("id")
			loser_id = $("#card2 span").attr("id")
			$("#card1").append("<i class='fa fa-check-circle-o checkmark'></i>")
			$("#card2").append("<i class='fa fa-times ex'></i> ")

		}
		else 
		{
			winner_id = $("#card2 span").attr("id")
			loser_id = $("#card1 span").attr("id")
			$("#card2").append("<i class='fa fa-check-circle-o checkmark'></i>")
			$("#card1").append("<i class='fa fa-times ex'></i>")
		}
		
		$(".checkmark").fadeOut(500, function(){
			$(".checkmark").remove();
		});
		$(".ex").fadeOut(500,function(){
			$(".ex").remove();
		});

		$("#card1").removeClass("slideR");
		$("#card2").removeClass("slideL");


		$.ajax({
			url: 'http://int-voting-api.herokuapp.com/api/v0/cardpair'
		}).done(addNewPair)

		$.ajax({
			url: 'http://int-voting-api.herokuapp.com/api/v0/cardpair',
			method: 'POST',
			data: {winner_id: winner_id, loser_id: loser_id, both_suck: false}
		})

	}

	function submitNew(evt){
		evt.preventDefault();
		if($("#create_new textarea").val() === "")
		{
			$("#errors").text("Cannot be blank");
			return
		}
		else
			$("#errors").text("");

		data = $(this).serialize()

		$.ajax({
			url: "http://int-voting-api.herokuapp.com/api/v0/newcard",
			method: "POST",
			data: data

		}).done(function(){
			$("#create_new textarea").val("")
			$("#yourname").val("")
		})

	}

	function scrollToTop(evt){
		evt.preventDefault();
		console.log("clicking?")
		$('html, body').animate({
    			scrollTop: 0,
    			easing: "easeOutQuart"
		},1000);

	}

	function bindEvents(){
		$("#quote").text('"' + quotes[quoteIndex].quote + '"')
		$("#quote_author").text(" - " + quotes[quoteIndex].attribution)
		$.ajax({
			url: 'http://int-voting-api.herokuapp.com/api/v0/cardpair'
		}).done(addNewPair)

		$(window).scroll(checkScroll);
		$("#ks_button").mouseover(addHatch);
		$("#nav-about").click(scrollToAbout);
		$(".navbar-header").click(scrollToTop);
		setTimeout(function(){$("header .container-fluid").removeClass("slideRight")},2000)
		$(window).bind("mousewheel", function() {
		    $("html, body").stop();
		});
		$("#nav-reviews").click(scrollToReview)
		$("#nav-cards").click(scrollToCards)
		$(".cards").on("click",".card_display",handleVote)
		$("#create_new").submit(submitNew);

		rotateQuote();
		//$("#ks_button").mouseout(removeHatch);
	}
	return {
		bindEvents: bindEvents
	}
})();




// $(document).ready(function() {
//     $("#quoteblock").click(function() {
//         rotatequote ()
//       });
// });
 
// function rotatequote() {
//     quoteindex = (quoteindex + 1) % quotes.length;
//     changequote_withfade(quoteindex);
// }
// function changequote_withfade(index) {
//     $("#quoteblock-inner").fadeOut(fadetime, function() { changequote(quoteindex); })
//       .fadeIn(fadetime);
// }