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
            console.log(id, level)
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
            var tuple = this.activeTraits.filter(tuple => tuple[0] == id && tuple[1] >= level);
            return tuple.length;
        }
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
        traitMap.push(traitData);
    }

    return traitMap;
}