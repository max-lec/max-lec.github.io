

function computeAttackDPS() {
    let attack = Alpine.store('stats').attack;
    let critChance = Alpine.store('stats').criticalChance/100;
    let critDamage = Alpine.store('stats').criticalDamage;
    let speed = Alpine.store('stats').speed/100;
    
    let averageCritBonus = attack * critChance * critDamage;
    let damage = (attack + averageCritBonus) * speed;

    return Math.round(damage);
}


function computeAbilityDamage() {
    let damageSpells = []
    Alpine.store('currentChampion').spells.forEach(spell => {
        if(spell.type == "damage") {
            damageSpells.push(spell);
        }
    });

    let abilityDamages = []
    damageSpells.forEach(spell => {
        let rank = Alpine.store('currentChampion').level -1;
        let apDamage = spell.apRatio[rank] + (spell.apRatio[rank] * Alpine.store('stats').ap/100);
        let attackDamage = (spell.attackRatio[rank]/100) * Alpine.store('stats').attack;
        let res = (apDamage + attackDamage)
        abilityDamages.push(Math.round(res));
    });

    return abilityDamages;
}

function computeAbilityDamageMultihit() {
    let damageSpells = []
    Alpine.store('currentChampion').spells.forEach(spell => {
        if(spell.type == "damage") {
            damageSpells.push(spell);
        }
    });

    let abilityDamages = []
    damageSpells.forEach(spell => {
        let rank = Alpine.store('currentChampion').level -1;
        let apDamage = spell.apRatio[rank] + (spell.apRatio[rank] * Alpine.store('stats').ap/100);
        let attackDamage = (spell.attackRatio[rank]/100) * Alpine.store('stats').attack;
        let multihit = Alpine.store('options').multihit <= spell.maxMultihit ? Alpine.store('options').multihit : spell.maxMultihit ;
        let res = (apDamage + attackDamage) * multihit;
        abilityDamages.push(Math.round(res));
    });

    return abilityDamages;
}

function computeAbilityDamageCrit() {
    if(! hasSpellCrit()) {
        return [];
    }
    let normalDamage = computeAbilityDamage();
    let res = normalDamage.map(damage => Math.round(damage * (1+Alpine.store('stats').criticalDamage)));
    return res;
}

function computeAverageAbilityDamage() {
    let normalDamage = computeAbilityDamageMultihit();
    let res = normalDamage;
    if(hasSpellCrit()) {
        res = normalDamage.map(damage => Math.round(damage * (1 + (Alpine.store('stats').criticalChance/100) * Alpine.store('stats').criticalDamage)));
    }
    return res;
}