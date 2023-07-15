document.addEventListener('alpine:init', () => {

    Alpine.store('damageStats', {
        attackDPS: 0,
        buffedAttackDPS: 0,
        abilitiesDamage: [],
        abilitiesDamageMultihit: [],
        abilitiesDamageCrit: [],
        abilitiesDamageAverage: [],

        updateDamageStats() {
            this.attackDPS = computeAttackDPS(Alpine.store('stats').attack);
            this.buffedAttackDPS = computeBuffedAttackDPS();
            this.abilitiesDamage = computeEveryAbilityDamage();
            this.abilitiesDamageMultihit = computeAbilityDamageMultihit();
            this.abilitiesDamageCrit = computeAbilityDamageCrit();
            this.abilitiesDamageAverage = computeAverageAbilityDamage();
        },
    });
})

function computeAttackDPS(attack) {
    let critChance = Alpine.store('stats').criticalChance/100;
    let critDamage = Alpine.store('stats').criticalDamage;
    let speed = Alpine.store('stats').speed/100;

    let critBonus = attack * critDamage; // base is +40% of attack
    let averageCritBonus = critBonus * critChance;
    let damage = (attack + averageCritBonus) * speed;
    
    return Math.round(damage);
}

function computeAbilityDamage(spell, isMultihit) {
    
    let multihit = 1;
    if(isMultihit) {
        multihit = Alpine.store('options').multihit;
    }
    if(multihit > spell.maxMultihit) {
        multihit = spell.maxMultihit
    }

    let rank = Alpine.store('currentChampion').level -1;
    let apDamage = spell.apRatio[rank] + (spell.apRatio[rank] * Alpine.store('stats').ap/100);
    let attackDamage = (spell.attackRatio[rank]/100) * Alpine.store('stats').attack;
    let res = (apDamage + attackDamage) * multihit;
    return Math.round(res);
}

function computeEveryAbilityDamage() {
    let abilityDamages = []
    Alpine.store('currentChampion').spells.forEach(spell => {
        if(spell.type == "damage") {
            abilityDamages.push(computeAbilityDamage(spell, false));
        }
    });
    
    if (abilityDamages.length == 0){
        return [0, 0];
    }
    
    return abilityDamages;
}

function computeAbilityDamageMultihit() {
    let abilityDamages = []
    Alpine.store('currentChampion').spells.forEach(spell => {
        if(spell.type == "damage") {
            abilityDamages.push(computeAbilityDamage(spell, true));
        }
    });

    if (abilityDamages.length == 0){
        return [0, 0];
    }
    
    return abilityDamages;
}

function computeAbilityDamageCrit() {
    if(! hasSpellCrit()) {
        return [];
    }
    let normalDamage = Alpine.store('damageStats').abilitiesDamage;
    let res = normalDamage.map(damage => Math.round(damage * (1+Alpine.store('stats').criticalDamage)));
    return res;
}

function computeAverageAbilityDamage() {
    let normalDamage = Alpine.store('damageStats').abilitiesDamageMultihit;
    let res = normalDamage;
    if(hasSpellCrit()) {
        res = normalDamage.map(damage => Math.round(damage * (1 + (Alpine.store('stats').criticalChance/100) * Alpine.store('stats').criticalDamage)));
    }
    return res;
}


function computeBuffedAttackDPS(){
    let buffSpell = Alpine.store('currentChampion').spells.filter(spell => spell.type == "buff")[0];
    if(buffSpell == null || buffSpell.length == 0) {
        return 0;
    }
    let buffedAttack = computeAbilityDamage(buffSpell, true)
    return computeAttackDPS(buffedAttack);
}