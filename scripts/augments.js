
document.addEventListener('alpine:init', () => {

    Alpine.store('augmentsStatsData', {
        augmentsStats: [],

        init() {
            this.augmentsStats = JSON.parse(document.getElementById("augmentsStatsData").textContent);
        },
    });

    Alpine.store('currentAugment', {
        augment1: {
            name: "Choose an augment",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            spellcrit:0
        },
        augment2:{            
            name: "Choose an augment",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            spellcrit:0
        },
        augment3: {
            name: "Choose an augment",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            spellcrit:0
        },

        selectAugment1(id) {
            Alpine.store('urlData').query.set("augment1", id);
            this.augment1 = getAugmentStats(id)
        },

        selectAugment2(id) {
            Alpine.store('urlData').query.set("augment2", id);
            this.augment2 = getAugmentStats(id)
        },
        
        selectAugment3(id) {
            Alpine.store('urlData').query.set("augment3", id);
            this.augment3 = getAugmentStats(id)
        },

        getTotalHealth(){
            return this.augment1.health + this.augment2.health + this.augment3.health;
        },

        getTotalMaxHealth(){
            // TODO
            return 0;
        },

        getTotalArmor(){
            return this.augment1.armor + this.augment2.armor + this.augment3.armor;
        },

        getTotalResistance(){
            return this.augment1.resistance + this.augment2.resistance + this.augment3.resistance;
        },

        getTotalManaStart(){
            // only infusion this set (ignore sorcerer)
            return 0;
        },

        getTotalManaBonus(){
            // only infusion this set (ignore sorcerer)
            let names = this.augment1.name + this.augment2.name + this.augment3.name;
            return names.includes("Infusion") ? [20, 5] : [0, 0];
        },

        getTotalAp(){
            return this.augment1.ap + this.augment2.ap + this.augment3.ap;
        },

        getTotalAttack(){
            return this.augment1.attack + this.augment2.attack + this.augment3.attack;
        },

        getTotalSpeed(){
            return this.augment1.speed + this.augment2.speed + this.augment3.speed;
        },
    });
})

function getAugmentsData() {
    let augmentsStats = Alpine.store('augmentsStatsData').augmentsStats;
    let augmentMap = [];

    for(var augment of augmentsStats){
        let augmentData = { 
            "id": Number(augment.id), 
            "name": augment.name, 
            "desc": augment.desc, 
            "srcPath": augment.srcPath
        };
        augmentMap.push(augmentData);
    }

    return quicksort(augmentMap);
}


function getAugmentStats(id) {
    let augmentStats = Alpine.store('augmentsStatsData').augmentsStats.find(augmentStats => augmentStats.id == id);
    let augment = {}
    augment.name = augmentStats.name;
    augment.srcPath = augmentStats.srcPath;
    augment.id = augmentStats.id;
    augment.desc = augmentStats.desc;
    augment.health = augmentStats.stats.health;
    augment.armor = augmentStats.stats.armor;
    augment.resistance = augmentStats.stats.resistance;
    augment.manaStart = augmentStats.stats.mana;
    augment.ap = augmentStats.stats.ap;
    augment.attack = augmentStats.stats.attack;
    augment.speed = augmentStats.stats.speed;
    return augment;
}
