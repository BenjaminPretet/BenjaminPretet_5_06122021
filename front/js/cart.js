//Récupération des informations dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
//console.log(produitLocalStorage);

//Affichage des produits dans le panier

let produitPanier = produitLocalStorage;
//console.log(produitPanier);

let tableauPanier = [];

async function getData(){
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
}


getData()

//affichage des atricles dans le panier
function displayProductPanier(data, infoProduitPanier){

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


    //console.log(data);

    //calcul de la quantité total d'article et du prix total
    //quantité total
    let produitQuantite = document.getElementsByClassName("itemQuantity");
    let monTotal = produitQuantite.length;

    //Quantité total d'articles
    totalQuantite = 0;

    for(let i = 0; i < monTotal; i++){
        totalQuantite += produitQuantite[i].valueAsNumber;
    }

    let quantiteTotalProduit = document.getElementById("totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;

    //console.log(totalQuantite);

    //Prix total
    totalPrice = 0;

    for(let i = 0; i < monTotal; i++){
        totalPrice += (produitQuantite[i].valueAsNumber * data.price);
    }

    let produitTtotalPrice = document.getElementById("totalPrice");
    produitTtotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);


    
    const btn_supprimeProduit = document.querySelectorAll(".deleteItem");

    //console.log(btn_supprimeProduit);
    
    for(let btn of btn_supprimeProduit){
        btn.addEventListener("click", event => deleteItem(event));
        //console.log(btn);
    }
    
    function deleteItem(e){
        console.log("test");
    }
    

    
}





