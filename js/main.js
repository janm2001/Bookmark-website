//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
	//Get form variables
	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;

	if(!validateForm(siteName,siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url:siteUrl
	}

/*
	// local storage test
	localStorage.setItem("test","Hello World");
	console.log(localStorage.getItem("test"));
	localStorage.removeItem("test");
	console.log(localStorage.getItem("test")); */

	//test if bookmark is in local storage already
	if(localStorage.getItem("bookmarks") === null){
		//make a variable for bookmarks that we need in local storage
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);

		//set to local storage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}else {
		//Get bookmarks from local storage
		var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//Back to local storage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	}

	//Clear form
	document.getElementById("myForm").reset();

	//re-fetch bookmarks
	fetchBookmarks();

	//prevent form from submitting
	//ading preventDefault so the submit would work how we want
	e.preventDefault();
}


//create a delete bookmark function that will delete bookmark
function deleteBookmark(url){
	//get bookmarks from local storage
	var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
	//loop bookmarks
	for(var i = 0;i<bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();
}




// fetch bookmark
function fetchBookmarks(){
	//Get bookmarks from local storage
		var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));

		//get output id
		var bookmarksResults = document.getElementById("bookmarksResults");

		//build output
		bookmarksResults.innerHTML = "";

		for(var i = 0;i<bookmarks.length;i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well">' +
			 
			  "<h3>" + name +
			   '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
			   '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>' +
			   "</h3>" 
			   + "</div>";
		}
}
//Validate form
function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert("please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("Please use a valid URL");
		return false;
	}
	return true;
}


