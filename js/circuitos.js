const URL_API = "https://api.jolpi.ca/ergast/f1/2026/races.json";

let todosLosCircuitos = [];

async function obtenerCircuitos() {
    try{
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();
        
        todosLosCircuitos = datos.MRData.RaceTable.Races;
        mostrarCircuitos(todosLosCircuitos);

    } catch (error) {
        console.error("Error al obtener los circuitos:", error);
    }
}

function mostrarCircuitos(circuitos) {
    const contenedor = document.getElementById("contenedorCircuitos");
    contenedor.innerHTML = "";
    
    circuitos.forEach(function(circuito) {
        const tarjeta = `
            <div class="col-md-4" data-aos="fade-right">
                <div class="tarjeta-circuitos-f1 text-center">
                    <h4>${circuito.raceName}</h4>
                    <p>Circuito: ${circuito.Circuit.circuitName}</p>
                    <p>País: ${circuito.Circuit.Location.country}</p>
                    <p>Ciudad: ${circuito.Circuit.Location.locality}</p>
                    <p>Fecha: ${circuito.date}</p>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
    AOS.refresh();

}

function filtrarCircuitos() {
    const busqueda = document.getElementById("inputBuscarCircuito").value.toLowerCase();

    const filtrados = todosLosCircuitos.filter(function(circuito) {
       if(!circuito.Circuit.Location.country) return false;
       return circuito.Circuit.Location.country.toLowerCase().includes(busqueda);
    });
    mostrarCircuitos(filtrados);
}

document.getElementById("inputBuscarCircuito").addEventListener("input", filtrarCircuitos);

obtenerCircuitos();
