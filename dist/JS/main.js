if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{ready()}


function ready() {
    // Effacer un element du panier
    removeCardItemButtoms()
    quantityInput()
    addToCardButton()
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// on pourrait y mettre dans une class Panier()
function removeCardItemButtoms() {
    let removeCardItemButtoms = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCardItemButtoms.length; i++) {
    const buttonRemove = removeCardItemButtoms[i];
    buttonRemove.addEventListener('click', removeCardItem)
    }
}

function quantityInput(){
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener('change', quantityChanged)
        
    }
}
 function addToCardButton(){
    let addToCardButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCardButtons.length; i++) {
    let addButton = addToCardButtons[i];
    addButton.addEventListener('click', addToCardButtonsClicked)
        
    }
 }



function quantityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCardTotal()
}

function purchaseClicked() { 
    alert('thank you for your purchase') 
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
        updateCardTotal() 
    }

}
function addToCardButtonsClicked(e){
        let button = e.target
        let shopItem = button.parentElement.parentElement
        let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        let priceItem = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        // console.log(title,priceItem,imageSrc);
        addItemToCard(title,priceItem,imageSrc)
        updateCardTotal()
    }

    function addItemToCard(title,priceItem,imageSrc) {
        let createCardRow = document.createElement('div')
        createCardRow.classList.add('cart-row')
        let cardItems = document.getElementsByClassName('cart-items')[0]
        cardItemName = cardItems.getElementsByClassName('cart-item-title')
        for (let i = 0; i < cardItemName.length; i++) {
            let cardItemNom = cardItemName[i];
            if (cardItemNom.innerText == title) {
                alert('this is item already add to the cart');
                return
            }
            
        }
        let cardRowContents = ` 
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${priceItem}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
        createCardRow.innerHTML = cardRowContents
        
        cardItems.append(createCardRow)
        createCardRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCardItem)
        createCardRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)


    }


    function removeCardItem(event){
            let buttonRemoveClicked = event.target
            buttonRemoveClicked.parentElement.parentElement.remove()
            updateCardTotal()
    }


    function updateCardTotal() {
        let cardItemContainer = document.getElementsByClassName('cart-items')[0]
        let cardRows = cardItemContainer.getElementsByClassName('cart-row')
        
        let total = 0
        for (let i = 0; i < cardRows.length; i++) {
            let cardRow = cardRows[i];
            let priceElement = cardRow.getElementsByClassName('cart-price')[0]
            let quantityElement = cardRow.getElementsByClassName('cart-quantity-input')[0]
            let price = parseFloat(priceElement.innerText.replace('$',''))
            let quantity = quantityElement.value 
            total = total + (quantity * price);
        }
        total = Math.round(total*100)/100
    let cardTotalPrice = document.getElementsByClassName('cart-total-price')[0]
    cardTotalPrice.innerText = '$' + total
    }

