const URL_DATOS = "https://api.jolpi.ca/ergast/f1/2026/driverStandings.json";
const URL_FOTOS = "https://api.openf1.org/v1/drivers?session_key=latest";

let todosLosPilotos = [];

async function obtenerPilotos() {
    try{
        const [respuestaDatos, respuestaFotos] = await Promise.all([
            fetch(URL_DATOS),
            fetch(URL_FOTOS)
        ]);

        const datos = await respuestaDatos.json();
        const datosFotos = await respuestaFotos.json();

        const pilotos = datos.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        todosLosPilotos =  pilotos.map(function(piloto) {
            const apellido = piloto.Driver.familyName.toUpperCase();
            const fotoData = datosFotos.find(function(f){
                return f.last_name && f.last_name.toUpperCase() === apellido;
            });
            return {
                ...piloto,
                foto: fotoData ? fotoData.headshot_url : ""
            };
        });

        mostrarPilotos(todosLosPilotos);

    }catch (error){
        console.error("Error al obtener los pilotos", error);
    }
}

function mostrarPilotos(pilotos) {
    const contenedor = document.getElementById("contenedorPilotos");
    contenedor.innerHTML = "";
    console.log(pilotos[0]);
    pilotos.forEach(function(piloto) {
        const tarjeta = `
            <div class="col-md-4" data-aos="fade-up">
                <div class="tarjeta-piloto text-center" >
                    ${piloto.foto ? `<img src="${piloto.foto}" alt="${piloto.Driver.givenName}">` : ""}
                    <h4>${piloto.Driver.givenName} ${piloto.Driver.familyName}</h4>
                    <p>Equipo: ${piloto.Constructors[0].name}</p>
                    <p>Nacionalidad: ${piloto.Driver.nationality}</p>
                    <p>Puntos: ${piloto.points}</p>
                    <p>Victorias: ${piloto.wins}</p>
                    <p>Posición: ${piloto.position}°</p>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
    
    AOS.refresh();

    if (pilotos === todosLosPilotos) {
        mostrarGraficos();
    }
}

function filtrarPilotos() {
    const busqueda = document.getElementById("inputBuscar").value.toLowerCase();

    const filtrados = todosLosPilotos.filter(function(piloto) {
       const nombreCompleto = piloto.Driver.givenName + " " + piloto.Driver.familyName;
        return nombreCompleto.toLowerCase().includes(busqueda);
    });
    mostrarPilotos(filtrados);
}

document.getElementById("inputBuscar").addEventListener("input", filtrarPilotos);

obtenerPilotos();

function mostrarGraficos(){
    const nombres = [];
    const puntos = [];
    const datosVictorias = [];

    todosLosPilotos.forEach(function(p){
        nombres.push(p.Driver.familyName);
        puntos.push(parseFloat(p.points));

        if(parseInt(p.wins) > 0){
            datosVictorias.push({
                name: p.Driver.familyName,
                value: parseInt(p.wins)
            });
        }
    });

    const graficoPuntos = echarts.init(document.getElementById("graficoPuntos"));
    graficoPuntos.setOption({
        tooltip: {},
        xAxis: {
            data: nombres,
            axisLabel: {rotate: 45}
        },
        yAxis: {},
        series: [{
            name: "Puntos",
            type: "bar",
            data: puntos,
            itemStyle: {color: "#e10600"}
        }]
    });

    const graficoVictorias = echarts.init(document.getElementById("graficoVictorias"));
    graficoVictorias.setOption({
        tooltip: {trigger: "item"},
        series: [{
            name: "Victorias",
            type: "pie",
            radius: "60%",
            data: datosVictorias
        }]
    });

    }