// Write a function to distribute gifts to uour friends one by one. It should step once all your friends have received a gifts.

function distributionGifts(totalGifts, friends){
    let giftsGiven = 0;
    for(let i=0; i< friends; i++){
        if(totalGifts > 0){
            giftsGiven++
            totalGifts--
        }
    }
    return giftsGiven;
}

distributionGifts()