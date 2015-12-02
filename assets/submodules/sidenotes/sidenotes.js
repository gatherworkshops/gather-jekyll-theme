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

	/*
	Copy notes to visible notes section
	*/
	function copyNotes() {
		slide = Reveal.getCurrentSlide();
		notes = $(slide).find('aside.notes').html();
	    $('.sidenotes .content').html(notes);
	}

	/*
	Toggle sidenotes visibility
	*/
	function showNotes() {
		$(".sidenotes").parent().toggleClass("with-notes");
	}

	/*
	Listen for enter key to toggle notes
	*/
	$(document).keypress(function(e) {
	  	if(e.which == 13) {
	  		showNotes();
	  	}
	});

}(Reveal));