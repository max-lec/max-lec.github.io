function computeAttackDPS(){
    return Alpine.store('stats').attack * Alpine.store('stats').speed
}