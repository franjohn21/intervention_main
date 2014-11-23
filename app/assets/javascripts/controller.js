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
			$(".landing_main").css("opacity",1)
			if(current > 30)
			{
				$(".landing_main").css("opacity",(0.95-(current/400)));

			}
			$("#navright a").removeClass("active")

		}
		else 
		{
			$(".landing_main").css("opacity",0);
			$("#navbar").removeClass("transparent")
			$("#navbar .container-fluid").addClass("shrink")
			$("#navright a").removeClass("active")
			if (current > ($('.cards').first().offset().top)-150)
			{
				$("#nav-cards").addClass("active")
			}
			else if(current > ($('.about').first().offset().top)-201)
			{
				$("#nav-about").addClass("active")

			}
			else if(current > ($('.reviews').first().offset().top - 201))
			{
				$("#nav-reviews").addClass("active")
			}
			
			if(current > $('.about').first().offset().top - 300)
			{
				$("#first_rule").addClass("fadeIn");
				$("#first_rule").show();
				setTimeout(function(){
					$("#second_rule").addClass("fadeIn");
					$("#second_rule").show();
					setTimeout(function(){
						$("#third_rule").addClass("fadeIn");
						$("#third_rule").show();
					}, 1000);

				},1000);
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
    			scrollTop: ($('.about').first().offset().top-200),
    			easing: "easeOutQuart"
			},1500, function(){
				$('html, body').animate({
					scrollTop: ($('.about').first().offset().top - 100)
				},800, function(){
					$('html, body').animate({
					scrollTop: ($('.about').first().offset().top + 1)
					},800);
				});
			});
		}
	}

	function scrollToReview(evt){
		evt.preventDefault();
		$('html, body').animate({
		    scrollTop: ($('.reviews').first().offset().top) - 190,
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
		$("#ks_button_link").addClass("hatch")
		// setTimeout($("#ks_button").removeClass("hatch"),1000);
		clearTimeout(curr_timeout)
		curr_timeout = setTimeout(function(){$("#ks_button_link").removeClass("hatch")},3000)
		
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
		
		$(".checkmark").fadeOut(1000, function(){
			$(".checkmark").remove();
		});
		$(".ex").fadeOut(1000,function(){
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
	function initializeData(){
		setTimeout(function(){$("header .container-fluid").removeClass("slideRight")},2000)
		$("#quote").text('"' + quotes[quoteIndex].quote + '"')
		$("#quote_author").text(" - " + quotes[quoteIndex].attribution)
		$.ajax({
			url: 'http://int-voting-api.herokuapp.com/api/v0/cardpair'
		}).done(addNewPair)
		$("#quote_link").text(quotes[quoteIndex].link_name)
		$("#quote_link").attr("href",quotes[quoteIndex].link)
		rotateQuote();
	}

	function bindEvents(){
		initializeData();
		$(window).bind("mousewheel", function() {
		    $("html, body").stop();
		});
		$(window).scroll(checkScroll);
		$("#ks_button").mouseover(addHatch);
		$("#nav-about").click(scrollToAbout);
		$(".navbar-header").click(scrollToTop);
		$("#nav-reviews").click(scrollToReview)
		$("#nav-cards").click(scrollToCards)
		$(".cards").on("click",".card_display",handleVote)
		$("#create_new").submit(submitNew);
	}
	return {
		bindEvents: bindEvents
	}
})();
