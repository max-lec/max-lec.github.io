function testComputeFunctions() {
    // select test champion
    Alpine.store('currentChampion').selectChampion(-1);
    Alpine.store('stats').updateCurrentStats();
    
    // test suite
    testComputeCast();
    testComputeFirstCast();
}