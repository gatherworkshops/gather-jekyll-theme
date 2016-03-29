/*
*
Author: Tanya Gray

Sidenotes is a plugin for reveal.js which displays
speaker notes in a docked sidebar, visible to the
viewer.

Version: 0.1
 
License: MIT license (see LICENSE.md)
*
*/

window.Sidenotes || (window.Sidenotes = function (Reveal) {

	/*
	Show notes on slideshow load
	*/
	Reveal.addEventListener( 'ready', function( event ) {
		copyNotes();
		checkNotesState();
	} );

	/*
	Update notes on slide changed
	*/
	Reveal.addEventListener( 'slidechanged', function( event ) {
	    copyNotes();
	} );

	function checkNotesState() {
		var notesOn = Cookies.get('sidenotes');
		notesOn = (notesOn == "true");
		
		setNotesVisibility(notesOn);
	}

	/*
	Copy notes to visible notes section
	*/
	function copyNotes() {
		slide = Reveal.getCurrentSlide();
		notes = $(slide).find('aside.notes').html();
	    $('.sidenotes .content').html(notes);
	}


	function toggleNotesVisibility() {
		var slideshow = $(".sidenotes").parent();

		slideshow.toggleClass("with-notes");
		Cookies.set('sidenotes', slideshow.hasClass("with-notes"));
	}


	function setNotesVisibility(notesOn) {
		var slideshow = $(".sidenotes").parent();

		if(notesOn == true) {
			slideshow.addClass("with-notes");
		} else {
			slideshow.removeClass("with-notes");
		}

		Cookies.set('sidenotes', slideshow.hasClass("with-notes"));
	}

	/*
	Listen for enter key to toggle notes
	*/
	$(document).keypress(function(e) {
	  	if(e.which == 13) {
	  		toggleNotesVisibility();
	  	}
	});

}(Reveal));