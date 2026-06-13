const URL_API = "https://api.jolpi.ca/ergast/f1/2026/constructors.json";
const datosExtra = {
    "Alpine F1 Team": {motor: "Mercedes", pilotos: "Gasly / Colapinto", fundacion: 1977},
    "Aston Martin": {motor: "Mercedes", pilotos: "Alonso / Stroll", fundacion: 1913},
    "Audi": {motor: "Audi", pilotos: "Hulkenberg / Bortoleto", fundacion: 2026},
    "Cadillac F1 Team": {motor: "Ferrari", pilotos: "Perez / Bottas", fundacion: 2026},
    "Ferrari": {motor: "Ferrari", pilotos: "Leclerc / Hamilton", fundacion: 1929},
    "Haas F1 Team": {motor: "Ferrari", pilotos: "Ocon / Bearman", fundacion: 2016},
    "McLaren": {motor: "Mercedes", pilotos: "Norris / Piastri", fundacion: 1963},
    "Mercedes": {motor: "Mercedes", pilotos: "Russell / Antonelli", fundacion: 1954},
    "RB F1 Team": {motor: "Honda", pilotos: "Lawson / Lindbland", fundacion: 2024},
    "Red Bull": {motor: "Honda", pilotos: "Verstappen / Hadjar", fundacion: 2005},
    "Williams": {motor: "Mercedes", pilotos: "Albon / Sainz", fundacion: 1977}
};
let todosLosEquipos = [];

async function obtenerEquipos() {
    try{
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();
        
        todosLosEquipos = datos.MRData.ConstructorTable.Constructors;
        mostrarEquipos(todosLosEquipos);

    } catch (error) {
        console.error("Error al obtener los equipos:", error);
    }
}

function mostrarEquipos(equipos) {
    const contenedor = document.getElementById("contenedorEquipos");
    contenedor.innerHTML = "";
    
    equipos.forEach(function(equipo) {
        const extra = datosExtra[equipo.name] || {};
        const tarjeta = `
            <div class="col-md-4" data-aos="fade-left">
                <div class="tarjeta-equipo-f1 text-center">
                    <h4>${equipo.name}</h4>
                    <p>País: ${equipo.nationality}</p>
                    <p>Motor: ${extra.motor}</p>
                    <p>Pilotos: ${extra.pilotos}</p>
                    <p>Fundacion: ${extra.fundacion}</p>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
    AOS.refresh(); 

}

function filtrarEquipos() {
    const busqueda = document.getElementById("inputBuscarEquipo").value.toLowerCase();

    const filtrados = todosLosEquipos.filter(function(equipo) {
       if(!equipo.name) return false;
       return equipo.name.toLowerCase().includes(busqueda);
    });
    mostrarEquipos(filtrados);
}


document.getElementById("inputBuscarEquipo").addEventListener("input", filtrarEquipos);

obtenerEquipos();
