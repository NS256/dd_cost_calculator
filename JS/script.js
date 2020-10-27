function setAvailableItems() {
    //add available item names to array
    for ( var i=0; i < itemPriceList.length; i++) {
        var itemName = itemPriceList[i].name;
        itemNames.push(itemName);
    }

    //add available item to list of available items
    for ( var i = 0; i < itemNames.length; i++ ){
        newOption = document.createElement("OPTION");
        newOption.setAttribute("value", itemNames[i]);
        document.querySelector("#available-gear").appendChild(newOption);
    }
}


function addNewItem(){
        //increase item number value
    itemNumber++;

        //setup item number, quantity number and line break
    let itemLabelName = "item-" + itemNumber;
    let quantityLabelName = "quantity-" + itemNumber;
    let costLabelName = "cost-" + itemNumber;
    let lineBreak = document.createElement("br");

        //set up column 1 of table
    var itemName = document.createElement("label");
    itemName.setAttribute("for", itemLabelName);
    itemName.innerHTML = "Item:";

    var quantity = document.createElement("label");
    quantity.setAttribute("for", quantityLabelName);
    quantity.innerHTML = "Quantity:";

    var col1 = document.createElement("td");
    col1.appendChild(itemName);
    col1.appendChild(document.createElement("br"));
    col1.appendChild(quantity);

        //setup column 2 of table
    var itemBox = document.createElement("input");
    itemBox.setAttribute("list", "available-gear");
    itemBox.setAttribute("id", itemLabelName);
    itemBox.setAttribute("class", "item");
    itemBox.addEventListener("change",calculateTotal,false);

    var quantityBox = document.createElement("input");
    quantityBox.setAttribute("type", "text");
    quantityBox.setAttribute("id", quantityLabelName);
    quantityBox.setAttribute("class", "quantity");
    quantityBox.addEventListener("keyup",calculateTotal,false);

    var col2 = document.createElement("td");
    col2.appendChild(itemBox);
    col2.appendChild(lineBreak);
    col2.appendChild(quantityBox);

        //setup column 3 of table
    var col3 = document.createElement("td");
    col3.setAttribute("id", costLabelName);
    col3.setAttribute("style", "text-align: center;")
    col3.innerHTML = "Cost: £0";

    var tableRow = document.createElement("tr");
    let rowID = "tableItem" + itemNumber;
    tableRow.setAttribute("class","tableItem");
    tableRow.setAttribute("id",rowID);
    tableRow.appendChild(col1);
    tableRow.appendChild(col2);
    tableRow.appendChild(col3);

    gearSelectTable.appendChild(tableRow);
    totalItemResult.innerHTML = itemNumber;

}

function calculateTotal(){
    totalItemCost = 0;
    var itemArray = [];

    for (var i = 1; i<=itemNumber; i++) {
        var itemPrice = [];
        var rentPrice;
        let itemName = "#item-" + i;
        let itemQuantity = "#quantity-" + i;
        let itemCost = "#cost-" + i;
        var selectedItem = document.querySelector(itemName).value;
        var selectedQuantity = document.querySelector(itemQuantity).value;
        var selectedCost = document.querySelector(itemCost);

        rentPrice = findItemPrice(selectedItem);
        rentPrice *= selectedQuantity;



        if (!isNaN(rentPrice)){
            selectedCost.innerHTML = "Cost: £" + rentPrice;
            totalItemCost+=rentPrice;
        } else {
            selectedCost.innerHTML = "Cost: £0"
            console.info( "error surrounding" + itemQuantity);
        }


    }
    calculateCharityDiscount();
}

function calculateCharityDiscount() {
    var charityDiscount = document.querySelector("#charitable-discount").value;

    if (charityDiscount == "") {
        charityDiscount = 0;
    }

    totalCostOutput.innerHTML = "£" + (totalItemCost - ((totalItemCost/100) * charityDiscount));

}

var itemNames = [];
const availableGearList = document.querySelector("#available-gear");
const gearSelectTable = document.querySelector(".gear-select-table tbody");
const totalItemResult = document.querySelector("#total-item-counter");
const totalCostOutput = document.querySelector("#total-cost");
var allQuantItems = document.querySelectorAll("#quantity");
var newOption;
var itemNumber = 0;
var totalItemCost = 0;
var findItemPrice = function(chosenItem){
    for (var i = 0; i < itemPriceList.length; i++) {
        if ( itemPriceList[i].name == chosenItem ) {
            return itemPriceList[i].pricePerDay;
        }
    }
}

//run setup functions
setAvailableItems();
addNewItem();
totalItemResult.innerHTML = itemNumber;

//event listeners
document.querySelector("#charitable-discount").addEventListener("keyup", calculateCharityDiscount, false);
document.querySelector("#item-1").addEventListener("change",calculateTotal,false);
document.querySelector("#quantity-1").addEventListener("keyup",calculateTotal,false);
