//Récupération des informations dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))

//Affichage des produits dans le panier

let produitPanier = produitLocalStorage;

//Récupération d'un produit
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
    } 
    
    let btn_supprimeProduit = document.querySelectorAll(".deleteItem");
    for(let btn of btn_supprimeProduit){
        btn.addEventListener("click", event => {
            deleteItem(event.target.dataset.id, event.target.dataset.color)
            //1- savoir si un produit avec le meme id existe toujours
            //2- si pas de produit alors ont retir a product le produit avec le meme id
            //3- appeller prix total avec products
            const productsFilter = (element) => element._id != event.target.dataset.id || element._id == event.target.dataset.id && element.couleurProduit != event.target.dataset.color;
            products = products.filter(productsFilter)
            prixTotal();
        }); 
    }
    
    
    
    prixTotal();
}
init()

//affichage des articles dans le panier
async function displayProductPanier(data, infoProduitPanier){

    document.getElementById("cart__items").innerHTML +=`
        <article class="cart__item" data-id="${infoProduitPanier.idProduit}" data-color="${infoProduitPanier.couleurProduit}">
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${infoProduitPanier.quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" id="${infoProduitPanier.idProduit}_${infoProduitPanier.couleurProduit}" data-id="${infoProduitPanier.idProduit}" data-color="${infoProduitPanier.couleurProduit}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
    `;

    const element = document.querySelector(`article[data-id='${infoProduitPanier.idProduit}'][data-color='${infoProduitPanier.couleurProduit}']`);
    const input = element.querySelector("input");
    input.addEventListener("change",(e) =>{
        const nombreArticle = parseInt(e.target.value);
        if(nombreArticle === 0){
            deleteItem(infoProduitPanier.idProduit,infoProduitPanier.couleurProduit)
            
        }else if(nombreArticle > 0){
            updateQuantityProduct(infoProduitPanier.idProduit,infoProduitPanier.couleurProduit,nombreArticle)
        }
        prixTotal()
    })
    
}

//Mise a jour de la quantité de produits
function updateQuantityProduct(idProduit,couleurProduit,quantiteProduit){
    const verifProduitMaj = (element) => element.idProduit == idProduit && element.couleurProduit == couleurProduit;
    let resultVerifProduitMaj = produitLocalStorage.findIndex(verifProduitMaj);

    if(resultVerifProduitMaj != -1){
        for(let i = 0; i < produitLocalStorage.length; i++){
            let produit = produitLocalStorage[i];
            if(produit.idProduit === idProduit && produit.couleurProduit === couleurProduit){
                produit.quantiteProduit = quantiteProduit
            }
        }
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    }
}

/**
 * permet de supprimer un item du panier
 * @param {Number} idProduit
 * @param {String} couleurProduit
 */
function deleteItem(idProduit,couleurProduit){

    const verifProduitSupprime = (element) => element.idProduit == idProduit && element.couleurProduit == couleurProduit;
    let resultVerifProduitSupprime = produitLocalStorage.findIndex(verifProduitSupprime);
    console.log(resultVerifProduitSupprime);

    if(resultVerifProduitSupprime != -1){
        const productsFilter = (element) => element.idProduit != idProduit || element.idProduit == idProduit && element.couleurProduit != couleurProduit;
        produitLocalStorage = produitLocalStorage.filter(productsFilter)
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        //recuperation du produit dans le dom pour le supprimé

        const element = document.querySelector(`article[data-id='${idProduit}'][data-color='${couleurProduit}']`);
        element.remove();

    }
}   

async function prixTotal(){

    //calcul de la quantité total d'article et du prix total en fonction du nombre d'articles
    //quantité total
    let produitQuantite = document.getElementsByClassName("itemQuantity");
    let totalQuantite = 0
    //console.log(produitQuantite);

    //prix total
    let produitPrice = document.getElementsByClassName("price")
    let totalPrice = 0

    for(let i = 0; i < produitQuantite.length; i++){
        let valueQuantite = produitQuantite[i].value;
        totalQuantite += produitQuantite[i].valueAsNumber;

        let valuePrice = produitPrice[i].innerHTML;
        let price = valuePrice.replace(" €", "");
        
        totalPrice += parseInt(price) * parseInt(valueQuantite);
    }

    let quantiteTotalProduit = document.getElementById("totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;
    
    let prixTotalProduit = document.getElementById("totalPrice");
    prixTotalProduit.innerHTML = totalPrice;
    
}

//formulaire

let btnEnvoyerFormulaire = document.getElementById("order");

//événement au click
btnEnvoyerFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    //récupérations des valeurs du formulaire
    const contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value
    }

    //Controle des valeurs du formulaire :
    //regex pour tout les inputs
    const regExPrenomNomVille = (value) => {
        return /^[a-zA-Z\s]{3,30}$/.test(value)
    }

    const regExAdresse = (value) => {
        return /^[0-9a-zA-Z\s]{3,50}$/.test(value)
    }

    const regExEmail = (value) => {
        return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value)
    }

    //controle des valeurs du formulaire avec message d'érreur
    function controlePrenom(){
        const firstName = document.getElementById("firstName").value;
        if(regExPrenomNomVille(firstName)){
            return true;
        }else{
            document.getElementById("firstNameErrorMsg").innerHTML +=`
            <p>Les chiffres et les caractères spéciaux ne sont pas autorisé</p>
            `
            return false;
        };
    };

    function controleNom(){
        const lastName = document.getElementById("lastName").value;
        if(regExPrenomNomVille(lastName)){
            return true;
        }else{
            document.getElementById("lastNameErrorMsg").innerHTML +=`
            <p>Les chiffres et les caractères spéciaux ne sont pas autorisé</p>
            `
            return false;
        };
    };

    function controleAdresse(){
        const address = document.getElementById("address").value;
        if(regExAdresse(address)){
            return true;
        }else{
            document.getElementById("addressErrorMsg").innerHTML +=`
            <p>Les caractères spéciaux ne sont pas autorisé</p>
            `
            alert("les symboles ne sont pas autorisé");
            return false;
        };
    };

    function controleVille(){
        const city = document.getElementById("city").value;
        if(regExPrenomNomVille(city)){
            return true;
        }else{
            document.getElementById("cityErrorMsg").innerHTML +=`
            <p>Les chiffres et les caractères spéciaux ne sont pas autorisé</p>
            `
            return false;
        };
    };

    function controleEmail(){
        const email = document.getElementById("email").value;
        if(regExEmail(email)){
            return true;
        }else{
            document.getElementById("emailErrorMsg").innerHTML +=`
            <p>Veuillez renseigner correctement votre adresse email</p>
            `
            return false;
        };
    };

    //envoyer les valeurs du formulaire dans le local storage
    if(controlePrenom() && controleNom() && controleAdresse && controleVille () && controleEmail()){
        localStorage.setItem("contact", JSON.stringify(contact));

        let products = []

        for(let i = 0; i < produitLocalStorage.length; i++){
            const product = produitLocalStorage[i]
            products.push(product.idProduit)
        }   

        const envoyerInfo = {
            products,
            contact,
        };
    
    

        fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            body: JSON.stringify(envoyerInfo),
            headers: {
                "Content-Type" : "application/json",
            },
        })
    
        .then(function(res) {
           if (res.ok) {
               return res.json();
           } 
        })
        .then(function(dataApi) {
            //rediriger vers la page de confirmation
            window.location.href = "confirmation.html?id="+ dataApi.orderId;
        })
    
    }else{
        alert("Veuillez remplir le formulaire correctement");
    }
})








