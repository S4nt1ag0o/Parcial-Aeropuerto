document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const gestionEmpleados = document.getElementById('gestion-empleados');
    const loginMessage = document.getElementById('login-message');

    // Credenciales predefinidas (puedes cambiar esto o integrarlo con un servidor)
    const validUsername = 'admin';
    const validPassword = '12345';

    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verificar si las credenciales son correctas
        if (username === validUsername && password === validPassword) {
            // Ocultar el formulario de inicio de sesión
            loginForm.style.display = 'none';
            loginMessage.textContent = ''; // Limpiar cualquier mensaje de error

            // Mostrar la sección de gestión de empleados
            gestionEmpleados.style.display = 'block';
        } else {
            // Mostrar mensaje de error
            loginMessage.textContent = 'Credenciales incorrectas. Necesita un perfil administrativo.';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const incidenceForm = document.getElementById('incidence-form');
    const incidenceTableBody = document.getElementById('incidenceTableBody');

    // Cargar incidencias de localStorage o iniciar con un array vacío
    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

    // Función para renderizar incidencias en la tabla
    function renderIncidencias() {
        incidenceTableBody.innerHTML = '';
        incidencias.forEach((incidencia, index) => {
            const row = `
                <tr>
                    <td>${incidencia.tipo}</td>
                    <td>${incidencia.descripcion}</td>
                    <td>${incidencia.fecha}</td>
                    <td>${incidencia.estado}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarIncidencia(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarIncidencia(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            incidenceTableBody.innerHTML += row;
        });
    }

    // Guardar las incidencias en localStorage
    function saveIncidencias() {
        localStorage.setItem('incidencias', JSON.stringify(incidencias));
        renderIncidencias();
    }

    // Manejar el envío del formulario de incidencias
    incidenceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-incidencia').value;
        const descripcion = document.getElementById('descripcion').value;
        const fecha = document.getElementById('fecha').value;
        const estado = document.getElementById('estado').value;

        // Añadir una nueva incidencia al array
        incidencias.push({ tipo, descripcion, fecha, estado });
        saveIncidencias();

        // Resetear formulario
        incidenceForm.reset();
    });

    // Función para eliminar una incidencia
    window.eliminarIncidencia = function(index) {
        incidencias.splice(index, 1); // Elimina la incidencia del array
        saveIncidencias();
    }

    // Función para editar una incidencia (simulación)
    window.editarIncidencia = function(index) {
        const incidencia = incidencias[index];
        document.getElementById('tipo-incidencia').value = incidencia.tipo;
        document.getElementById('descripcion').value = incidencia.descripcion;
        document.getElementById('fecha').value = incidencia.fecha;
        document.getElementById('estado').value = incidencia.estado;

        incidencias.splice(index, 1); // Elimina la entrada vieja
        saveIncidencias();
    }

    // Renderizar las incidencias al cargar la página
    renderIncidencias();
});
