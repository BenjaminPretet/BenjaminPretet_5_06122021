//Récupération des informations dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
console.log(produitLocalStorage);

//Affichage des produits dans le panier

let produitPanier = produitLocalStorage;
console.log(produitPanier);

let tableauPanier = [];

for(let i = 0; i < produitPanier.length; i++){

    fetch(`http://localhost:3000/api/products/${produitPanier[i].idProduit}`)
        .then(function(res){
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            displayProductPanier(value, produitPanier[i]);
        })
        .catch(function(err){
            console.log(err);
        });

}

function displayProductPanier(data, infoProduitPanier){

    console.log(infoProduitPanier);

    document.getElementById("cart__items").innerHTML = document.getElementById("cart__items").innerHTML + `
        <article class="cart__item" data-id="${infoProduitPanier.idProduit} " data-color="${infoProduitPanier.couleurProduit}">
            <div class="cart__item__img">
                <img src="${data.imageUrl} " alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${infoProduitPanier.couleurProduit}</p>
                    <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${infoProduitPanier.quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}