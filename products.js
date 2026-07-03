let iconcart=document.querySelector('.icon-cart');
let body=document.querySelector('body');
let closecart=document.querySelector('.close');
let listProductHTML=document.querySelector('.listproducts');
let listcartHTML = document.querySelector('.listcart');
let iconCartspan = document.querySelector('.icon-cart span');
let listProducts=[];
let carts=[];
iconcart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
closecart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
document.getElementById('checkout').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});
const  addDataToHTML=()=>{
    listProductHTML.innerHTML='';
    if(listProducts.length>0){
        listProducts.forEach(product=>{
            let newproduct = document.createElement('div');
            newproduct.classList.add('item');
            newproduct.dataset.id=product.id;
            newproduct.innerHTML = `
              <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}$</div>
            <button class="addcart">
                Add To Cart
            </button>
            `;
            listProductHTML.appendChild(newproduct);
        })
    }
}
const nameFilter = document.getElementById('filter-name');
const categoryFilter = document.getElementById('filter-category');

const filterProducts = () => {
  const searchValue = nameFilter.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  listProductHTML.innerHTML = '';

  listProducts.forEach(product => {
    const matchesName = product.name.toLowerCase().includes(searchValue);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;

    if (matchesName && matchesCategory) {
      let newproduct = document.createElement('div');
      newproduct.classList.add('item');
      newproduct.dataset.id = product.id;
      newproduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">${product.price}$</div>
        <button class="addcart">Add To Cart</button>
      `;
      listProductHTML.appendChild(newproduct);
    }
  });
};
nameFilter.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
listProductHTML.addEventListener('click',(event)=>{
    let positionclick =event.target;
    if(positionclick.classList.contains('addcart')){
        let product_id = positionclick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
const addToCart =(product_id)=>{
    let positionThisProductInCart = carts.findIndex((value)=>value.product_id==product_id);
if(carts.length<=0){
    carts=[{
        product_id:product_id,
        quantity:1
    }]
}else if(positionThisProductInCart <0){
carts.push({
    product_id:product_id,
    quantity:1
});
}else{
    carts[positionThisProductInCart].quantity= carts[positionThisProductInCart].quantity+1;
}
addCartToHTML();
addCartToMemory();
}
const addCartToMemory=()=>{
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addCartToHTML = () => {
    listcartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newcart = document.createElement('div');
            newcart.classList.add('item');
            newcart.dataset.id = cart.product_id;

            let positionproduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionproduct];

            totalPrice += info.price * cart.quantity;

            newcart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalprice">$${(info.price * cart.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listcartHTML.appendChild(newcart);
        });

        let totalDiv = document.createElement('div');
        totalDiv.classList.add('total');
        totalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
        listcartHTML.appendChild(totalDiv);
    }

    iconCartspan.innerText = totalQuantity;
};
listcartHTML.addEventListener('click',(event)=>{
    let positionclick=event.target;
    if(positionclick.classList.contains('minus')||positionclick.classList.contains('plus')){
let product_id=positionclick.parentElement.parentElement.dataset.id;
let type='minus';
if(positionclick.classList.contains('plus')){
    type = 'plus';
}
changeQuantity(product_id,type);
}
})
const changeQuantity=(product_id,type)=>{
    let positionitemincart=carts.findIndex((value)=>value.product_id == product_id);
    if(positionitemincart>=0){
        switch (type) {
            case 'plus':
                carts[positionitemincart].quantity= carts[positionitemincart].quantity+1;
                break;
        
            default:
                let valuechange= carts[positionitemincart].quantity-1;
                if(valuechange>0){
                     carts[positionitemincart].quantity=valuechange;
                }else{
                    carts.splice(positionitemincart,1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const initApp=()=>{
    fetch('./products.json')
    .then(response=>response.json())
    .then(data=>{
        listProducts=data;
        addDataToHTML();
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();