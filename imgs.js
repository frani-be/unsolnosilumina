const gallery = document.getElementById('gallery');
const images = [];
let imageData = [];

fetch('imgs.csv')
    .then(response => response.text())
    .then(data => {
        imageData = csvToArray(data);
        const numberOfImages = imageData.length;

        for (let i = 0; i < numberOfImages; i++) {
            const img = document.createElement('img');
            
            img.loading = "lazy";
            img.alt = imageData[i].descripcion || `Imagen de Un Sol Nos Ilumina by frani.be (Francisca Beatriz Medina Concha)`;
            img.title = imageData[i].descripcion || `Imagen de Un Sol Nos Ilumina by frani.be (Francisca Beatriz Medina Concha)`;
            img.src = `imgs/${imageData[i].imagen}`;
            
            const figure = document.createElement('figure');
            figure.appendChild(img);
            images.push(figure);
        }
        
        shuffleArray(images);
        images.forEach(figure => gallery.appendChild(figure));
    });

function csvToArray(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const data = line.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = data[index];
        });
        return obj;
    });
}
    
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
