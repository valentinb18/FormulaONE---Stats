const historicos = [
    {nombre: "Michael Schumacher", pais: "Alemania", campeonatos: 7, victorias: 91, años: "1991 - 2012"},
    {nombre: "Lewis Hamilton", pais: "Reino Unido", campeonatos: 7, victorias: 103, años: "2007 - presente"},
    {nombre: "Juan Manuel Fangio", pais: "Argentina", campeonatos: 5, victorias: 24, años: "1950 - 1958"},
    {nombre: "Ayrton Senna", pais: "Brasil", campeonatos: 3, victorias: 41, años: "1984 - 1994"},
    {nombre: "Alain Prost", pais: "Francia", campeonatos: 4, victorias: 51, años: "1980 - 1993"},
    {nombre: "Sebastian Vettel", pais: "Alemania", campeonatos: 4, victorias: 53, años: "2007 - 2022"},
    {nombre: "Jack Brabham", pais: "Australia", campeonatos: 3, victorias: 14, años: "1955 - 1970"},
    {nombre: "Jackie Stewart", pais: "Escocia", campeonatos: 3, victorias: 27, años: "1965 - 1973"},
    {nombre: "Niki Lauda", pais: "Austria", campeonatos: 2, victorias: 25, años: "1971 - 1985"},
    {nombre: "Max Verstappen", pais: "Paises Bajos", campeonatos: 4, victorias: 62, años: "2015 - presente"},
];

let todosLosHistoricos = historicos;

function mostrarHistoricos(pilotos){
    const contenedor = document.getElementById("contenedorHistoricos");
    contenedor.innerHTML = "";

    pilotos.forEach(function(piloto){
        const tarjeta = `
            <div class="col-md-4" data-aos="zoom-in">
                <div class="tarjeta-historico text-center">
                    <span class="badge-campeonatos">🏆 ${piloto.campeonatos}</span>
                    <h4>${piloto.nombre}</h4>
                    <p>País: ${piloto.pais}</p>
                    <p>Victorias: ${piloto.victorias}</p>
                    <p>Años activo: ${piloto.años}</p>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
    AOS.refresh(); 

}

function filtrarHistoricos(){
    const busqueda = document.getElementById("inputBuscarHistorico").value.toLowerCase();
    const filtrados = todosLosHistoricos.filter(function(piloto){
        return piloto.nombre.toLowerCase().includes(busqueda) ||
               piloto.pais.toLowerCase().includes(busqueda);
    });
    mostrarHistoricos(filtrados);
}
document.getElementById("inputBuscarHistorico").addEventListener("input", filtrarHistoricos);
mostrarHistoricos(todosLosHistoricos);