const gallery = document.getElementById("gallery");
let images = [];
let imageData = [];

function csvToArray(str) {
    const rows = str.trim().split("\n");
    const headers = rows[0].split(",");
    return rows.slice(1).map(row => {
        const values = row.split(",");
        const el = {};
        headers.forEach((header, index) => {
            el[header] = values[index];
        });
        return el;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

fetch("imgs.csv")
    .then(response => response.text())
    .then(data => {
        imageData = csvToArray(data);
        const fragment = document.createDocumentFragment();

        imageData.forEach(data => {
            const img = document.createElement("img");
            img.loading = "lazy";
            img.alt = data.descripcion || "Imagen de Un Sol Nos Ilumina by frani.be (Francisca Beatriz Medina Concha)";
            img.title = data.descripcion || "Imagen de Un Sol Nos Ilumina by frani.be (Francisca Beatriz Medina Concha)";
            img.src = `imgs/${data.imagen}`;

            const figure = document.createElement("figure");
            figure.appendChild(img);
            images.push(figure);
        });

        shuffleArray(images);
        images.forEach(image => fragment.appendChild(image));
        gallery.appendChild(fragment);
    });
