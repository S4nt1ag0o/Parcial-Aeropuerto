// Datos de estacionamientos predefinidos
const parkingLots = [
    { lotNumber: 'A1', dateEntry: '', timeEntry: '', dateExit: '', timeExit: '', vehiclePlate: '', status: 'Disponible' },
    { lotNumber: 'B2', dateEntry: '', timeEntry: '', dateExit: '', timeExit: '', vehiclePlate: '', status: 'Disponible' },
    { lotNumber: 'C3', dateEntry: '', timeEntry: '', dateExit: '', timeExit: '', vehiclePlate: '', status: 'Disponible' },
    { lotNumber: 'D4', dateEntry: '', timeEntry: '', dateExit: '', timeExit: '', vehiclePlate: '', status: 'Reservado' }
];

// Cargar los estacionamientos automáticamente al cargar la página
window.onload = function () {
    displayParkingLots(parkingLots);  // Mostrar todos los estacionamientos al cargar la página
};

// Función que muestra los estacionamientos en la tabla
function displayParkingLots(parkingData) {
    const resultsTable = document.getElementById('parkingTableBody');
    resultsTable.innerHTML = ''; // Limpiar la tabla

    if (parkingData.length === 0) {
        resultsTable.innerHTML = '<tr><td colspan="7" class="text-center">No se encontraron estacionamientos disponibles</td></tr>';
    } else {
        parkingData.forEach(lot => {
            resultsTable.innerHTML += `
                <tr>
                    <td>${lot.lotNumber}</td>
                    <td>${lot.dateEntry || '-'}</td>
                    <td>${lot.timeEntry || '-'}</td>
                    <td>${lot.dateExit || '-'}</td>
                    <td>${lot.timeExit || '-'}</td>
                    <td>${lot.vehiclePlate || '-'}</td>
                    <td>${lot.status}</td>
                </tr>
            `;
        });
    }
}

