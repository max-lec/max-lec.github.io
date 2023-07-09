
document.addEventListener('alpine:init', () => {

    Alpine.store('stats', {
        health: 0,
        armor: 0,
        resistance: 0,
        manaStart: 0,
        manaCast: 0,
        manaGen: 0,
        ap: 0,
        attack: 0,
        speed: 0,
        criticalChance: 0,
        criticalDamage: 0,

        updateCurrentStats() {
            this.health = getTotalHealth();
            this.health = this.health + (this.health * getTotalMaxHealth() /100);
            this.armor = getTotalArmor();
            this.resistance = getTotalResistance();
            this.manaStart = getTotalManaStart();
            this.manaCast = getTotalManaCast();
            this.manaGen = getTotalManaGen();
            this.ap = getTotalAp();
            this.attack = getTotalAttack();
            this.speed = getTotalSpeed();
            this.criticalChance = getTotalCriticalChance();
            this.criticalDamage = getTotalCriticalDamage();
        },
    });
})


function getTotalHealth() {
    return Alpine.store('currentChampion').stats.health
    + Alpine.store('currentItem').getTotalHealth()
    + Alpine.store('currentAugment').getTotalHealth()
    + Alpine.store('currentTrait').getTotalHealth()
    ;
}


function getTotalMaxHealth() {
    return Alpine.store('currentItem').getTotalMaxHealth()
    + Alpine.store('currentAugment').getTotalMaxHealth()
    + Alpine.store('currentTrait').getTotalMaxHealth()
    ;
}


function getTotalArmor() {
    return Alpine.store('currentChampion').stats.armor
        + Alpine.store('currentItem').getTotalArmor()
        + Alpine.store('currentAugment').getTotalArmor()
        + Alpine.store('currentTrait').getTotalArmor()
        ;
}


function getTotalResistance() {
    return Alpine.store('currentChampion').stats.resistance
        + Alpine.store('currentItem').getTotalResistance()
        + Alpine.store('currentAugment').getTotalResistance()
        + Alpine.store('currentTrait').getTotalResistance()
        ;
}


function getTotalManaStart() {
    return Alpine.store('currentChampion').stats.manaStart
        + Alpine.store('currentItem').getTotalManaStart()
        + Alpine.store('currentAugment').getTotalManaStart()
        + Alpine.store('currentTrait').getTotalManaStart()
        ;
}


function getTotalManaCast() {
    return Alpine.store('currentChampion').spells[0].manaCast
        - Alpine.store('currentItem').getTotalManaCast()
        ;
}


function getTotalManaGen() {
    let manaPerAuto = 10 + Alpine.store('currentItem').getManaPerAttack();
    return [
        manaPerAuto, 
        Alpine.store('stats').speed/100
    ];
}


function getTotalAp() {
    return Alpine.store('currentChampion').stats.ap
        + Alpine.store('currentItem').getTotalAp()
        + Alpine.store('currentAugment').getTotalAp()
        + Alpine.store('currentTrait').getTotalAp()
        ;
}


function getTotalAttack() {
    return Alpine.store('currentChampion').stats.attack
        + Alpine.store('currentItem').getTotalAttack()
        + Alpine.store('currentAugment').getTotalAttack()
        + Alpine.store('currentTrait').getTotalAttack()
        ;
}


function getTotalSpeed() {
    let totalSpeed = Alpine.store('currentChampion').stats.speed
        + Alpine.store('currentItem').getTotalSpeed()
        + Alpine.store('currentAugment').getTotalSpeed()
        + Alpine.store('currentTrait').getTotalSpeed()
        ;
    return totalSpeed > 500 ? 500 : totalSpeed;
}


function getTotalCriticalChance() {
    let totalCriticalChance = Alpine.store('currentChampion').stats.criticalChance
        + Alpine.store('currentItem').getTotalItemCriticalChance()
        ;
    return totalCriticalChance > 100 ? 100 : totalCriticalChance;
}


function getTotalCriticalDamage() {
    let totalCriticalDamage = Alpine.store('currentChampion').stats.criticalDamage;
    let critChance = Alpine.store('currentChampion').stats.criticalChance
                    + Alpine.store('currentItem').getTotalItemCriticalChance()
                    ;
    // convert leftover crit chance to crit damage at 50% rate
    if (critChance > 100) {
        let leftover = critChance - 100;
        totalCriticalDamage = totalCriticalDamage + leftover/2;
    }
    
    return totalCriticalDamage;
}