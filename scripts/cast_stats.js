var tickResolution=100; // global var, ticks per second


function computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus, manaLockTime, autoLockTime){
    let tick=1 + manaLockTime;
    let ticksPerAttack= Math.round(tickResolution * 100 / manaPerAuto[1]);
    while(manaToCast > 0 && tick < 3000) {

        if(tick > autoLockTime && tick % ticksPerAttack == 0){
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

    return Math.round(tick/tickResolution *10)/10;
}


function computeFirstCast(){
    let manaToCast = Alpine.store('stats').manaCast - Alpine.store('stats').manaStart

    let manaPerAuto = [
        Alpine.store('stats').manaGen[0], 
        Alpine.store('stats').manaGen[1] *tickResolution
    ]; // [10.5, 0.7*100]

    let augmentBonus = [
        Alpine.store('currentAugment').getTotalManaBonus()[0], 
        Alpine.store('currentAugment').getTotalManaBonus()[1] *tickResolution
    ]; // [20, 5*100]

    let traitBonus = [
        Alpine.store('currentTrait').getTotalManaBonus()[0], 
        Alpine.store('currentTrait').getTotalManaBonus()[1] *tickResolution
    ]; // [15, 3*100]

    return computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus, 0, 0);
}


function computeNextCast(){
    let manaToCast = Alpine.store('stats').manaCast
    let manaPerAuto = [
        Alpine.store('stats').manaGen[0], 
        Alpine.store('stats').manaGen[1] *tickResolution
    ];

    let augmentBonus = [
        Alpine.store('currentAugment').getTotalManaBonus()[0], 
        Alpine.store('currentAugment').getTotalManaBonus()[1] *tickResolution
    ];

    let traitBonus = [
        Alpine.store('currentTrait').getTotalManaBonus()[0], 
        Alpine.store('currentTrait').getTotalManaBonus()[1] *tickResolution
    ];
    
    let waitFor = 0;
    let autoLockTime = 0;
    if (Alpine.store('currentChampion').spells[0].manaLock) {
        waitFor = Alpine.store('currentChampion').spells[0].duration;
    } else if (Alpine.store('currentChampion').spells[0].autoLock) {
        autoLockTime = Alpine.store('currentChampion').spells[0].duration;
    }
    
    return Math.round(computeCast(manaToCast, manaPerAuto, augmentBonus, traitBonus, waitFor*tickResolution, autoLockTime*tickResolution)*10)/10;
}


function computeCastsPer(time){
    let timeAfterFirstCast = time - computeFirstCast();
    let timeToCast = computeNextCast();
    return Math.floor(timeAfterFirstCast / timeToCast) + 1;
}


// endTime 15 or 30
function computeBuffedTimePer(endTime){
    let buffSpellStats = Alpine.store('currentChampion').spells.filter(spell => spell.type == "buff")[0];

    // no buffs
    if (buffSpellStats == null || buffSpellStats.length == 0) {
        return 0;
    }
    // always active (think azir)
    if (buffSpellStats.manaCast == 0) {
        return endTime;
    }
    
    // buff only on after cast
    let time = endTime - computeFirstCast();
    let timeToCast = computeNextCast();
    let duration = buffSpellStats.duration;
    // if duration > timeToCast, this means the buff is always on for remaining time
    if (duration > timeToCast) {
        return time;
    }

    let buffedTime = 0;
    while (time > 1 && time > duration) {
        buffedTime += duration;
        time -= timeToCast;
    }

    // don't forget to add remainder
    return buffedTime + time;
}


function computeSwitchCastsPer(endTime) {
    let nbCasts = computeCastsPer(endTime);
    let nbFirstCasts = 0;
    let nbSecondCasts = 0;

    let firstSwitchSpellAfter = Alpine.store('currentChampion').spells[0].switchSpellAfter;
    // check if there is only 1 damage spell
    if (firstSwitchSpellAfter == 0) {
        return [nbCasts, 0];
    }

    // else compute with spell switching
    let secondSwitchSpellAfter = Alpine.store('currentChampion').spells[1].switchSpellAfter;
    let firstCastsLeft = firstSwitchSpellAfter;
    let secondCastsLeft = 0;

    for(cast = 1; cast <= nbCasts; cast++) {
        if (firstCastsLeft == 0) {
            firstCastsLeft = -1;
            secondCastsLeft = secondSwitchSpellAfter;
        }
        if (secondCastsLeft == 0) {
            firstCastsLeft = firstSwitchSpellAfter;
            secondCastsLeft = -1;
        }

        if (firstCastsLeft > 0) {
            nbFirstCasts ++;
            firstCastsLeft --;
        }
        if (secondCastsLeft > 0) {
            nbSecondCasts ++;
            secondCastsLeft --; 
        }
    }

    return [nbFirstCasts, nbSecondCasts];
}