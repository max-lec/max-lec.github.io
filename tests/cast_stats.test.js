function testComputeCast() {
    let castTime = computeCast(manaToCast=50, manaPerAuto=[10, 0.5*100], augmentBonus=[10, 5*100], traitBonus=[5, 3*100], 0)
    if (castTime == 6) {
        console.log("computeCast : %cTRUE", "color:green;");
    } else {
        console.log("computeCast : %cFALSE", "color:red;");
    }
}


function testComputeFirstCast(){
    // select tear
    Alpine.store('currentItem').selectItem1(6);
    Alpine.store('stats').updateCurrentStats();
    
    let time = computeFirstCast();
    if (time == 8) {
        console.log("computeFirstCast : %cTRUE", "color:green;");
    } else {
        console.log("computeFirstCast : %cFALSE", "color:red;");
    }

    // reset item
    Alpine.store('currentItem').selectItem1(0);
}