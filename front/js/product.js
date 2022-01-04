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
    console.table(data);
    
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

    /*for (let i = 0; i < data.colors.length; i++) {
        console.log(data.colors[i]);
        
        document.getElementById("colors").innerHTML = document.getElementById("colors").innerHTML + `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }*/

    document.getElementById("colors").innerHTML += data.colors.map((data) => `
        <option value="">${data} </option>
        
    `)
}

//ajout au panier

const btn_envoyerPanier = document.querySelector("#addToCart");

btn_envoyerPanier.addEventListener("click", event => addToCart(event));


function addToCart(e) {
    //1 recuperation de donnée
    let quantite = document.getElementById("quantity").value;
    
    let selectionCouleur = document.getElementById("colors");
    let couleur = selectionCouleur.options[selectionCouleur.selectedIndex].text;
    
    console.log(quantite);
    console.log(couleur);    

    //2 control des données
    /*
    if (quantite > 0 && quantite < 100) {
        window.alert("Merci d'avoir renseignez la quantité")
    }
    else {
        window.alert("Séléctionnez une quantité, SVP")
    }
    
    
    if (couleur = true) {
        window.alert("Merci d'avoir renseignez la couleur")
    }
    else {
        window.alert("Séléctionnez une couleur")
    }*/

    
    if (couleur = true){
        window.alert("Sélectionnez une couleur SVP")
    }
    else {
        window.alert("Merci d'avoir sélectionnez une couleur")
    }
    

    //3 local storage
}
