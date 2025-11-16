// Selectores
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// crear los años en base a los autos existentes
const yearsArray = autos.map(auto => auto.year);
const max = Math.max(...yearsArray); // año más nuevo de mi DB
const min = Math.min(...yearsArray); // año más viejo de mi DB

for (let i = max; i >= min; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
}

// Datos para la busqueda
const datosBusqueda = {
    marca : '',
    year: '',
    minimo : '',
    maximo: '',
    puertas: '',
    transmision:'',
    color:''
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarMensajeInicial();
});

function mostrarMensajeInicial() {
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');

    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-inicial');
    mensaje.innerHTML = `
        <h3>Empieza tu búsqueda</h3>
        <p>Usa los filtros de arriba para ver los autos disponibles.</p>
    `;
    contenedor.appendChild(mensaje);
}

function filtrosVacios() {
    return !datosBusqueda.marca &&
           !datosBusqueda.year &&
           !datosBusqueda.minimo &&
           !datosBusqueda.maximo &&
           !datosBusqueda.puertas &&
           !datosBusqueda.transmision &&
           !datosBusqueda.color;
}


// Event Listeners para el formulario
marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value;

    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

year.addEventListener('input', e => {
    datosBusqueda.year = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

function limpiarHTML() {
    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');

    // limpiar los resultados anteriores
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function mostrarAutos(autos) {
    limpiarHTML();

    const contenedor = document.querySelector('#resultado');

    autos.forEach(auto => {
        const card = document.createElement('article');
        card.classList.add('card-auto');

        const precioFormateado = auto.precio.toLocaleString('es-AR');

card.innerHTML = `
    <div class="card-auto__img-wrapper">
        <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
    </div>
    <div class="card-auto__body">
        <div class="card-auto__header">
            <h3 class="card-auto__title">${auto.marca} ${auto.modelo}</h3>
            <p class="card-auto__price">$ ${precioFormateado}</p>
        </div>
        <p class="card-auto__meta">
            ${auto.year} · ${auto.puertas} puertas · 
            ${auto.transmision === 'automatico' ? 'Automática' : 'Manual'}
        </p>
        <p class="card-auto__tag">Color: ${auto.color}</p>
        <div class="card-auto__footer">
            <button class="card-auto__btn">Contactar</button>
        </div>
    </div>
`;


        contenedor.appendChild(card);
    });
}


function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}

function filtrarAuto() {
    if (filtrosVacios()) {
        mostrarMensajeInicial();
        return;
    }

    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}


// Aplica los filtros
function filtrarMarca(auto) {
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    } 
    return auto;
}
function filtrarYear(auto) {
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    } 
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    } 
    return  auto;
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000); 
}


window.onload = showToast;
