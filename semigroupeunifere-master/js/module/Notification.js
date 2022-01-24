
htmlModule = "<div class=\"alert\"><span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span> <strong>Danger!</strong> Indicates a dangerous or potentially negative action.</div>"
element.innerHTML = htmlModule

function addNotification(fst, snd){
	element.children[0].innerHTML += "<div class=\"alert\"><span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span> <strong>" + 
	fst + 
	"</strong>" + 
	snd +
	"</div>"
}