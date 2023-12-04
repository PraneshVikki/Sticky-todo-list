const addbtn = document.querySelector('.container');
const body = document.querySelector('body');

function getElement(){
return JSON.parse(localStorage.getItem('pranesh')||"[]");
}

getElement().forEach(element => {
    const textElement = createTextElement(element.id,element.content);
    body.insertBefore(textElement,addbtn)
});


function createTextElement(id,content){
    const textElement = document.createElement('textarea');
    textElement.classList.add('sticky');
    textElement.value = content;
    textElement.placeholder='Enter Your Notes';

    textElement.addEventListener("change",()=>{
        updateNote(id,textElement.value);
      });

    textElement.addEventListener("dblclick",()=>{
        const check = confirm("Do You Want To Delete This Node")
        if(check){
            deleteNode(id,textElement);
        }
    });
    return textElement;
}

function addSticky(){
    const note = getElement(); 
    const noteObject = {
        id:Math.floor(Math.random()*100000),
        content:''
    }
const textElement = createTextElement(noteObject.id,noteObject.content);
body.insertBefore(textElement,addbtn);
note.push(noteObject);
console.log(note);
setElement(note);
}
addbtn.addEventListener('click',()=>addSticky());

function setElement(note){
    localStorage.setItem('pranesh',JSON.stringify(note));
}

function updateNote(id,content){
    const notes=getElement();
    const updateElement=notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    setElement(notes);
    console.log(notes);
  }

function deleteNode(id,textElement){
const notes=getElement().filter((note)=>note.id!=id);
setElement(notes);
body.removeChild(textElement)
}

function createBubble(){
    const span = document.createElement('span');
    var size = Math.random()*60;
    span.style.width = 20 + size +'px';
    span.style.height = 20 + size +'px';
    span.style.left = Math.random() * innerWidth +'px';
    body.appendChild(span);

    setTimeout(()=>{
        span.remove()
    },4000)
} 
setInterval(createBubble,500);