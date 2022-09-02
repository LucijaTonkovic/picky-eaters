//Open and close cart and address section

document.getElementsByClassName('cart_icon')[0].addEventListener('click', function (){
    document.querySelector('.cart_popUp').style.display = 'flex';
})

document.getElementsByClassName('close')[0].addEventListener('click',function (){
    document.querySelector('.cart_popUp').style.display = 'none';
})

document.getElementsByClassName('order_back_button')[0].addEventListener('click', function (){
    document.querySelector('.order_address_popUp').style.display = 'none';
    document.querySelector('.cart_popUp').style.display = 'flex';
})

document.getElementsByClassName('order_close')[0].addEventListener('click', function (){
    document.querySelector('.order_address_popUp').style.display = 'none';
})

//Generate the cart depending on what's stored in the Local Storage

if(localStorage.length != 0){
    generateCart();
}

//Only works on reload

function generateCart(){
    clear_cart();
    var orderObj_serialized = localStorage.getItem("order");
    var orderObj = JSON.parse(orderObj_serialized);
    var num_of_items = orderObj.items.length;
    console.log(num_of_items);
    for(let i = 0; i < num_of_items; i++){
        let name = orderObj.items[i].name;
        let imageSrc = orderObj.items[i].image;
        let price = orderObj.items[i].price;
        let item_id = orderObj.items[i].id;
        addItemToCart(name, imageSrc, price, item_id);
    }
    upgrade_total_price()
}

function addItemToCart(name, imageSrc, price, item_id){
    var cartItem = document.createElement('div');
    var cartItems = document.getElementById('cart_items');
    var cartItemContent = `
                    <div class="cart_item_title_img">
                        <img src="${imageSrc}">
                        <div>${name}</div>
                    </div>

                    <div class="cart_item_price">${price}&euro;</div>

                    <div class="cart_quantity_remove">
                        <input type="number" class="cart_quantity" value="1">
                        <button class="cart_remove_item">Remove</button>
                    </div>`
    cartItem.innerHTML = cartItemContent;
    cartItem.getElementsByClassName("cart_remove_item")[0].setAttribute('id', item_id);
    cartItem.classList.add('cart_item');
    cartItems.append(cartItem);
    cartItem.getElementsByClassName('cart_quantity')[0].addEventListener('change', function (){
        let number = cartItem.getElementsByClassName('cart_quantity')[0].value;
        if(isNaN(number) || number <= 0){
            cartItem.getElementsByClassName('cart_quantity')[0].value = 1;
        }
        upgrade_total_price()
    })
    cartItem.getElementsByClassName('cart_remove_item')[0].addEventListener('click', removeFromStorage);
    check_for_indicator();
}

function clear_cart(){
    var cartItems = document.getElementsByClassName("cart_item");
    if(cartItems.length == 0){
        return;
    }
    for(let i = (cartItems.length - 1); i >= 0; i--){
        console.log(cartItems.length);
        console.log(i);
        console.log(cartItems[i]);
        cartItems[i].remove();
    }
    upgrade_total_price();
}

function upgrade_total_price(){
    var cart_items_container = document.getElementById('cart_items');
    var cart_items = cart_items_container.getElementsByClassName('cart_item');
    console.log("Num of items", cart_items.length)
    var total = 0;
    for(let i = 0; i < cart_items.length; i++){
        console.log(cart_items[i]);
        console.log(i);
        var cart_item = cart_items[i];
        var element_price = cart_item.getElementsByClassName('cart_item_price')[0].innerText;
        console.log(element_price);
        var price = parseFloat(element_price.replace('&euro;', ''))
        console.log(price);
        var quantity = cart_item.getElementsByClassName('cart_quantity')[0].value;
        total += (price * quantity);
    }
    var cart_totals = document.getElementsByClassName("calc_total_price");
    for(let i = 0; i < cart_totals.length; i++){
        cart_totals[i].innerText = total;
    }
}

//Adding event listeners so the cart items show up without reloading as well

var special_buttons = document.getElementsByClassName("specialAddToCart");
var menu_buttons = document.getElementsByClassName("menu_add_to_cart");

for(let i = 0; i < menu_buttons.length; i++){
    menu_buttons[i].addEventListener('click', generateCart);
}

for(let i = 0; i < special_buttons.length; i++){
    special_buttons[i].addEventListener("click", generateCart)
}

var pizza_button = document.getElementById("pizza_add_to_cart");
var pasta_button = document.getElementById("pasta_add_to_cart");
var burger_button = document.getElementById("burger_add_to_cart");
var pancake_button = document.getElementById("pancake_add_to_cart");

//If one button is found all will be found (we are on the menu page)
if(pizza_button != null){
    pizza_button.addEventListener('click', generateCart);
    pasta_button.addEventListener('click', generateCart)
    burger_button.addEventListener('click', generateCart);
    pancake_button.addEventListener('click', generateCart)
}

