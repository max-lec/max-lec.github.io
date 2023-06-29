
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
        criticalDamage: 0,

        updateCurrentStats() {
            this.health = getTotalHealth();
            this.armor = getTotalArmor();
            this.resistance = getTotalResistance();
            this.manaStart = getTotalManaStart();
            this.ap = getTotalAp();
            this.attack = getTotalAttack();
            this.speed = getTotalSpeed();
            this.criticalChance = getTotalCriticalChance();
            this.criticalDamage = getTotalCriticalDamage();
        },
    });
})

function getTotalHealth() {
    return Alpine.store('currentChampion').health
        + Alpine.store('currentItem').health;
}

function getTotalArmor() {
    return Alpine.store('currentChampion').armor
        + Alpine.store('currentItem').armor;
}

function getTotalResistance() {
    return Alpine.store('currentChampion').resistance
        + Alpine.store('currentItem').resistance;
}

function getTotalManaStart() {
    return Alpine.store('currentChampion').manaStart
        + Alpine.store('currentItem').mana;
}

function getTotalAp() {
    return Alpine.store('currentChampion').ap
        + Alpine.store('currentItem').ap;
}

function getTotalAttack() {
    return Alpine.store('currentChampion').attack
        + Alpine.store('currentItem').attack;
}

function getTotalSpeed() {
    return Alpine.store('currentChampion').speed
        + Alpine.store('currentItem').speed;
}

function getTotalCriticalChance() {
    return Alpine.store('currentChampion').criticalChance
        + Alpine.store('currentItem').criticalChance;
}

function getTotalCriticalDamage() {
    return Alpine.store('currentChampion').criticalDamage
        + Alpine.store('currentItem').criticalDamage;
}