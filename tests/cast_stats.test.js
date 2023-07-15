function testComputeCast() {
    let castTime = computeCast(manaToCast=50, manaPerAuto=[10, 0.5*100], augmentBonus=[10, 5*100], traitBonus=[5, 3*100], 0, 0)
    if (castTime == 6) {
        console.log("computeCast1 : %cTRUE", "color:green;");
    } else {
        console.log("computeCast1 : %cFALSE", "color:red;");
    }

    castTime = computeCast(manaToCast=50, manaPerAuto=[15, 0.5*100], augmentBonus=[0, 0], traitBonus=[35, 3*100], 0, 0)
    if (castTime == 3) {
        console.log("computeCast2 : %cTRUE", "color:green;");
    } else {
        console.log("computeCast2 : %cFALSE", "color:red;");
    }
}


function testComputeFirstCast(){
    // select tear
    Alpine.store('currentItem').selectItem1(6);
    Alpine.store('stats').updateCurrentStats();
    
    let time = computeFirstCast();
    if (time == 4) {
        console.log("computeFirstCast : %cTRUE", "color:green;");
    } else {
        console.log("computeFirstCast : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeNextCast(){
    // select shojin + invoker emblem
    Alpine.store('currentItem').selectItem1(13);
    Alpine.store('currentItem').selectItem2(63);
    // select invoker 3
    Alpine.store('currentTrait').triggerTrait(9, 2);
    Alpine.store('stats').updateCurrentStats();
    
    let time = computeNextCast();
    if (time == 3) {
        console.log("computeNextCast : %cTRUE", "color:green;");
    } else {
        console.log("computeNextCast : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentTrait').triggerTrait(9, 2);
    Alpine.store('stats').updateCurrentStats();
}


function testComputeBuffedTimePer(){
    let time = computeBuffedTimePer(15);
    if (time == 8) {
        console.log("computeBuffedTimePer1 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedTimePer1 : %cFALSE", "color:red;");
    }

    // select tear
    Alpine.store('currentItem').selectItem1(6);
    Alpine.store('stats').updateCurrentStats();

    time = computeBuffedTimePer(15);
    if (time == 9) {
        console.log("computeBuffedTimePer2 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedTimePer2 : %cFALSE", "color:red;");
    }

    // select shojin
    Alpine.store('currentItem').selectItem1(13);
    Alpine.store('stats').updateCurrentStats();

    time = computeBuffedTimePer(30);
    if (time == 24) {
        console.log("computeBuffedTimePer3 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedTimePer3 : %cFALSE", "color:red;");
    }

    // select shojin + invoker emblem
    Alpine.store('currentItem').selectItem1(13);
    Alpine.store('currentItem').selectItem2(63);
    // select invoker 3
    Alpine.store('currentTrait').triggerTrait(9, 2);
    Alpine.store('stats').updateCurrentStats();

    time = computeBuffedTimePer(30);
    if (time == 28) {
        console.log("computeBuffedTimePer3 : %cTRUE", "color:green;");
    } else {
        console.log("computeBuffedTimePer3 : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
    Alpine.store('currentItem').selectItem2(0);
    Alpine.store('currentTrait').triggerTrait(9, 2);
    Alpine.store('stats').updateCurrentStats();
}