//récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

//Méthode (URLsearchParams) extraction id

const urlSearchParams = new URLSearchParams(queryString_url_id);

const idProduct = urlSearchParams.get("id")

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
/**
 * affichage info du produit
 * @param {Object} data 
 */
function product(data) {
    
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
    document.getElementById("colors").innerHTML += data.colors.map((data) => `
        <option value="${data}">${data}</option>
        
    `)
}

//ajout au panier

const btn_envoyerPanier = document.querySelector("#addToCart");

btn_envoyerPanier.addEventListener("click", event => addToCart(event));


function addToCart(e) {
    //1 recuperation de donnée
    let quantite = parseInt(document.getElementById("quantity").value);

    let selectionCouleur = document.getElementById("colors");
    let couleur = selectionCouleur.options[selectionCouleur.selectedIndex].value;
    
    //2 control des données
    if (couleur == "") {
        window.alert("Séléctionnez une couleur")
        return;
    }
    
    if (quantite <= 0 || quantite > 100) {
        window.alert("Séléctionnez une quantité, SVP")
    }
    

    //3 local storage
    //information et options produit
    let infoProduit = {
        idProduit:idProduct,
        quantiteProduit:quantite,
        couleurProduit:couleur
    };

    //variable dans laquelle on met les key et les values
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))

    //condition obliger de renseigner correctement les informations
    
    //création constante de vérification de produit dans le local storage

    if(couleur != "" && quantite > 0 && quantite < 100){

        //condition: si il n'y a pas de produit dans le local storage
        if(produitLocalStorage == null){
            produitLocalStorage = [];
            produitLocalStorage.push(infoProduit);
            
        }
       
        //condition: si il y a un produit dans le local storage
        else{

            //comparatif id et option couleur pour additionné les quantitées
            const verifProduitPanier = (element) => element.idProduit == idProduct && element.couleurProduit == couleur;
            let resultVerifProduitPanier = produitLocalStorage.findIndex(verifProduitPanier);
            
            if(resultVerifProduitPanier != -1){
                let quantiteMaxLocalStorage = produitLocalStorage[resultVerifProduitPanier].quantiteProduit + (quantite);
                if(quantiteMaxLocalStorage <= 100){
                    produitLocalStorage[resultVerifProduitPanier].quantiteProduit += (quantite);

                    if(window.confirm("Votre article a bien été sélectionner \nCliquez sur OK pour allez au panier. \nCliquez sur Annuler pour revenir a l'accueil.")){
                        window.location.href = "cart.html"
                    }
                     else{
                        window.location.href = "index.html"
                    } 
                }
                else{
                    window.alert("La quantité dans votre panier dépasse la limite de 100 pour 1 article")
                }
                
                
            }
            else{
                produitLocalStorage.push(infoProduit);
            }
            
        }

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    }
    else{
       window.alert("couleur ou quantité non renseigner, veuillez reéssayer !! ")
    }
}
