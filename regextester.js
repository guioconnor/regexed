(function($) {
	var failcolor    = "#fcc",
		passedcolor  = "#cfc",
		neutralcolor = "#fff";


	$(document).ready(function(){
		var positiveTests = $("#positive"),
			negativeTests = $("#negative"),
			result = $("#result"),
			regexpEl = $("#regexp input");

		var _runTests = function(e){
			// try to parse regex
			try {
				var regexp = new RegExp(regexpEl.val()),
					passed = true;
					regexpEl.css("background-color", neutralcolor);
			}
			catch(e) {
				// Inform the user that the regex is invalid
				regexpEl.css("background-color", failcolor);
			}

			// run positive tests
			positiveTests.find("input").each(function(){
				var test = $(this).val();
									
				if( $(this).val().length > 0 && !test.match(/^[ \t]+$/) ) {
					if( !test.match(regexp) ) {
						$(this).css("background-color", failcolor);
						passed = false;
					}
					else {
						$(this).css("background-color", passedcolor);							
					}

				}
				else {
					$(this).css("background-color", neutralcolor);							
				}
			});

			// run negative tests
			negativeTests.find("input").each(function(){
				var test = $(this).val();
									
				if( $(this).val().length > 0 && !test.match(/^[ \t]+$/) ) {
					if( test.match(regexp) ) {
						$(this).css("background-color", failcolor);
						passed = false;
					}
					else {
						$(this).css("background-color", passedcolor);							
					}
				}
				else {
					$(this).css("background-color", neutralcolor);							
				}
			});

			// Set result
			if(passed) {
				result.text("passed").removeClass("failed").addClass("passed");
			}
			else {
				result.text("failed").removeClass("passed").addClass("failed");
			}
		};

		var _addNewTest = function(e) {
			var target = $(e.target);

			if(target.closest("li").is(":last-child")) {
				target.closest("ul").append($('<li></li>').append($('<input type="text" placeholder="'+ target.attr("placeholder") +'">').keyup(_runTests).focus(_addNewTest)));
			}
			else {
				console.log("nah!");
			}
		};

		regexpEl.keyup(_runTests).focus();
		positiveTests.keyup(_runTests).find("input").focus(_addNewTest);
		negativeTests.keyup(_runTests).find("input").focus(_addNewTest);
	})

})(jQuery)