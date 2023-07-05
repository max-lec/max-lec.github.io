

function computeAttackDPS() {
    return Alpine.store('stats').attack * Alpine.store('stats').speed/100
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
        let attackDamage = Alpine.store('stats').attack * spell.attackRatio[rank]/100;

        let res = (apDamage + attackDamage)
        abilityDamages.push(res);
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
        let attackDamage = Alpine.store('stats').attack * spell.attackRatio[rank]/100;
        let multihit = Alpine.store('options').multihit <= spell.maxMultihit ? Alpine.store('options').multihit : spell.maxMultihit ;
        let res = (apDamage + attackDamage) * multihit;
        abilityDamages.push(res);
    });

    return abilityDamages;
}