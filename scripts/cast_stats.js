function computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus){
    tick=1
    while(manaToCast > 0 && tick < 3000) {

        if(tick % manaPerAuto[1] == 0){
            manaToCast -= manaPerAuto[0];
        }
        
        if(tick % augmentBonus[1] == 0){
            manaToCast -= augmentBonus[0];
        }
        
        if(tick % traitBonus[1] == 0){
            manaToCast -= traitBonus[0];
        }

        tick += 1;
    }
    return Math.round(tick/100 *10)/10;
}

function computeFirstCast(){
    let manaToCast = Alpine.store('stats').manaCast - Alpine.store('stats').manaStart
    let manaPerAuto = [Alpine.store('stats').manaGen[0], Alpine.store('stats').manaGen[1]*100]; // [10.5, 0.7]
    let augmentBonus = [Alpine.store('currentAugment').getTotalManaBonus()[0], Alpine.store('currentAugment').getTotalManaBonus()[1]*100]; // [20, 5]
    let traitBonus = [Alpine.store('currentTrait').getTotalManaBonus()[0], Alpine.store('currentTrait').getTotalManaBonus()[1]*100]; // [15, 3]
    return computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus);
}

function computeNextCast(){
    let manaToCast = Alpine.store('stats').manaCast
    let manaPerAuto = [Alpine.store('stats').manaGen[0], Alpine.store('stats').manaGen[1]*100]; // [10.5, 0.7]
    let augmentBonus = [Alpine.store('currentAugment').getTotalManaBonus()[0], Alpine.store('currentAugment').getTotalManaBonus()[1]*100]; // [20, 5]
    let traitBonus = [Alpine.store('currentTrait').getTotalManaBonus()[0], Alpine.store('currentTrait').getTotalManaBonus()[1]*100]; // [15, 3]
    return computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus);
}

function computeCastsPer15(){
    let timeAfterFirstCast = 15 - computeFirstCast();
    let timeToCast = computeNextCast();
    return Math.floor(timeAfterFirstCast / timeToCast) + 1;
}

function computeCastsPer30(){
    let timeAfterFirstCast = 30 - computeFirstCast();
    let timeToCast = computeNextCast();
    return Math.floor(timeAfterFirstCast / timeToCast) + 1;
}