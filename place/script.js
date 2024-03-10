const placesContainer = document.querySelector("#placesContainer");

console.log(placesContainer);

async function getPlaces() {
  const res = await fetch("https://ruslan-0807.github.io/leipzig/json/json.js");
  const data = await res.json();
  data.map((el) => {
    // создали карточку
    const imageCard = document.createElement("div");
    // добавили заголовок
    const title = document.createElement("h2");
    title.textContent = el.title;
    // добавили описание
    const desc = document.createElement("p");
    desc.textContent = el.desc;
    // добавили картинку
    const img = document.createElement("img");
    img.src = el.image;
    // добавляем ссылку
    const link = document.createElement("a");
    link.textContent = `Ссылка на ${el.title}`;
    link.href = el.link;
    link.target = "_blank";
    // добавляем элементы к карточке
    imageCard.append(title, desc, img, link);
    imageCard.classList.add("imageCard");
    placesContainer.append(imageCard);
  });
}

getPlaces();
