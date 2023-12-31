document.addEventListener('alpine:init', () => {

    Alpine.store('traitsStatsData', {
        traitsStats: [],

        init() {
            this.traitsStats = JSON.parse(document.getElementById("traitsStatsData").textContent);
        },
    });

    Alpine.store('currentTrait', {
        activeTraits: [],
        
        triggerTrait(id, level) {
            let activeTuple = this.activeTraits.filter(tuple => tuple[0] == id)[0];

            if (activeTuple && activeTuple[1] == level) {
                // clicked on activated trait, deactivate
                this.activeTraits = this.activeTraits.filter(tuple => tuple[0] != id);
            }
            else if (activeTuple && activeTuple[1] != level) {
                // clicked on sibling trait, adjust level
                activeTuple[1] = level;
            } else {
                // trait not found, add it
                this.activeTraits.push([id, level]);
            }
            Alpine.store('urlData').query.set("activeTraits", JSON.stringify(this.activeTraits));
        },

        isActive(id, level){
            let matchedTuple = this.activeTraits.filter(tuple => tuple[0] == id && tuple[1] >= level);
            return matchedTuple.length;
        },

        getTotalHealth(){
            let total = 0;
            // flat health
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.health ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.health ?? 0;
                }
            });
            return total;
        },

        getTotalMaxHealth(){
            let total = 0;
            // % max health
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.maxHealth ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.maxHealth ?? 0;
                }
            });
            return total;
        },

        getTotalArmor(){
            let total = 0;
            // flat armor
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.armor ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.armor ?? 0;
                }
            });
            return total;
        },

        getTotalResistance(){
            let total = 0;
            // flat MR
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.resistance ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.resistance ?? 0;
                }
            });
            return total;
        },

        getTotalManaStart(){
            let total = 0;
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.manaStart ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.manaStart ?? 0;
                }
            });
            return total;
        },

        getTotalAp(){
            let total = 0;
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.ap ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.ap ?? 0;
                }
            });
            return total;
        },

        getTotalAttack(){
            let total = 0;
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.attack ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.attack ?? 0;
                }
            });
            return total;
        },

        getTotalSpeed(){
            let total = 0;
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.speed ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.speed ?? 0;
                }
            });
            return total;
        },
        getTotalManaBonus(){
            let total = [0, 0];
            this.activeTraits.forEach(activeTuple => {
                let traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                if (traitStats.name.includes("Invoker")){
                    // only mana gen trait for now
                    total[1] = 3;
                    total[0] = traitStats.all.special.manaGen;
                    if (hasCurrentChampionTrait(traitStats.name)){
                        total[0] += traitStats.trait.special.manaGen;
                    }
                }
            });
            return total;
        },
    });
});


function getTraitsData() {
    let traitsStats = Alpine.store('traitsStatsData').traitsStats;
    let traitMap = [];

    for(var trait of traitsStats){
        let traitData = { 
            "id": Number(trait.id), 
            "name": trait.name, 
            "desc": trait.desc, 
            "srcPath": trait.srcPath,
            "levels": trait.levels
        };
        if (!trait.ignore) {
            traitMap.push(traitData);
        }
    }

    return traitMap;
}


function getTraitStats(id, level) {
    let traitStats = Alpine.store('traitsStatsData').traitsStats.find(traitStats => traitStats.id == id);
    let trait = {}
    trait.name = traitStats.name;
    trait.srcPath = traitStats.srcPath;
    trait.id = Number(traitStats.id);
    trait.trait = traitStats.levels[level]?.trait;
    trait.all = traitStats.levels[level]?.all;
    return trait;
}