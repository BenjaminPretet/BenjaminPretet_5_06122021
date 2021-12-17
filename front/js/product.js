//récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Méthode 1(slice) extraction id
//const idProduct = queryString_url_id.slice(4)
//console.log(idProduct);


//Méthode 2(URLsearchParams) extraction id

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const idProduct = urlSearchParams.get("id")
console.log(idProduct);


//affichage du produit qui a été sélectionné par l'id
//utilisation de fetch en mettant la valeur de l'id a la fin de l'url

fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        product(value);
    })
    .catch(function(err) {
        console.log(err);
    });

//déclaration de la fonction
function product(data) {
    console.log(data);
    
    for (let i = 0; i < data.colors.length; i++) {
        console.log(data.colors[i]);
        
        document.getElementById("colors").innerHTML = document.getElementById("colors").innerHTML + `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }

    
    document.getElementsByClassName("item__img")[0].innerHTML = `
        <img src="${data.imageUrl}" alt="${data.altTxt}" />
    `
    document.getElementsByClassName("item__content__titlePrice")[0].innerHTML = `
        <h1 id="title">${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span> €</p>
    `
    document.getElementById("description").innerHTML = `
        <p id="description">${data.description}</p>
    `
}