//Cart indicator show up when there are items in the cart and disappear when there aren't any

function check_for_indicator(){
    var cart_indicators = document.getElementsByClassName("items_in_cart_indicator");
    var num_of_indicators = cart_indicators.length;
    if(localStorage.length == 0){
        for(let i = 0; i < num_of_indicators; i++){
            cart_indicators[i].style.display = 'none';
        }
    }
    else{
        var cart_items = document.getElementsByClassName('cart_item');
        var num_of_items_in_cart = cart_items.length;
        for(let i = 0; i < num_of_indicators; i++){
            cart_indicators[i].innerText = num_of_items_in_cart;
            cart_indicators[i].style.display = 'flex';
        }
    }
}

//Remove item from cart and local storage by clicking on the remove buttons

var removeItemFromCartButtons = document.getElementsByClassName('cart_remove_item');
console.log(removeItemFromCartButtons);

for(let i = 0; i < removeItemFromCartButtons.length; i++){
    removeItemFromCartButtons[i].addEventListener('click', removeFromStorage);
}

function removeFromStorage(event){
    var button_clicked = event.target;
    button_clicked.parentElement.parentElement.remove();
    var button_id = button_clicked.getAttribute("id");
    console.log(button_id);
    var orderObj_serialized = localStorage.getItem("order");
    var orderObj = JSON.parse(orderObj_serialized);
    var num_of_items = orderObj.items.length;
    console.log(num_of_items);
    console.log(orderObj);
    for(let i = 0; i < num_of_items; i++){
        let item_id = orderObj.items[i].id;
        if(item_id == button_id) {
            console.log('found');
            orderObj.items.splice(i, 1);
            console.log(orderObj);
            upgrade_total_price();
            orderObj_serialized = JSON.stringify(orderObj);
            localStorage.setItem('order', orderObj_serialized);
            if(orderObj.items.length == 0){
                localStorage.clear();
            }
            check_for_indicator();
            break;
        }
    }
}

//Clicking the Purchase button

var purchase_buttons = document.getElementsByClassName('purchase');

for(let i = 0; i < purchase_buttons.length; i++){
    purchase_buttons[i].addEventListener('click', purchaseItems);
}

function purchaseItems(event){
    if(localStorage.length == 0){
        alert('There are no items to purchase in the cart!');
        return;
    }
    document.getElementsByClassName('cart_popUp')[0].style.display = 'none';
    document.getElementsByClassName('order_address_popUp')[0].style.display = 'flex';
    /*var clicked_button = event.target;
    var price_for_purchase = clicked_button.parentElement.parentElement.
    getElementsByClassName('calc_total_price')[0].innerText;
    alert("Thank you for your purchase of " + price_for_purchase + "€!");
    clear_cart();
    localStorage.clear();
    check_for_indicator();*/
}

var form1 = document.getElementById('order_address_form1');
var form2 = document.getElementById('order_address_form2');
var form3 = document.getElementById('order_address_form3');

if(form1 != null){
    document.getElementById('order_address_form1').addEventListener('submit', function (e){
        console.log('Ádded');
        e.preventDefault(); //stop form from submitting.
        var price_for_purchase = document.getElementsByClassName('calc_total_price')[0].innerText;
        alert("Thank you for your purchase of " + price_for_purchase + "€!");
        clear_cart();
        localStorage.clear();
        check_for_indicator();
        document.getElementById('order_address_form1').submit();
    })
}

if(form2 != null){
    document.getElementById('order_address_form2').addEventListener('submit', function (e){
        console.log('Ádded');
        e.preventDefault(); //stop form from submitting.
        var price_for_purchase = document.getElementsByClassName('calc_total_price')[0].innerText;
        alert("Thank you for your purchase of " + price_for_purchase + "€!");
        clear_cart();
        localStorage.clear();
        check_for_indicator();
        document.getElementById('order_address_form2').submit();
    })
}

if(form3 != null){
    document.getElementById('order_address_form3').addEventListener('submit', function (e){
        console.log('Ádded');
        e.preventDefault(); //stop form from submitting.
        var price_for_purchase = document.getElementsByClassName('calc_total_price')[0].innerText;
        alert("Thank you for your purchase of " + price_for_purchase + "€!");
        clear_cart();
        localStorage.clear();
        check_for_indicator();
        document.getElementById('order_address_form3').submit();
    })
}

/*for(let i = 0; i < order_details_done_buttons.length; i++){
    console.log('Ádded');
    console.log(order_details_done_buttons);
    order_details_done_buttons[i].addEventListener("submit", function(e){
        e.preventDefault(); //stop form from submitting.
        console.log('I work');
        var price_for_purchase = document.getElementsByClassName('calc_total_price')[0].innerText;
        alert("Thank you for your purchase of " + price_for_purchase + "€!");
        clear_cart();
        localStorage.clear();
        check_for_indicator();

    });
} */
















