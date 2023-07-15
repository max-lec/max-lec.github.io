
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