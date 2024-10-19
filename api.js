document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtén los valores de los campos del formulario
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fechaapi').value;
    const estado = document.getElementById('estados').value;


    const apiKey = '9b7678498bf7e7e5fa09b55ab9268942';

    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${origen}&arr_iata=${destino}&flight_date=${fecha}&flight_status=${estado}`;

    // Llama a la API con fetch()
    fetch(apiUrl)
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            const resultsDiv = document.getElementById('flight-results');
            resultsDiv.innerHTML = ''; // Limpiar los resultados anteriores

            if (data.data && data.data.length > 0) {
                let table = '<table class="table table-striped"><thead><tr><th>Vuelo</th><th>Origen</th><th>Destino</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>';
                data.data.forEach(function(flight) {
                    table += `<tr>
                        <td>${flight.flight.iata}</td>
                        <td>${flight.departure.iata}</td>
                        <td>${flight.arrival.iata}</td>
                        <td>${flight.flight_date}</td>
                        <td>${flight.flight_status}</td>
                    </tr>`;
                });
                table += '</tbody></table>';
                resultsDiv.innerHTML = table;
            } else {
                resultsDiv.innerHTML = '<p>No se encontraron vuelos con los criterios seleccionados.</p>';
            }
        })
        .catch(error => {
            console.error('Error al consultar la API:', error);
            document.getElementById('flight-results').innerHTML = '<p>Error al obtener los datos. Por favor intenta nuevamente más tarde.</p>';
        });
});