// Manejar la reserva de estacionamiento
document.getElementById('parking-reservation-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const fechaEntrada = document.getElementById('fecha-entrada').value;
    const horaEntrada = document.getElementById('hora-entrada').value;
    const fechaSalida = document.getElementById('fecha-salida').value;
    const horaSalida = document.getElementById('hora-salida').value;
    const placaVehiculo = document.getElementById('placa-vehiculo').value.trim();

    if (fechaEntrada && horaEntrada && fechaSalida && horaSalida && placaVehiculo) {
        // Buscar un estacionamiento disponible
        const availableLot = parkingLots.find(lot => lot.status === 'Disponible');

        if (availableLot) {
            // Actualizar los datos del estacionamiento disponible con los datos de la reserva
            availableLot.dateEntry = fechaEntrada;
            availableLot.timeEntry = horaEntrada;
            availableLot.dateExit = fechaSalida;
            availableLot.timeExit = horaSalida;
            availableLot.vehiclePlate = placaVehiculo;
            availableLot.status = 'Reservado';

            // Actualizar la tabla de resultados
            displayParkingLots(parkingLots);

            // Mostrar mensaje de confirmación
            alert(`Reservación confirmada para el vehículo con placa: ${placaVehiculo}.`);
        } else {
            // Si no hay estacionamientos disponibles, mostrar mensaje de error
            alert('No hay estacionamientos disponibles en este momento.');
        }
    } else {
        // Si algún campo está vacío, mostrar un mensaje de advertencia
        alert('Por favor, completa todos los campos para hacer la reserva.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employee-form');
    const employeeTableBody = document.getElementById('employeeTableBody');

    // Cargar empleados de localStorage
    let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

    // Función para renderizar empleados
    function renderEmployees() {
        employeeTableBody.innerHTML = '';
        empleados.forEach((empleado, index) => {
            const row = `
                <tr>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.rol}</td>
                    <td>${empleado.acceso}</td>
                    <td>${empleado.turno}</td>
                    <td>${empleado.estado}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarEmpleado(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            employeeTableBody.innerHTML += row;
        });
    }

    // Guardar empleados en localStorage
    function saveEmployees() {
        localStorage.setItem('empleados', JSON.stringify(empleados));
        renderEmployees();
    }

    // Manejar el envío del formulario
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre-empleado').value;
        const rol = document.getElementById('rol-empleado').value;
        const acceso = document.getElementById('area-acceso').value;
        const turno = document.getElementById('turno-empleado').value;
        const estado = document.getElementById('estado-empleado').value;

        empleados.push({ nombre, rol, acceso, turno, estado });
        saveEmployees();

        // Resetear formulario
        employeeForm.reset();
    });

    // Función para eliminar empleado
    window.eliminarEmpleado = function(index) {
        empleados.splice(index, 1);
        saveEmployees();
    }

    // Función para editar empleado (simplificada)
    window.editarEmpleado = function(index) {
        const empleado = empleados[index];
        document.getElementById('nombre-empleado').value = empleado.nombre;
        document.getElementById('rol-empleado').value = empleado.rol;
        document.getElementById('area-acceso').value = empleado.acceso;
        document.getElementById('turno-empleado').value = empleado.turno;
        document.getElementById('estado-empleado').value = empleado.estado;

        empleados.splice(index, 1); // Eliminar temporalmente para que se actualice
    }

    // Inicializar la tabla al cargar la página
    renderEmployees();
});

//--------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
    const incidenceForm = document.getElementById('incidence-form');
    const incidenceCards = document.getElementById('incidenceCards');
    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];
    let editingIndex = null;  // Para saber si estamos editando una incidencia

    // Función para renderizar las incidencias en tarjetas horizontales
    function renderIncidencias() {
        incidenceCards.innerHTML = '';  // Limpiar el contenedor de tarjetas
        incidencias.forEach((incidencia, index) => {
            const card = `
                <div class="card mb-3" style="width: 100%;" data-index="${index}">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${incidencia.tipo}</h5>
                                <p class="card-text">
                                    <strong>Descripción:</strong> ${incidencia.descripcion}<br>
                                    <strong>Fecha:</strong> ${formatFecha(incidencia.fecha)}<br>
                                    <strong>Estado:</strong> ${incidencia.estado}
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex align-items-center">
                            <div class="card-body">
                                <button class="btn btn-warning btn-sm editar" data-index="${index}">Editar</button>
                                <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            incidenceCards.innerHTML += card;
        });

        // Asignar eventos a los botones de editar y eliminar después de renderizar
        document.querySelectorAll('.editar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editarIncidencia(index);
            });
        });

        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                eliminarIncidencia(index);
            });
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

        if (editingIndex === null) {
            // Si no estamos editando, añadimos una nueva incidencia
            incidencias.push({ tipo, descripcion, fecha, estado });
        } else {
            // Si estamos editando, actualizamos la incidencia
            incidencias[editingIndex] = { tipo, descripcion, fecha, estado };
            editingIndex = null;  // Resetear el índice de edición
        }

        saveIncidencias();  // Guardar y renderizar
        incidenceForm.reset();  // Limpiar el formulario
    });

    // Función para formatear la fecha en DD/MM/YYYY
    function formatFecha(fecha) {
        if (!fecha || !fecha.includes('-')) {
            return 'Fecha no válida';
        }
        
        const [year, month, day] = fecha.split('-');
        return `${day}/${month}/${year}`;
    }

    // Función para eliminar una incidencia
    function eliminarIncidencia(index) {
        // Confirmar eliminación
        if (confirm("¿Estás seguro de que quieres eliminar esta incidencia?")) {
            incidencias.splice(index, 1);  // Eliminar la incidencia
            saveIncidencias();  // Guardar cambios y renderizar nuevamente
        }
    }

    // Función para editar una incidencia
    function editarIncidencia(index) {
        const incidencia = incidencias[index];
        // Cargar los datos en el formulario
        document.getElementById('tipo-incidencia').value = incidencia.tipo;
        document.getElementById('descripcion').value = incidencia.descripcion;
        document.getElementById('fecha').value = incidencia.fecha;
        document.getElementById('estado').value = incidencia.estado;
        editingIndex = index;  // Guardar el índice de edición
    }

    // Inicializar la renderización de incidencias
    renderIncidencias();
});
