//Making the menu_nav selections scroll

const anchor_scroll_to_section = document.getElementsByClassName("menu_choice");
const num_of_anchors = anchor_scroll_to_section.length;
for(let i = 0; i < num_of_anchors; i++){
    anchor_scroll_to_section[i].addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
}

//Customize meal pop-up, buttons set-up

document.getElementById("customize_button").addEventListener('click', function(){
    document.getElementById('customize_popUp').style.display = 'flex';
})

document.getElementById("close_customization").addEventListener('click', function(){
    document.getElementById('customize_popUp').style.display = 'none';
})

const back_buttons = document.getElementsByClassName("back_button")
var num_of_buttons = back_buttons.length
for (let i = 0; i < num_of_buttons; i++) {
    back_buttons[i].addEventListener('click', function (){
        document.getElementById('pizza_customization').style.display = 'none';
        document.getElementById('burger_customization').style.display = 'none';
        document.getElementById('pasta_customization').style.display = 'none';
        document.getElementById('pancake_customization').style.display = 'none';
        document.getElementById('pick_customization').style.display = 'block';
    })
}

document.getElementById("pick_pizza").addEventListener('click', function() {
    document.getElementById('pick_customization').style.display = 'none';
    document.getElementById('pizza_customization').style.display = 'block';
})

document.getElementById("pick_burger").addEventListener('click', function() {
    document.getElementById('pick_customization').style.display = 'none';
    document.getElementById('burger_customization').style.display = 'block';
})

document.getElementById("pick_pasta").addEventListener('click', function() {
    document.getElementById('pick_customization').style.display = 'none';
    document.getElementById('pasta_customization').style.display = 'block';
})

document.getElementById("pick_pancake").addEventListener('click', function() {
    document.getElementById('pick_customization').style.display = 'none';
    document.getElementById('pancake_customization').style.display = 'block';
})

//Form reset buttons for the customize forms

const customize_pizza_reset_button = document.getElementById("pizza_reset");
customize_pizza_reset_button.addEventListener("click", function (){
    document.getElementById("pizza_form").reset();
    upgrade_pizza_price();
})

const customize_pasta_reset_button = document.getElementById("pasta_reset");
customize_pasta_reset_button.addEventListener("click", function (){
    document.getElementById("pasta_form").reset();
    upgrade_pasta_price();
})

const customize_burger_reset_button = document.getElementById("burger_reset");
customize_burger_reset_button.addEventListener("click", function (){
    document.getElementById("burger_form").reset();
    upgrade_burger_price();
})

const customize_pancake_reset_button = document.getElementById("pancake_reset");
customize_pancake_reset_button.addEventListener("click", function (){
    document.getElementById("pancake_form").reset();
    upgrade_pancake_price();
})

//Calculating total price in the customization forms and adding event listeners to inputs:

//1) Pizza customization section

const dough_inputs = document.getElementsByName("dough_size");
const crust_inputs = document.getElementsByName("crust_type");
const pizza_cheese_inputs = document.getElementsByName("cheese_type");
const pizza_meat_inputs = document.getElementsByName("meat_type");
const pizza_vegetable_inputs = document.getElementsByName("vegetables");

