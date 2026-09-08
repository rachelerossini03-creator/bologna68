
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


const heroImage = document.getElementById("heroImage");

if (heroImage) {
  const immaginiHero = [
    "immagini/DOC_002_assemblea_studenti_via_zamboni.jpg",
    "immagini/DOC_018_commessi_omnia_upim_standa.jpg",
    "immagini/DOC_006_manifestazione_contro_arresto_dutschke.jpg"
  ];

  let indiceCorrente = 0;

  function mostraImmagineHero() {
    const gradiente = "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))";
    heroImage.style.backgroundImage = `${gradiente}, url('${immaginiHero[indiceCorrente]}')`;
  }

  function prossimaImmagine() {
    indiceCorrente = (indiceCorrente + 1) % immaginiHero.length;
    mostraImmagineHero();
  }

  mostraImmagineHero();
  setInterval(prossimaImmagine, 4000);
}


const campoRicerca = document.getElementById("searchInput");


if (campoRicerca) {
  const filtroTipo = document.getElementById("filterType");
  const filtroData = document.getElementById("filterDate");
  const filtroAutore = document.getElementById("filterAuthor");
  const filtroArchivio = document.getElementById("filterArchive");
  const filtroTema = document.getElementById("filterTheme");
  const ordinamento = document.getElementById("sortOrder");

  const griglia = document.getElementById("catalogGrid");
  const messaggioVuoto = document.getElementById("noResults");
  const tutteLeCard = griglia ? griglia.querySelectorAll(".card") : [];

  function aggiornaCatalogo() {
    const testoRicerca = campoRicerca.value.toLowerCase();
    const valoreTipo = filtroTipo ? filtroTipo.value : "";
    const valoreData = filtroData ? filtroData.value : "";
    const valoreAutore = filtroAutore ? filtroAutore.value : "";
    const valoreArchivio = filtroArchivio ? filtroArchivio.value : "";
    const valoreTema = filtroTema ? filtroTema.value : "";

    let cardVisibili = 0;

    tutteLeCard.forEach(function (card) {
      const titolo = card.dataset.title ? card.dataset.title.toLowerCase() : "";

      const corrispondeRicerca = testoRicerca === "" || titolo.includes(testoRicerca);
      const corrispondeTipo = valoreTipo === "" || card.dataset.type === valoreTipo;
      const corrispondeData = valoreData === "" || card.dataset.year === valoreData;
      const corrispondeAutore = valoreAutore === "" || card.dataset.author === valoreAutore;
      const corrispondeArchivio = valoreArchivio === "" || card.dataset.archive === valoreArchivio;
      const corrispondeTema = valoreTema === "" || card.dataset.theme === valoreTema;

      const mostraCard =
        corrispondeRicerca &&
        corrispondeTipo &&
        corrispondeData &&
        corrispondeAutore &&
        corrispondeArchivio &&
        corrispondeTema;

      if (mostraCard) {
        card.style.display = "";
        cardVisibili++;
      } else {
        card.style.display = "none";
      }
    });

    if (ordinamento && griglia) {
      const cardOrdinate = Array.from(tutteLeCard).sort(function (a, b) {
        if (ordinamento.value === "newest") {
          return (b.dataset.date || "").localeCompare(a.dataset.date || "");
        } else {
          return (a.dataset.date || "").localeCompare(b.dataset.date || "");
        }
      });

      cardOrdinate.forEach(function (card) {
        griglia.appendChild(card);
      });
    }

    if (messaggioVuoto) {
      messaggioVuoto.style.display = cardVisibili === 0 ? "block" : "none";
    }
  }

  
  campoRicerca.addEventListener("input", aggiornaCatalogo);
  if (filtroTipo) filtroTipo.addEventListener("change", aggiornaCatalogo);
  if (filtroData) filtroData.addEventListener("change", aggiornaCatalogo);
  if (filtroAutore) filtroAutore.addEventListener("change", aggiornaCatalogo);
  if (filtroArchivio) filtroArchivio.addEventListener("change", aggiornaCatalogo);
  if (filtroTema) filtroTema.addEventListener("change", aggiornaCatalogo);
  if (ordinamento) ordinamento.addEventListener("change", aggiornaCatalogo);
}
