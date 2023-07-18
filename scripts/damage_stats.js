document.addEventListener('alpine:init', () => {

    Alpine.store('damageStats', {
        attackDPS: 0,
        buffedAttackDPS: 0,
        abilitiesDamage: [],
        abilitiesDamageAp: [],
        abilitiesDamageAttack: [],
        abilitiesDamageMultihit: [],
        abilitiesDamageCrit: [],
        abilitiesDamageAverage: [],
        abilitiesDamageAverageAp: [],
        abilitiesDamageAverageAttack: [],

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

function computeApDamage(spell){
    let rank = Alpine.store('currentChampion').level -1;
    return spell.apRatio[rank] + (spell.apRatio[rank] * Alpine.store('stats').ap/100);
}

function computeAttackDamage(spell){
    let rank = Alpine.store('currentChampion').level -1;
    return (spell.attackRatio[rank]/100) * Alpine.store('stats').attack;
}

function computeAbilityDamage(spell, isMultihit) {
    
    let multihit = 1;
    if(isMultihit) {
        multihit = Alpine.store('options').multihit;
    }
    if(multihit > spell.maxMultihit) {
        multihit = spell.maxMultihit
    }
    
    let res = (computeApDamage(spell) + computeAttackDamage(spell)) * multihit;
    return Math.round(res);
}

function computeEveryAbilityDamage() {
    let abilityDamages = [];
    Alpine.store('damageStats').abilitiesDamageAp = [];
    Alpine.store('damageStats').abilitiesDamageAttack = [];

    Alpine.store('currentChampion').spells.forEach(spell => {
        if(spell.type == "damage") {
            abilityDamages.push(computeAbilityDamage(spell, false));
            Alpine.store('damageStats').abilitiesDamageAp.push(computeApDamage(spell)); // store ap value
            Alpine.store('damageStats').abilitiesDamageAttack.push(computeAttackDamage(spell)); // store attack value
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
    // compute damage for ap/attack before
    let abilitiesDamageAp = Alpine.store('damageStats').abilitiesDamageAp;
    let abilitiesDamageAttack = Alpine.store('damageStats').abilitiesDamageAttack;
    if(hasSpellCrit()) {
        abilitiesDamageAp = abilitiesDamageAp.map(damage => Math.round(damage * (1 + (Alpine.store('stats').criticalChance/100) * Alpine.store('stats').criticalDamage)));
        abilitiesDamageAttack = abilitiesDamageAttack.map(damage => Math.round(damage * (1 + (Alpine.store('stats').criticalChance/100) * Alpine.store('stats').criticalDamage)));
    }
    Alpine.store('damageStats').abilitiesDamageAverageAp = abilitiesDamageAp;
    Alpine.store('damageStats').abilitiesDamageAverageAttack = abilitiesDamageAttack;

    // compute average total damage (with multihit)
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


// DamageTaken = IncomingDamage * 100 / (100 + RelevantResistStat) - FlatDamageReduction
function computeAttackDPSOnEnemy(attack) {
    return Math.round(computeAttackDPS(attack) * 100/(100 + Alpine.store('enemyChampion').stats.armor))
}


function computeAbilityDamageOnEnemy() {
    let apDamages = Alpine.store('damageStats').abilitiesDamageAverageAp;
    let attackDamages = Alpine.store('damageStats').abilitiesDamageAverageAttack;

    let effectiveApDamage = apDamages.map(damage => Math.round(damage * 100/(100 + Alpine.store('enemyChampion').stats.resistance)));
    let effectiveAttackDamage = attackDamages.map(damage => Math.round(damage * 100/(100 + Alpine.store('enemyChampion').stats.armor)));
    // sum the arrays for total damage
    return effectiveApDamage.map( (apDamage, index) => apDamage + effectiveAttackDamage[index]);
}