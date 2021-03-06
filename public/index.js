'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];



function BookingPrice(){
	var timePrice
	var peoplePrice
	var totalPrice
	var totalCommission
	 for (var i = 0 ; i < events.length ; i++){
	 	for (var j = 0; j<bars.length ; j++){
	 		if (events[i].barId == bars[i].id){
	 			//timePrice
	 			timePrice = bars[i].pricePerHour * events[i].time
	 			//peoplePrice
	 			if(events[i].persons > 60){
		 			peoplePrice = bars[i].pricePerPerson * events[i].persons * 0.5
	 				//console.log("reduction 60")
	 			}
	 			else if(events[i].persons > 20){
		 			peoplePrice = bars[i].pricePerPerson * events[i].persons * 0.7
	 				//console.log("reduction 20")
	 			}
	 			else if(events[i].persons > 10){
		 			peoplePrice = bars[i].pricePerPerson * events[i].persons * 0.9
	 				//console.log("reduction")
	 			}
	 			else {
	 				peoplePrice = bars[i].pricePerPerson * events[i].persons	 				
	 			}
	 			//Deducible Option
	 			if (events[i].deductibleReduction == true){
	 				totalPrice = timePrice + peoplePrice + events[i].persons 
	 			}
	 			else {
	 				totalPrice = timePrice + peoplePrice
	 			} 
	 			events[i].price = totalPrice
	 		}
	 	}
	 	//Commissions
	 	totalCommission = events[i].price*0.3
	 	events[i].insurance = totalCommission *0.5
	 	events[i].treasury = events[i].persons
	 	events[i].privateaser = totalCommission*0.5 - events[i].treasury	 	
	 	//console.log(events[i].price)
	 }
}

function Payment(){
	for (var i =0 ; i<actors.length ; i++){
		for (var k = 0 ; k<events.length ; k++){
			if (actors[i].eventId == events[k].id){
				console.log(events[k])
				for (var j = 0 ; j< actors[i].payment.length ; j++){
					
					if(actors[i].payment[j].who == "booker"){
						actors[i].payment[j].amount = events[k].price
					}
					else if(actors[i].payment[j].who == "bar"){
						actors[i].payment[j].amount = events[k].price *0.7
					}
					else if(actors[i].payment[j].who == "insurance"){
						actors[i].payment[j].amount = events[k].insurance
					}
					else if(actors[i].payment[j].who == "treasury"){
						actors[i].payment[j].amount = events[k].treasury
					}
					else if(actors[i].payment[j].who == "privateaser"){
						if (events[k].deductibleReduction ==true){
							actors[i].payment[j].amount = events[k].privateaser + events[k].persons
						}
						else{
							actors[i].payment[j].amount = events[k].privateaser
						}
					}
				}
			}
		}
	}
}

BookingPrice()
Payment()

console.log(bars);
console.log(events);
console.log(actors);
