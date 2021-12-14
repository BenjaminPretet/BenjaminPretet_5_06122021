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
    for (let i = 0; i < data.length; i++) {
        console.log(i);
    }
    document.getElementById('item').innerHTML = data.map(() => `
    
    `)
}