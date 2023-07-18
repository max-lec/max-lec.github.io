
function totalDPSPer(endTime) {
        
    // compute auto DPS with buffs
    let timeBuffed = computeBuffedTimePer(endTime);
    let attackDPS = Alpine.store('damageStats').attackDPS * (endTime - timeBuffed);
    let buffedDPS = Alpine.store('damageStats').buffedAttackDPS * (timeBuffed);

    return attackDPS + buffedDPS;
}

function totalDamagePer(endTime) {

    let [nbFirstCasts, nbSecondCasts] = computeSwitchCastsPer(endTime);

    let firstAbilityDamage = Alpine.store('damageStats').abilitiesDamageAverage[0] ?? 0;
    let secondAbilityDamage = Alpine.store('damageStats').abilitiesDamageAverage[1] ?? 0;
    let totalDamage = nbFirstCasts*firstAbilityDamage + nbSecondCasts*secondAbilityDamage;
    
    return Math.round( totalDamage + totalDPSPer(endTime) );
}


function enemiesKilledPer(endTime) {
    let damageOnEnemy = 0;
    
    // add damage from autos
    damageOnEnemy += computeAttackDPSOnEnemy(totalDPSPer(endTime));
    
    // add damage from ability
    let [nbFirstCasts, nbSecondCasts] = computeSwitchCastsPer(endTime);
    let abilityDamages = computeAbilityDamageOnEnemy();
    
    damageOnEnemy += nbFirstCasts*(abilityDamages[0] ?? 0) + nbSecondCasts*(abilityDamages[1] ?? 0)
    

    return Math.round((damageOnEnemy / Alpine.store('enemyChampion').stats.health) * 10)/10;
}