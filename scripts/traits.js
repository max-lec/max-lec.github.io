document.addEventListener('alpine:init', () => {

    Alpine.store('traitsStatsData', {
        traitsStats: [],

        init() {
            this.traitsStats = JSON.parse(document.getElementById("traitsStatsData").textContent);
        },
    });

    Alpine.store('currentTrait', {
        activeTraits: [
            [1, 1]
        ],
        
        triggerTrait(id, level) {
            activeTuple = this.activeTraits.filter(tuple => tuple[0] == id)[0];

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
        },

        isActive(id, level){
            let tuple = this.activeTraits.filter(tuple => tuple[0] == id && tuple[1] >= level);
            return tuple.length;
        },

        getTotalHealth(){
            let total = 0;
            // flat health
            this.activeTraits.forEach(activeTuple => {
                traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
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
                traitStats = getTraitStats(activeTuple[0], activeTuple[1]);
                total += traitStats?.all?.maxHealth ?? 0;
                if (hasCurrentChampionTrait(traitStats.name)){
                    total += traitStats?.trait?.maxHealth ?? 0;
                }
            });
            return total;
        },
    });

});

document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const activeTraits = Alpine.store('currentTrait').activeTraits;
        Alpine.store('stats').updateCurrentStats();
    });
});

function getTraitsData() {
    traitsStats = Alpine.store('traitsStatsData').traitsStats;
    traitMap = [];

    for(var trait of traitsStats){
        traitData = { 
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
    traitStats = Alpine.store('traitsStatsData').traitsStats.find(traitStats => traitStats.id == id);
    trait = {}
    trait.name = traitStats.name;
    trait.srcPath = traitStats.srcPath;
    trait.id = Number(traitStats.id);
    trait.trait = traitStats.levels[level]?.trait;
    trait.all = traitStats.levels[level]?.all;
    return trait;
}