
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
    + Alpine.store('currentItem').getTotalItemHealth();
}

function getTotalArmor() {
    return Alpine.store('currentChampion').armor
        + Alpine.store('currentItem').getTotalItemArmor();
}

function getTotalResistance() {
    return Alpine.store('currentChampion').resistance
        + Alpine.store('currentItem').getTotalItemResistance();
}

function getTotalManaStart() {
    return Alpine.store('currentChampion').manaStart
        + Alpine.store('currentItem').getTotalItemManaStart();
}

function getTotalAp() {
    return Alpine.store('currentChampion').ap
        + Alpine.store('currentItem').getTotalItemAp();
}

function getTotalAttack() {
    return Alpine.store('currentChampion').attack
        + Alpine.store('currentItem').getTotalItemAttack();
}

function getTotalSpeed() {
    return Alpine.store('currentChampion').speed
        + Alpine.store('currentItem').getTotalItemSpeed();
}

function getTotalCriticalChance() {
    return Alpine.store('currentChampion').criticalChance
        + Alpine.store('currentItem').getTotalItemCriticalChance();
}