function upgrade_pizza_price(){
    let total = 0;
    for(let i = 0; i < dough_inputs.length; i++){
        if(dough_inputs[i].checked == true){
            let price = dough_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < crust_inputs.length; i++){
        if(crust_inputs[i].checked == true){
            let price = crust_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pizza_cheese_inputs.length; i++){
        if(pizza_cheese_inputs[i].checked == true){
            let price = pizza_cheese_inputs[i].parentElement.getElementsByClassName("input_price")[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pizza_meat_inputs.length; i++){
        if(pizza_meat_inputs[i].checked == true){
            let price = pizza_meat_inputs[i].parentElement.getElementsByClassName("input_price")[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pizza_vegetable_inputs.length; i++){
        if(pizza_vegetable_inputs[i].checked == true){
            let price = pizza_vegetable_inputs[i].parentElement.getElementsByClassName("input_price")[0].innerText;
            total += parseFloat(price);
        }
    }
    document.getElementById("cpizza_price").innerText = total;
}

upgrade_pizza_price();

for(let i = 0; i < dough_inputs.length; i++){
    dough_inputs[i].addEventListener('change', function (){
        upgrade_pizza_price();
    })
}
for(let i = 0; i < crust_inputs.length; i++){
    crust_inputs[i].addEventListener('change', function (){
        upgrade_pizza_price();
    })
}
for(let i = 0; i < pizza_cheese_inputs.length; i++){
    pizza_cheese_inputs[i].addEventListener('change', function (){
        upgrade_pizza_price();
    })
}
for(let i = 0; i < pizza_meat_inputs.length; i++){
    pizza_meat_inputs[i].addEventListener('change', function (){
        upgrade_pizza_price();
    })
}
for(let i = 0; i < pizza_vegetable_inputs.length; i++){
    pizza_vegetable_inputs[i].addEventListener('change', function (){
        upgrade_pizza_price();
    })
}

//2) Pasta customization section

const pasta_type_inputs = document.getElementsByName("pasta_type");
const pasta_sauce_type = document.getElementsByName("pasta_sauce_type");

function upgrade_pasta_price(){
    let total = 0;
    for(let i = 0; i < pasta_type_inputs.length; i++){
        if(pasta_type_inputs[i].checked == true){
            let price = pasta_type_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pasta_sauce_type.length; i++){
        if(pasta_sauce_type[i].checked == true){
            let price = pasta_sauce_type[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    document.getElementById("cpasta_price").innerText = total;
}

upgrade_pasta_price()

for(let i = 0; i < pasta_type_inputs.length; i++){
    pasta_type_inputs[i].addEventListener('change', function (){
        upgrade_pasta_price();
    })
}
for(let i = 0; i < pasta_sauce_type.length; i++){
    pasta_sauce_type[i].addEventListener('change', function (){
        upgrade_pasta_price();
    })
}

//3) Burger customization section

const patty_number_input = document.getElementsByName("patty_number")[0];
const patty_type_inputs = document.getElementsByName("patty_type");
const burger_cheese_type_inputs = document.getElementsByName("burger_cheese");
const burger_vegetable_inputs = document.getElementsByName("vegetables_in_burger");
const burger_sauce_inputs = document.getElementsByName("burger_sauce");

function upgrade_burger_price(){
    let total = 0;
    total += (patty_number_input.value * 2);
    for(let i = 0; i < patty_type_inputs.length; i++){
        if(patty_type_inputs[i].checked == true){
            let price = patty_type_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < burger_cheese_type_inputs.length; i++){
        if(burger_cheese_type_inputs[i].checked == true){
            let price = burger_cheese_type_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < burger_sauce_inputs.length; i++){
        if(burger_sauce_inputs[i].checked == true){
            let price = burger_sauce_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < burger_vegetable_inputs.length; i++){
        if(burger_vegetable_inputs[i].checked == true){
            let price = burger_vegetable_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    document.getElementById("cburger_price").innerText = total;
}

upgrade_burger_price();

patty_number_input.addEventListener('change', function(){
    let number = patty_number_input.value;
    if(isNaN(number) || number <= 0){
        patty_number_input.value = 1;
    }
    else if(number > 3){
        patty_number_input.value = 3;
    }
    upgrade_burger_price()
})
for(let i = 0; i < patty_type_inputs.length; i++){
    patty_type_inputs[i].addEventListener('change', function (){
        upgrade_burger_price();
    })
}
for(let i = 0; i < burger_cheese_type_inputs.length; i++){
    burger_cheese_type_inputs[i].addEventListener('change', function (){
        upgrade_burger_price();
    })
}
for(let i = 0; i < burger_sauce_inputs.length; i++){
    burger_sauce_inputs[i].addEventListener('change', function (){
        upgrade_burger_price();
    })
}
for(let i = 0; i < burger_vegetable_inputs.length; i++){
    burger_vegetable_inputs[i].addEventListener('change', function (){
        upgrade_burger_price();
    })
}

//4) Pancake customization section

const pancake_waffle_inputs = document.getElementsByName("pancake_or_waffle");
const pancakes_number_input = document.getElementsByName("pancake_number")[0];
const pancake_filling_inputs = document.getElementsByName("pancake_filling");
const pancake_fruit_inputs = document.getElementsByName("fruits");

function upgrade_pancake_price(){
    let total = 0;
    total += (pancakes_number_input.value * 2);
    for(let i = 0; i < pancake_waffle_inputs.length; i++){
        if(pancake_waffle_inputs[i].checked == true){
            let price = pancake_waffle_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pancake_filling_inputs.length; i++){
        if(pancake_filling_inputs[i].checked == true){
            let price = pancake_filling_inputs[i].parentElement.getElementsByClassName('input_price')[0].innerText;
            total += parseFloat(price);
        }
    }
    for(let i = 0; i < pancake_fruit_inputs.length; i++){
        if(pancake_fruit_inputs[i].checked == true){
            total += 3;
            break;
        }
    }
    document.getElementById("cpancake_price").innerText = total;
}

upgrade_pancake_price();

pancakes_number_input.addEventListener('change', function(){
    let number = pancakes_number_input.value;
    if(isNaN(number) || number <= 0){
        pancakes_number_input.value = 1;
    }
    else if(number > 4){
        pancakes_number_input.value = 4;
    }
    upgrade_pancake_price()
})
for(let i = 0; i < pancake_waffle_inputs.length; i++){
    pancake_waffle_inputs[i].addEventListener('change', function (){
        upgrade_pancake_price();
    })
}
for(let i = 0; i < pancake_filling_inputs.length; i++){
    pancake_filling_inputs[i].addEventListener('change', function (){
        upgrade_pancake_price();
    })
}
for(let i = 0; i < pancake_fruit_inputs.length; i++){
    pancake_fruit_inputs[i].addEventListener('change', function (){
        upgrade_pancake_price();
    })
}

//Putting menu items in JSON object and then in local storage

const menu_add_to_cart_buttons = document.getElementsByClassName("menu_add_to_cart");

for(let i = 0; i < menu_add_to_cart_buttons.length; i++){
    menu_add_to_cart_buttons[i].addEventListener("click", addToCart)
}

function addToCart(event){
    var button = event.target;
    let item_name = button.parentElement.parentElement.getElementsByClassName("menu_item_name")[0].innerText;
    let item_price = button.parentElement.getElementsByClassName("price")[0].innerText;
    let img_src = button.parentElement.parentElement.getElementsByClassName("menu_img_src")[0].src;
    console.log(item_name, item_price, img_src);
    if(localStorage.length == 0){
        var orderObj = {
            maxId: 0,
            items: [],
        }
        var item_id = 0;
    }
    else{
        var orderObj_serialized = localStorage.getItem("order");
        var orderObj = JSON.parse(orderObj_serialized);
        for(let i = 0; i < orderObj.items.length; i++){
            if(item_name == orderObj.items[i].name){
                alert("This item is already in the cart. Please change the quantity");
                return;
            }
        }
        console.log(orderObj_serialized);
        console.log(orderObj);
        var item_id = orderObj.maxId + 1;
        orderObj.maxId++;
        console.log(item_id);
    }
    let itemObj = {
        id: item_id,
        name: item_name,
        image: img_src,
        price: item_price,
    }
    orderObj.items.push(itemObj);
    console.log(orderObj);
    orderObj_serialized = JSON.stringify(orderObj);
    console.log(orderObj_serialized);
    localStorage.setItem("order", orderObj_serialized);
}

//Putting customized items in JSON object and then in local storage

//i) Pizza Section

document.getElementById("pizza_add_to_cart").addEventListener("click", addPizzaToCart)

function addPizzaToCart(event){
    let img_src = document.getElementById("custom_pizza_img").src;
    let custom_item_price = document.getElementById("cpizza_price").innerText;
    let item_name = "Custom Pizza";
    if(localStorage.length == 0){
        var orderObj = {
            maxId: 0,
            items: [],
        }
        var item_id = 0;
    }
    else{
        var orderObj_serialized = localStorage.getItem("order");
        var orderObj = JSON.parse(orderObj_serialized);
        console.log(orderObj_serialized);
        console.log(orderObj);
        var item_id = orderObj.maxId + 1;
        orderObj.maxId++;
        console.log(item_id);
    }
    let itemObj = {
        id: item_id,
        name: item_name,
        image: img_src,
        price: custom_item_price,
    }
    orderObj.items.push(itemObj);
    console.log(orderObj);
    orderObj_serialized = JSON.stringify(orderObj);
    console.log(orderObj_serialized);
    localStorage.setItem("order", orderObj_serialized);
    document.getElementById("pizza_form").reset();
    upgrade_pizza_price();
}

//ii) Pasta Section

document.getElementById("pasta_add_to_cart").addEventListener("click", addPastaToCart)

function addPastaToCart(event){
    let img_src = document.getElementById("custom_pasta_img").src;
    let custom_item_price = document.getElementById("cpasta_price").innerText;
    let item_name = "Custom Pasta";
    if(localStorage.length == 0){
        var orderObj = {
            maxId: 0,
            items: [],
        }
        var item_id = 0;
    }
    else{
        var orderObj_serialized = localStorage.getItem("order");
        var orderObj = JSON.parse(orderObj_serialized);
        console.log(orderObj_serialized);
        console.log(orderObj);
        var item_id = orderObj.maxId + 1;
        orderObj.maxId++;
        console.log(item_id);
    }
    let itemObj = {
        id: item_id,
        name: item_name,
        image: img_src,
        price: custom_item_price,
    }
    orderObj.items.push(itemObj);
    console.log(orderObj);
    orderObj_serialized = JSON.stringify(orderObj);
    console.log(orderObj_serialized);
    localStorage.setItem("order", orderObj_serialized);
    document.getElementById("pasta_form").reset();
    upgrade_pasta_price();
}

//iii) Burger Section

document.getElementById("burger_add_to_cart").addEventListener("click", addBurgerToCart)

function addBurgerToCart(event){
    let img_src = document.getElementById("custom_burger_img").src;
    let custom_item_price = document.getElementById("cburger_price").innerText;
    let item_name = "Custom Burger";
    if(localStorage.length == 0){
        var orderObj = {
            maxId: 0,
            items: [],
        }
        var item_id = 0;
    }
    else{
        var orderObj_serialized = localStorage.getItem("order");
        var orderObj = JSON.parse(orderObj_serialized);
        console.log(orderObj_serialized);
        console.log(orderObj);
        var item_id = orderObj.maxId + 1;
        orderObj.maxId++;
        console.log(item_id);
    }
    let itemObj = {
        id: item_id,
        name: item_name,
        image: img_src,
        price: custom_item_price,
    }
    orderObj.items.push(itemObj);
    console.log(orderObj);
    orderObj_serialized = JSON.stringify(orderObj);
    console.log(orderObj_serialized);
    localStorage.setItem("order", orderObj_serialized);
    document.getElementById("burger_form").reset();
    upgrade_burger_price();
}

//iv) Pancake/Waffle Section

document.getElementById("pancake_add_to_cart").addEventListener("click", addPancakeToCart)

function addPancakeToCart(event){
    let img_src = document.getElementById("custom_pancake_img").src;
    let custom_item_price = document.getElementById("cpancake_price").innerText;
    let item_name = "Pancake/Waffle";
    if(localStorage.length == 0){
        var orderObj = {
            maxId: 0,
            items: [],
        }
        var item_id = 0;
    }
    else{
        var orderObj_serialized = localStorage.getItem("order");
        var orderObj = JSON.parse(orderObj_serialized);
        console.log(orderObj_serialized);
        console.log(orderObj);
        var item_id = orderObj.maxId + 1;
        orderObj.maxId++;
        console.log(item_id);
    }
    let itemObj = {
        id: item_id,
        name: item_name,
        image: img_src,
        price: custom_item_price,
    }
    orderObj.items.push(itemObj);
    console.log(orderObj);
    orderObj_serialized = JSON.stringify(orderObj);
    console.log(orderObj_serialized);
    localStorage.setItem("order", orderObj_serialized);
    document.getElementById("pancake_form").reset();
    upgrade_pancake_price();
}
