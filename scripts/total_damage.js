// DamageTaken = IncomingDamage * 100 / (100 + RelevantResistStat) - FlatDamageReduction


function computeDamageOnEnemy() {

    // apDamage, attackDamage, enemyStats

    let apDamageTaken = apDamage * 100 / (100 + enemyStats.resistance);
    let attackDamageTaken = attackDamage * 100 / (100 + enemyStats.armor);
    
    return Math.round(apDamageTaken + attackDamageTaken);
}


function totalDamagePer15() {
    
    let nbCasts = computeCastsPer15();
    let dps = Alpine.store('damageStats').attackDPS;

    let switchSpellAfter = Alpine.store('currentChampion').spells[0].switchSpellAfter;
    let abilityDamage = Alpine.store('damageStats').abilitiesDamageAverage[0];

    if (switchSpellAfter == 0) {
        return (nbCasts * abilityDamage) + (dps * 15);
    }

    // else compute with spell switching
    let switchSpellAfter1 = Alpine.store('currentChampion').spells[1].switchSpellAfter;
    let abilityDamage1 = Alpine.store('damageStats').abilitiesDamageAverage[1];

    let totalDamage = 0;
    let firstCastsLeft = switchSpellAfter;
    let secondCastsLeft = 0;

    for(cast = 1; cast <= nbCasts; cast++) {
        if (firstCastsLeft == 0) {
            secondCastsLeft = switchSpellAfter1;
        }
        if (secondCastsLeft == 0) {
            firstCastsLeft = switchSpellAfter;
        }

        if (firstCastsLeft > 0) {
            totalDamage += abilityDamage;
            firstCastsLeft --;
        }
        if (secondCastsLeft > 0) {
            totalDamage += abilityDamage1;
            secondCastsLeft --; 
        }
    }
    
    return totalDamage + (dps * 15);
}