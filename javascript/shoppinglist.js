const getShoppingList = () => {
	const ShoppingList = {
		itemList: [],
		// retrieving item name and price 
		addToList: (itemNames, itemPrices)  => {
			const item = {
				'name': itemNames,
				'price': parseInt(itemPrices, 10),
			}
		// adding parced price and item name to a array
			console.log(ShoppingList.itemList.push(item));
			return ShoppingList.itemList;
		},
		// grabbing properteis from the array
		totalSum: () => {
	    const listContent = ShoppingList.itemList;
	    
	    let sum = 0;
	    listContent.forEach(function(entry) {
	        sum += entry.price;
	    });
	    	return sum;
		},
		countItemsInList: () => {
			return ShoppingList.itemList.length;
		},
		removeFromList: (listPriceItem) => {
			ShoppingList.listPriceItem = ShoppingList.listPriceItem.filter((currentItem) => {
				return currentItem !== listPriceItem;
			});
			return ShoppingList.listPriceItem;
		}
	};	

	return ShoppingList;
};


// -----------------------------------------------------
// create empty shopping list
const myShoppingList = getShoppingList();


// we use the render function to ALWAYS draw an
// accurate depiction of the shoppinglist for the user

const render = (container, shoppingList) => {
    let str = '';

    for (let i = 0; i < shoppingList.countItemsInList(); i++) {
	if (myShoppingList.totalSum() < `${maxBudget.value}`) {
	 str += `<li>$<span>${shoppingList.itemList[i].price}</span> ${shoppingList.itemList[i].name}</li>`; 
	} else {
		str += `<li class="over_limit">$<span>${shoppingList.itemList[i].price}</span> ${shoppingList.itemList[i].name}</li>` + `<p class="validation alert-danger"> you are over your limit, please adjust your list</p>`; 
	}
    }
    container.innerHTML = `<ol class="orderdList">${str}</ol>` + `<p class="message_text"> The price so far is <span>$${myShoppingList.totalSum()}</span></p>`;
}

const dupplicate = (container) => {

container.innerHTML += ` <div class="input-group input_group mb-3">
      <input type="text" class="form-control js-shopping-list-price" placeholder="Price to add..." aria-label="Recipient's username" aria-describedby="basic-addon2">
      <input type="text" class="form-control js-shopping-list-item" placeholder="Item to add..." aria-label="Recipient's username" aria-describedby="basic-addon2">
  </div>`

}


///////////////////////////////////////////////////////


// EVENT LISTENERS
const onAddToListClicked = (evt) => {
	// Looping through to add values to list and clearing values after
	let itemPrices = document.querySelectorAll('.js-shopping-list-price');

	let itemNames = document.querySelectorAll('.js-shopping-list-item');

	for (let i=0; i <itemNames.length;i++) {
		if (itemNames[i].value || itemPrices[i].value !== '') {
			console.log(myShoppingList.addToList(itemNames[i].value, itemPrices[i].value));
		} else if (itemNames[i].value || itemPrices[i].value == '' ) {
			$(".container_wrapper").addClass( "test");
			$( ".js-shopping-list-price, .js-shopping-list-item" ).addClass( "input_validation" );
		}
		itemNames[i].value = '';
		itemPrices[i].value = '';
	}
	// calculating the total sum of the list
	console.log(myShoppingList.totalSum());

	console.log(itemPrices.length);
	// renders the list 
	render(shoppingListCont, myShoppingList);
} // button click handler

const onEnterKeyPressed = (evt) => {
	if (evt.keyCode === 13) {
	// Looping through to add values to list and clearing values after
	for (let i=0; i <itemNames.length;i++) {
		console.log(myShoppingList.addToList(itemNames[i].value, itemPrices[i].value));
		itemNames[i].value = '';
		itemPrices[i].value = '';
	}
	// calculating the total sum of the list
	console.log(myShoppingList.totalSum());
	// renders the list 
	render(shoppingListCont, myShoppingList);
	}
} // keypress handler

const onContainerClicked = (evt) => {
	myShoppingList.removeFromList(evt.target.innerHTML);
	render(shoppingListCont, myShoppingList);
}

const addAnotherItemSet = (evt) => {
	dupplicate(shoppingContainWrapper); 	
	let itemPrices = document.querySelectorAll('.js-shopping-list-price');
	let itemNames = document.querySelectorAll('.js-shopping-list-item');

	console.log(itemPrices.length);
}

// INIT VARIABLES

const maxBudget = document.querySelector('.max_budget');

const shoppingContainer = document.querySelector('.container');

const shoppingContainWrapper = document.querySelector('.container_wrapper');

const addToList = document.querySelector('.js-add-to-list');

const addAnotherSet = document.querySelector('.addAnother');

const shoppingListCont = document.querySelector('.js-shopping-list-container');


// EVENT HANDLERS
addToList.addEventListener('click', onAddToListClicked);
shoppingContainer.addEventListener('keypress', onEnterKeyPressed);
shoppingListCont.addEventListener('click', onContainerClicked);
addAnotherSet.addEventListener('click', addAnotherItemSet);
