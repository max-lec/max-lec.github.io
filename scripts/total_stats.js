
document.addEventListener('alpine:init', () => {

    Alpine.store('stats', {
        health: 0,
        armor: 0,
        resistance: 0,
        manaStart: 0,
        ap: 0,
        attack: 0,
        speed: 0,
        criticalChance: 0,

        updateCurrentStats() {
            this.health = getTotalHealth();
            this.health = this.health + (this.health * getTotalMaxHealth() /100);
            this.armor = getTotalArmor();
            this.resistance = getTotalResistance();
            this.manaStart = getTotalManaStart();
            this.ap = getTotalAp();
            this.attack = getTotalAttack();
            this.speed = getTotalSpeed();
            this.criticalChance = getTotalCriticalChance();
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
    return Alpine.store('currentChampion').stats.speed
        + Alpine.store('currentItem').getTotalSpeed()
        + Alpine.store('currentAugment').getTotalSpeed()
        + Alpine.store('currentTrait').getTotalSpeed()
        ;
}

function getTotalCriticalChance() {
    return Alpine.store('currentChampion').stats.criticalChance
        + Alpine.store('currentItem').getTotalItemCriticalChance()
        // + Alpine.store('currentAugment').getTotalAugmentHealth()
        ;
}
