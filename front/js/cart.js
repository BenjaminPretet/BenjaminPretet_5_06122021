//Récupération des informations dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
//console.log(produitLocalStorage);

//Affichage des produits dans le panier

let produitPanier = produitLocalStorage;
console.log(produitPanier);

let tableauPanier = [];

/*async function getData(){
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
}*/

async function getData(id){
        const data = await fetch(`http://localhost:3000/api/products/${id}`)
            .then(function(res){
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                return value;
            })
            .catch(function(err){
                console.log(err);
            });

            return data;
    
}

async function init(){
    let products = []

    for(let i = 0; i < produitPanier.length; i++){
        const value = await getData(produitPanier[i].idProduit);
        displayProductPanier(value, produitPanier[i])

        products.push(value);

        // test variable pour suppression de produit
        let idSupprime = produitPanier[i].idProduit
        let couleurSupprime = produitPanier[i].couleurProduit
        console.log(idSupprime);
        console.log(couleurSupprime);
        
    } 
    const btn_supprimeProduit = document.querySelectorAll(".deleteItem");
    for(let btn of btn_supprimeProduit){
        btn.addEventListener("click", event => {
            deleteItem(event)
            console.log(event.target);
            console.log(event.target.dataset.id);
            console.log(event.target.dataset.color);
        }); 
    }
    
    
    
    prixTotal(products);
}
init()

//affichage des atricles dans le panier
async function displayProductPanier(data, infoProduitPanier){

    document.getElementById("cart__items").innerHTML +=`
        <article class="cart__item" data-id="${infoProduitPanier.idProduit} " data-color="${infoProduitPanier.couleurProduit}">
            <div class="cart__item__img">
                <img src="${data.imageUrl} " alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${infoProduitPanier.couleurProduit}</p>
                    <p class="price">${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${infoProduitPanier.quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" id="${infoProduitPanier.idProduit}_${infoProduitPanier.couleurProduit}" data-id="${infoProduitPanier.idProduit}" data-color="${infoProduitPanier.couleurProduit}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
    `;

    
}

//Supprimer un article
//console.log(infoProduitPanier);

/**
 * permet de supprimer un item du panier
 * parametre : 
 * -1 id du produit
 * -2 option de couleur
 * @param {*} e 
 */
function deleteItem(e){
    // => j'ecrit mon code ici
console.log("test");

}   

//deleteItem();

async function prixTotal(products){

    //calcul de la quantité total d'article et du prix total en fonction du nombre d'articles
    //quantité total
    let produitQuantite = document.getElementsByClassName("itemQuantity");
    let totalQuantite = 0;
    //console.log(produitQuantite);

    //prix total
    let produitPrice = document.getElementsByClassName("price")
    let totalPrice = 0

    products.forEach((element, i) => {
        //console.log(element);

        let valueQuantite = produitQuantite[i].value;
        totalQuantite += produitQuantite[i].valueAsNumber;

        totalPrice += element.price * parseInt(valueQuantite);
        
        
    });

    /*for(let i = 0; i < produitQuantite.length; i++){
        let valueQuantite = produitQuantite[i].value;
        totalQuantite += produitQuantite[i].valueAsNumber;

        let valuePrice = produitPrice[i].innerHTML;
        let price = valuePrice.replace(" €", "");
        
        //console.log(valueQuantite);
        //console.log(valuePrice);
        //console.log(parseInt(price) * parseInt(valueQuantite));

        totalPrice += parseInt(price) * parseInt(valueQuantite);
        //console.log(totalPrice);
    }*/

    let quantiteTotalProduit = document.getElementById("totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;
    
    let prixTotalProduit = document.getElementById("totalPrice");
    prixTotalProduit.innerHTML = totalPrice;
    
}






