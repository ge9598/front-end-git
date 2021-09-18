const btnAdd = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach(note =>{
        addNewNote(note);
    });
}
btnAdd.addEventListener('click', () =>{
    addNewNote();
});
function addNewNote(text = ''){
    const note = document.createElement('div');
    note.classList.add('notes');
    note.innerHTML = `
    <div class="note">
            <div class="tools">
                <button class='btnEdit'><i class="fas fa-edit"></i></button>
                <button class='btnDelete'><i class="fas fa-trash-alt"></i></button>
                
            </div>
            <div class="main ${text ? "" : "hidden"}">
                
            </div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
            
        </div>
    `

    const notesEl = note.querySelector('.notes');
    const btnEdit = note.querySelector('.btnEdit');
    const btnDelete = note.querySelector('.btnDelete');
    
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = text;
    btnEdit.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    btnDelete.addEventListener('click', ()=>{
        note.remove();
        updateLS();
    });
    
    textArea.addEventListener('input', (e)=>{
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(note);
}
function updateLS(){
    const notesText = document.querySelectorAll('textarea');

    const notes = [];
    notesText.forEach(element => {
        notes.push(element.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}
function retrieveLS(){

}
