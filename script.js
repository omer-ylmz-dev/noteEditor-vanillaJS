"use strict";

(function(){
	if(!localStorage.getItem("notes")){
		localStorage.setItem("notes",JSON.stringify([]))
	}
})();


window.onload = function(){
	listAllNotes();
	searchInTheList();
	isNoteDBEmpty()
};



document.querySelector("#save").addEventListener("click",addNewNote);


// NOTE CREATE && EDIT FUNCTION

function addTitle(){
	return document.querySelector("#title").value
}
function addNote(){
	return document.querySelector("#note").value
}

function addNewNote(){
	var noteDB = JSON.parse(localStorage.getItem("notes"))
	let result = {title: addTitle(), note: addNote()};
	
	if(addTitle().length === 0 || addNote().length === 0){
		alert("Please, fill in the blanks")
	}else{
		
		if(noteDB.findIndex(note => note.title == result.title || note.note == result.note) != -1){
			let choice = confirm("This note has been saved, do you want to overwrite your saved note?")
			if(choice == true){
				noteDB = [...noteDB.map(n => n.title == result.title || n.note == result.note ? ({...n, ...result}) : n)]
				localStorage.setItem("notes",JSON.stringify([...noteDB]))
				alert("Your note has been saved successfully");
			}
		}else{
			localStorage.setItem("notes",JSON.stringify([...noteDB,result]))
			alert("Your note has been saved successfully");
		}
		
		listAllNotes()
		isNoteDBEmpty()
		document.querySelector(".savedNotes").scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
	
	
	
	document.querySelector("#title").value = null;
	document.querySelector("#note").value = null;
}

// LIST ALL NOTES

function listAllNotes(list = JSON.parse(localStorage.getItem("notes"))){
	document.querySelector("#savedNotes").innerHTML = "";
	for(var i=0;i<list.length;i++){
		document.querySelector("#savedNotes").innerHTML += 
			`<div class="note">
				<header class="noteTitle">
				${list[i].title}
				</header>
				<section class="noteText">
				${list[i].note}
				</section>
				<footer class="noteOptions">
					<button class="noteOption" onclick="editNote('${list[i].title.trim()}','${list[i].note.trim()}')">Edit</button>
					<button class="noteOption" onclick="deleteNote('${list[i].title.trim()}','${list[i].note.trim()}')">Delete</button>
				<footer>
			</div>
			`
	}
	isNoteDBEmpty()
}



// DELETE

function deleteNote(selectedTitle,selectedNote){
	var noteDB = JSON.parse(localStorage.getItem("notes"))
	let choice = confirm("Are you sure you want to delete?")
	if(choice == true){
		let result = noteDB.filter(n => selectedTitle.trim() !== n.title || selectedNote.trim() !== n.note);
		localStorage.setItem("notes",JSON.stringify(result))
	}
	listAllNotes();
	isNoteDBEmpty()
}


// CHOOSING NOTE FOR EDITING 


function editNote(selectedTitle,selectedNote){
	let noteDB = JSON.parse(localStorage.getItem("notes"))
	document.querySelector("#title").value = selectedTitle.trim();
	document.querySelector("#note").value = selectedNote.trim();
	var editingNoteIndex = noteDB.findIndex(n => n.title == selectedTitle.trim() && n.note == selectedNote.trim());
	document.querySelector("#noteIndexNumber").value = editingNoteIndex;
	document.querySelector(".navbar").scrollIntoView({ behavior: 'smooth', block: 'start' });
}



// SEARCH

function searchInTheList(){
	document.querySelector("#searchBar").addEventListener("keyup",(e) => listFiltering(e.target.value));
}

function listFiltering(searchingTag){
	var noteDB = JSON.parse(localStorage.getItem("notes"))
	searchingTag = searchingTag.trim();
	 document.querySelector("#searchBar").value =  document.querySelector("#searchBar").value.trim();
	let searching = noteDB.filter(note => note.title.toLowerCase().includes(searchingTag.toLowerCase().trim()));
	document.querySelector("#savedNotes").innerHTML = "";
	if(searchInTheList.value == ""){
		document.querySelector("#savedNotes").innerHTML = "";
		listAllNotes(noteDB);
		let routing = setTimeout(() => {
			document.querySelector(".navbar").scrollIntoView({ behavior: 'smooth', block: 'start' });
		},1500)
		return;
	}
	if(searchInTheList.value != "" && searching.length == 0){
		document.querySelector("#savedNotes").innerHTML = "";
		listAllNotes(searching);
		let routing = setTimeout(() => {
			document.querySelector(".savedNotes").scrollIntoView({ behavior: 'smooth', block: 'start' });
		},1500)
		return;
	}
	if(searchInTheList.value != "" && searching.length > 0){
		document.querySelector("#savedNotes").innerHTML = "";
		listAllNotes(searching);
		let routing = setTimeout(() => {
			document.querySelector(".savedNotes").scrollIntoView({ behavior: 'smooth', block: 'start' });
		},1500)
		return;
	}
}


// NOTEDB CHECK

function isNoteDBEmpty(){
	var noteDB = JSON.parse(localStorage.getItem("notes"))
	document.querySelector("#emptyDB").style.display = "block";
	if(noteDB?.length == 0){
		document.querySelector("#emptyDB").style.display = "block";
	}else{
		document.querySelector("#emptyDB").style.display = "none";
	}
}