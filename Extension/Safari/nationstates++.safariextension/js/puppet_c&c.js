(function(){
	if (getVisiblePage() == "blank" && window.location.href.contains("?puppet_creator")) {
		$("#content").html("<h1>Puppet Creation Center</h1>");
		$("#content").append("<h3>Puppet Settings</h3><div id='settings'></div>");
		$.get("http://nationstatesplusplus.net/nationstates/v2_1/puppet_creation.html", function(html) {
			$("#settings").html(html);
			$("#randomized").on("click", function(event) {
				$("#puppet_name").attr("disabled", $("#randomized").prop("checked"));
			});
			$("#found_nation").on("click", function(event) {
				event.preventDefault();
				var nation = getRandomName(4 + Math.floor(Math.random() * 36));
				
			});
		});
	}
	
	

	function getRandomVowel() {
		var r = Math.floor((Math.random() * 38100));
		if (r < 8167) return 'a';
		if (r < 20869) return 'e';
		if (r < 27835) return 'i';
		if (r < 35342) return 'o';
		return 'u';
	}

	function getRandomConsonant() {
		var r = Math.floor((Math.random() * 34550));
		r += Math.floor((Math.random() * 34550));
		
		if (r < 1492) return 'b';
		if (r < 4274) return 'c';
		if (r < 8527) return 'd';
		if (r < 10755) return 'f';
		if (r < 12770) return 'g';
		if (r < 18864) return 'h';
		if (r < 19017) return 'j';
		if (r < 19789) return 'k';
		if (r < 23814) return 'l';
		if (r < 26220) return 'm';
		if (r < 32969) return 'n';
		if (r < 34898) return 'p';
		if (r < 34993) return 'q';
		if (r < 40980) return 'r';
		if (r < 47307) return 's';
		if (r < 56363) return 't';
		if (r < 57341) return 'v';
		if (r < 59701) return 'w';
		if (r < 59851) return 'x';
		if (r < 61825) return 'y';
		return 'z';
	}

	function generateRandomWord(maxLength) {
		var str = "";
		var nextLetter;
		var length = Math.max(4, Math.floor((Math.random() * maxLength)));
		for (var i = 0; i < length; i += 1) {
			var r = Math.floor((Math.random() * 1000));
			if (r < 381) {
				nextLetter = getRandomVowel();
			} else {
				nextLetter = getRandomConsonant();
			}
			if (i == 0) {
				nextLetter = nextLetter.toUpperCase();
			}
			str += nextLetter;
		}
		return str;
	}

	function isValidName(name) {
		var consonantCount = 0;
		var vowelCount = 0;
		var vowelStreak = 0;
		var consonantStreak = 0;
		
		name = name.toLowerCase();
		for (var i = 0; i < name.length; i += 1) {
			var ch = name[i];
			if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
				vowelCount += 1;
				vowelStreak += 1;
				consonantStreak = 0;
			} else {
				consonantCount += 1;
				consonantStreak += 1;
				vowelStreak = 0;
			}
			if (consonantStreak > 3 || vowelStreak > 4) {
				return false;
			}
		}
		//More than 75% of the word is vowels
		if ((vowelCount * 100 / Math.max(1, vowelCount + consonantCount)) >= 75) {
			return false;
		}
		//More than 70% of the word is consonants
		if ((consonantCount * 100 / Math.max(1, vowelCount + consonantCount)) >= 70) {
			return false;
		}
		return true;
	}
	
	function getRandomName(maxLength) {
		var randomName = "";
		var tries = 3;
		maxLength = Math.max(4, maxLength);
		while(tries > 0) {
			var name = generateRandomWord(maxLength);
			if (isValidName(name)) {
				//first word is always valid
				if (randomName.length == 0) {
					randomName = name;
				} else {
					var newLength = randomName.length + name.length;
					if (newLength <= maxLength) {
						randomName += " " + name;
					} else {
						tries -= 1;
					}
				}
			}
		}
		return randomName;
	}
})();
