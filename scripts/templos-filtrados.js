const currentYearSpan = document.querySelector("#currentyear");
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

const lastModifiedSpan = document.querySelector("#modifications");
lastModifiedSpan.textContent = document.lastModified;

const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
});

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem: "imagens/sao_paulo.jpg"
  },
  {
    nomeDoTemplo: "Campinas Brasil",
    localizacao: "Campinas, São Paulo, Brasil",
    consagracao: "2002, 17 de maio",
    area: 48100,
    urlDaImagem: "imagens/campinas.jpg"
  },
  {
    nomeDoTemplo: "Las Vegas Nevada",
    localizacao: "Las Vegas, Nevada, Estados Unidos",
    consagracao: "1989, 16 de dezembro",
    area: 80350,
    urlDaImagem: "imagens/las_vegas.jpg"
  },
  {
    nomeDoTemplo: "Roma Itália",
    localizacao: "Roma, Itália",
    consagracao: "2019, 10 de março",
    area: 41010,
    urlDaImagem: "imagens/roma.jpg"
  },
  {
    nomeDoTemplo: "Salt Lake",
    localizacao: "Salt Lake City, Utah, Estados Unidos",
    consagracao: "1893, 6 de abril",
    area: 253015,
    urlDaImagem: "imagens/salt_lake.jpg"
  }
];

const resgrid = document.querySelector(".resgrid");

function exibirTemplos(listaDeTemplos) {
    resgrid.innerHTML = "";

    listaDeTemplos.forEach((templo, index) => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = templo.urlDaImagem;
        img.alt = templo.nomeDoTemplo;
        img.width = 400;
        img.height = 250;
        img.decoding = "async";

        if (index === 0) {
            img.fetchPriority = "high";
        } else {
            img.loading = "lazy";
        }

        const figcaption = document.createElement("figcaption");
        
        const nomeEl = document.createElement("strong");
        nomeEl.textContent = templo.nomeDoTemplo;
        figcaption.appendChild(nomeEl);
        figcaption.appendChild(document.createElement("br"));

        const locEl = document.createElement("small");
        locEl.textContent = `LOCALIZAÇÃO: ${templo.localizacao}`;
        figcaption.appendChild(locEl);
        figcaption.appendChild(document.createElement("br"));

        const dedEl = document.createElement("small");
        dedEl.textContent = `DEDICADO: ${templo.consagracao}`;
        figcaption.appendChild(dedEl);
        figcaption.appendChild(document.createElement("br"));

        const tamEl = document.createElement("small");
        tamEl.textContent = `TAMANHO: ${templo.area} pés quadrados`;
        figcaption.appendChild(tamEl);

        figure.appendChild(img);
        figure.appendChild(figcaption);
        resgrid.appendChild(figure);
    });
}

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const textoFiltro = link.textContent.trim();
        const tituloPagina = document.querySelector("main h1");

        tituloPagina.textContent = textoFiltro;

        if (textoFiltro === "Página Inicial") {
            exibirTemplos(templos);
        } else if (textoFiltro === "Antigo") {
            const antigos = templos.filter(templo => {
                const ano = parseInt(templo.consagracao.substring(0, 4));
                return ano < 1900;
            });
            exibirTemplos(antigos);
        } else if (textoFiltro === "Novo") {
            const novos = templos.filter(templo => {
                const ano = parseInt(templo.consagracao.substring(0, 4));
                return ano > 2000;
            });
            exibirTemplos(novos);
        } else if (textoFiltro === "Grande") {
            const grandes = templos.filter(templo => templo.area > 90000);
            exibirTemplos(grandes);
        } else if (textoFiltro === "Pequeno") {
            const pequenos = templos.filter(templo => templo.area < 10000);
            exibirTemplos(pequenos);
        }

        navigation.classList.remove('open');
        hambutton.classList.remove('open');
    });
});