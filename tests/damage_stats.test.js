
function testComputeAttackDPS(){
    let dps = computeAttackDPS(100);
    if (dps == 110) {
        console.log("computeAttackDPS1 : %cTRUE", "color:green;");
    } else {
        console.log("computeAttackDPS1 : %cFALSE", "color:red;");
    }

    // select IE + challenger emblem
    Alpine.store('currentItem').selectItem1(16); // 130 AD 60 CC
    Alpine.store('currentItem').selectItem2(128); // 110 AS
    // select challenger 3
    Alpine.store('currentTrait').triggerTrait(23, 2); //200 AS
    Alpine.store('stats').updateCurrentStats();
    
    dps = computeAttackDPS(Alpine.store('stats').attack);
    if (dps == 322) {
        console.log("computeAttackDPS2 : %cTRUE", "color:green;");
    } else {
        console.log("computeAttackDPS2 : %cFALSE", "color:red;");
    }
    // reset trait
    Alpine.store('currentTrait').triggerTrait(23, 2);

    // select IE * 3
    Alpine.store('currentItem').selectItem1(16); // 130 AD 60 CC
    Alpine.store('currentItem').selectItem2(16); // 160 AD 95 CC
    Alpine.store('currentItem').selectItem3(16); // 190 AD 130 CC
    Alpine.store('stats').updateCurrentStats();
    
    dps = computeAttackDPS(Alpine.store('stats').attack);

    if (dps == 295) {
        console.log("computeAttackDPS3 : %cTRUE", "color:green;");
    } else {
        console.log("computeAttackDPS3 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentItem').selectItem3(0);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeAbilityDamage() {
    let spell = Alpine.store('currentChampion').spells.filter(spell => spell.type == "damage")[0];
    let dmg = computeAbilityDamage(spell, false);
    if (dmg == 220) {
        console.log("computeAbilityDamage1 : %cTRUE", "color:green;");
    } else {
        console.log("computeAbilityDamage1 : %cFALSE", "color:red;");
    }

    
    // select DB + radiant rabadon *2
    Alpine.store('currentItem').selectItem1(10); // 166 AD
    Alpine.store('currentItem').selectItem2(97); // 225 AP
    Alpine.store('currentItem').selectItem3(97); // 350 AP
    // select strategist 3
    Alpine.store('currentTrait').triggerTrait(28, 3); //410 AP
    Alpine.store('stats').updateCurrentStats();
    
    dmg = computeAbilityDamage(spell, false);

    if (dmg == 383) {
        console.log("computeAbilityDamage2 : %cTRUE", "color:green;");
    } else {
        console.log("computeAbilityDamage2 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentItem').selectItem3(0);
    Alpine.store('currentTrait').triggerTrait(28, 3);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeAbilityDamageCrit() {

    let dmg = computeAbilityDamageCrit();
    if (dmg.length == 0) {
        console.log("computeAbilityDamageCrit1 : %cTRUE", "color:green;");
    } else {
        console.log("computeAbilityDamageCrit1 : %cFALSE", "color:red;");
    }

    // select IE *3
    Alpine.store('currentItem').selectItem1(16); // 130 AD 60 CC
    Alpine.store('currentItem').selectItem2(16); // 160 AD 95 CC
    Alpine.store('currentItem').selectItem3(16); // 190 AD 130 CC
    // select strategist 3
    Alpine.store('currentTrait').triggerTrait(28, 3); //160 AP
    Alpine.store('stats').updateCurrentStats();

    dmg = computeAbilityDamageCrit()[0];
    if (dmg == 629) {
        console.log("computeAbilityDamageCrit2 : %cTRUE", "color:green;");
    } else {
        console.log("computeAbilityDamageCrit2 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentItem').selectItem3(0);
    Alpine.store('currentTrait').triggerTrait(28, 3);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeAverageAbilityDamage() {

    let dmg = computeAverageAbilityDamage()[0];
    if (dmg == 220) {
        console.log("computeAverageAbilityDamage1 : %cTRUE", "color:green;");
    } else {
        console.log("computeAverageAbilityDamage1 : %cFALSE", "color:red;");
    }

    // select IE *3
    Alpine.store('currentItem').selectItem1(16); // 130 AD 60 CC
    Alpine.store('currentItem').selectItem2(16); // 160 AD 95 CC
    // select strategist 3
    Alpine.store('currentTrait').triggerTrait(28, 3); //160 AP
    Alpine.store('stats').updateCurrentStats();

    dmg = computeAverageAbilityDamage()[0];
    if (dmg == 477) {
        console.log("computeAverageAbilityDamage2 : %cTRUE", "color:green;");
    } else {
        console.log("computeAverageAbilityDamage2 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentTrait').triggerTrait(28, 3);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeBuffedAttackDPS() {

    let dmg = computeBuffedAttackDPS();
    if (dmg == 330) {
        console.log("computeBuffedAttackDPS1 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedAttackDPS1 : %cFALSE", "color:red;");
    }

    // select IE *3
    Alpine.store('currentItem').selectItem1(16); // 130 AD 60 CC
    Alpine.store('currentItem').selectItem2(16); // 160 AD 95 CC
    // select strategist 3
    Alpine.store('currentTrait').triggerTrait(28, 3); //160 AP
    Alpine.store('stats').updateCurrentStats();

    dmg = computeBuffedAttackDPS();
    if (dmg == 580) {
        console.log("computeBuffedAttackDPS2 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedAttackDPS2 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentTrait').triggerTrait(28, 3);
    Alpine.store('stats').updateCurrentStats();
}