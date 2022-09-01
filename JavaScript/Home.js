//Specials swiper

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
});

//Reviews swiper

var swiper = new Swiper("#reviews", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

//Putting special food items in JSON object and then in local storage

const special_add_to_cart_buttons = document.getElementsByClassName("specialAddToCart");

for(let i = 0; i < special_add_to_cart_buttons.length; i++){
    special_add_to_cart_buttons[i].addEventListener("click", addSpecialToCart)
}

function addSpecialToCart(event){
    var button = event.target;
    let item_name = button.parentElement.getElementsByClassName("special_item_name")[0].innerText;
    let item_price = button.parentElement.getElementsByClassName("price")[0].innerText;
    let img_src = button.parentElement.parentElement.getElementsByClassName("special_item_img")[0].src;
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



