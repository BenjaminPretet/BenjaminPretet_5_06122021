
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        /*appel de la fonction*/
        displayProduct(value);
    })
    .catch(function(err) {
        console.log(err);
    });

/*déclaration de la fonction*/
function displayProduct(data){
    console.table(data);
    
    document.getElementById('items').innerHTML = data.map((data) => `
        <a href="./product.html?id=${data._id} ">
        <article>
            <img src="${data.imageUrl}" alt="${data.altTxt}" 
            <h3 class="productName">${data.name}</h3>
            <p class="productDescription">${data.description}</p>
        </article>
    `).join('');

}
