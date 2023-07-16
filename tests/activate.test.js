function testComputeFunctions() {
    // select test champion
    Alpine.store('currentChampion').selectChampion(-1);
    Alpine.store('stats').updateCurrentStats();
    
    // cast_stats
    testComputeCast();
    testComputeFirstCast();
    testComputeNextCast();
    testComputeBuffedTimePer();

    // damage_stats
    testComputeAttackDPS();
    testComputeAbilityDamage();
    testComputeAbilityDamageCrit();
    testComputeAverageAbilityDamage();
    testComputeBuffedAttackDPS();
}