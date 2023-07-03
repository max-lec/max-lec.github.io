
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
    return Alpine.store('currentChampion').health
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
    return Alpine.store('currentChampion').armor
        + Alpine.store('currentItem').getTotalArmor()
        + Alpine.store('currentAugment').getTotalArmor()
        + Alpine.store('currentTrait').getTotalArmor()
        ;
}

function getTotalResistance() {
    return Alpine.store('currentChampion').resistance
        + Alpine.store('currentItem').getTotalResistance()
        + Alpine.store('currentAugment').getTotalResistance()
        + Alpine.store('currentTrait').getTotalResistance()
        ;
}

function getTotalManaStart() {
    return Alpine.store('currentChampion').manaStart
        + Alpine.store('currentItem').getTotalManaStart()
        + Alpine.store('currentAugment').getTotalManaStart()
        + Alpine.store('currentTrait').getTotalManaStart()
        ;
}

function getTotalAp() {
    return Alpine.store('currentChampion').ap
        + Alpine.store('currentItem').getTotalItemAp()
        + Alpine.store('currentAugment').getTotalAugmentAp()
        ;
}

function getTotalAttack() {
    return Alpine.store('currentChampion').attack
        + Alpine.store('currentItem').getTotalItemAttack()
        + Alpine.store('currentAugment').getTotalAugmentAttack()
        ;
}

function getTotalSpeed() {
    return Alpine.store('currentChampion').speed
        + Alpine.store('currentItem').getTotalItemSpeed()
        + Alpine.store('currentAugment').getTotalAugmentSpeed()
        ;
}

function getTotalCriticalChance() {
    return Alpine.store('currentChampion').criticalChance
        + Alpine.store('currentItem').getTotalItemCriticalChance()
        // + Alpine.store('currentAugment').getTotalAugmentHealth()
        ;
}
