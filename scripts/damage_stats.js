function computeAttackDPS() {
    return Alpine.store('stats').attack * Alpine.store('stats').speed
}

function computeAbilityDamage() {
    let level = Alpine.store('currentChampion').level;
    let damagePercent = Alpine.store('currentChampion').spells.damagePercent[level];
    let base = 0;
    if (Alpine.store('currentChampion').spells.ad) {
        base = Alpine.store('currentChampion').attack;
    }
    if (Alpine.store('currentChampion').spells.ap) {
        base = Alpine.store('currentChampion').ap;
    }
    let multihit = Alpine.store('stats').multihit;
    return (base * damagePercent/100) * multihit;
}