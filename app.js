const frmTask = document.querySelector('#frmTask');
const db = firebase.firestore();
let editando = false;
let datosenformulario = false;
var varita = null;
const taskcontainer = document.getElementById('taskcontainer');
var btnGuardar = document.getElementById('btnGuardar');
var dos = document.getElementById('txtTask').value;
var tres = document.getElementById('txtDescription').value;
//inicializar();
siboton();
listarCambiosDeDatos();


function cancelar() {
    editando = false;
    btnGuardar.innerHTML = "Guardar";
    btnGuardar.classList.remove("btn-success");
    btnGuardar.classList.add("btn-primary");
    frmTask.reset();
    siboton();
}


function listarCambiosDeDatos() {

    db.collection('tasks').onSnapshot(querySnapshot => {
        taskcontainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());

            taskcontainer.innerHTML += `
            <div class="col-6">
        <div class="card card-body mt-2 border-default">
        <h3>${doc.data().title}</h3>
        <p>${doc.data().description}</p>
        <div>
            <button class="btn btn-danger" onclick="borrar('${doc.id}')">Borrar</button>
            <button class="btn btn-secondary"  onclick="pasaDatos('${doc.id}','${doc.data().title}','${doc.data().description}')">Editar</button>
        </div>
    </div>
    <div>
        `;


        });
    });
}


function pasaDatos(id, title, description) {
    datosenformulario = true;
    const txtTask = document.getElementById('txtTask');
    const txtDescription = document.getElementById('txtDescription');
    txtTask.value = title;
    txtDescription.value = description;
    varita = id;
    editando = true;
    noboton();
    btnGuardar.innerHTML = "Editar";
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
    return varita;
}

function actualizar(var1, var2, var3) {
    //  const tasksref = ;
    db.collection("tasks").doc(var1).update({
        title: var2,
        description: var3
    }).then(function () {
        console.log('Registro editado...', var1, " perfectamente!");

    }).catch(function (error) {
        console.log(error.message);
    })
}

function guardar() {
    if (editando) {
        try {
            let dos = document.getElementById('txtTask').value;
            let tres = document.getElementById('txtDescription').value;

            actualizar(varita, dos, tres);
            editando = false;
            cancelar();
        } catch (error) {
            console.log('Editando NOT Working...', error.message);
        }

    } else {
        try {
            const task = document.getElementById('txtTask').value;
            const description = document.getElementById('txtDescription').value;
            add(task, description);
            console.log('Guardado...', task, description);
            cancelar();
        } catch (error) {
            console.log('Guardando NOT Working...', error.message);
        }
    }
}

function add(var1, var2) {
    db.collection("tasks").add({
            title: var1,
            description: var2
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


function inicializar() {
    var dos = document.getElementById('txtTask').value;
    var tres = document.getElementById('txtDescription').value;

    if (dos == '' || tres == '') {
        noboton();
        console.log('aplicando');
    } else {
        siboton();
    }

}

function borrar(id) {
    db.collection("tasks").doc(id).delete().then(function () {
        console.log('Registro borrado...', id);
    }).catch(function (error) {
        console.log(error.message);
    })
}

window.addEventListener('DOMContentLoaded', async (e) => {
    //  vigia();

});

function noboton() {
    btnGuardar.disabled = false;
    btnGuardar.classList.remove("disabled");
}

function siboton() {
    btnGuardar.disabled = true;
    btnGuardar.classList.add("disabled");
}