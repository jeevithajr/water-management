const fs = require("fs");
let consumptionPerPerson;
let unitCost;
let waterConsumedByGuest = 0;
let corporationWater;
let borewellWater;
let guest = 0;
let data;

//alloting water in liters based on people count in apartment i.e 2 or 3
function allotWater(inputType, corporationWater, borewellWater) {
    corporationWater = +corporationWater;
    borewellWater = +borewellWater;
    if (inputType == 2) {
        consumptionPerPerson = 900;
    } else if (inputType == 3) {
        consumptionPerPerson = 1500;
    }

    unitCost = consumptionPerPerson / (corporationWater + borewellWater);
};

//based on additional guest calculating water consumed by guest
function addGuest(addGuest) {
    guest += addGuest;
    waterConsumedByGuest = guest * 10 * 30;
};

/*calculating bill based on water consumed by apartment members and 
the additional guess depending on water type supplied in the ratio*/
function getBill() {
    let guestBill = 0;
    if (waterConsumedByGuest >= 0 && waterConsumedByGuest <= 500) {
        guestBill = 0 * 2 + waterConsumedByGuest * 2;
    }
    else if (waterConsumedByGuest > 500 && waterConsumedByGuest <= 1500) {
        guestBill = 500 * 2 + (waterConsumedByGuest - 500) * 3;
    }
    else if (waterConsumedByGuest > 1500 && waterConsumedByGuest <= 3000) {
        guestBill = 500 * 2 + 1000 * 3 + (waterConsumedByGuest - 1500) * 5;
    }
    else if (waterConsumedByGuest > 3500) {
        500 * 2 + 1000 * 3 + 1500 * 5 + (waterConsumedByGuest - 3000) * 8;
    }

    let totalBill = Math.ceil(
        unitCost * corporationWater * 1 + unitCost * borewellWater * 1.5 + guestBill
    );

    let totalWater =
        unitCost * corporationWater +
        unitCost * borewellWater +
        waterConsumedByGuest;
    totalWater = Math.round(totalWater);

    return `${totalWater}  ${totalBill}`;
};

function mainProgram(input) {
    let inputDataArray = input.trim().split("\n");
    for (let i = 0; i < inputDataArray.length; i++) {
        let input = inputDataArray[i].trim().split(" ");
        if (input[0] === "ALLOT_WATER") {
            let inputType = input[1];
            let corporationToBorewellwaterRatio = input[2].split(":");
            corporationWater = corporationToBorewellwaterRatio[0];
            borewellWater = corporationToBorewellwaterRatio[1];
            allotWater(inputType, corporationWater, borewellWater);
        } else if (input[0] === "ADD_GUESTS") {
            let guest = +input[1];
            addGuest(guest);
        } else if (input[0] === "BILL") {
            console.log(getBill());
        }

    }
}



// reading input file 
data = fs.readFileSync('./input1.txt',
    { encoding: 'utf8', flag: 'r' });

//executing main function
mainProgram(data);