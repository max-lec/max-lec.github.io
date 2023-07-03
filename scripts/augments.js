
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
            this.augment1 = getAugmentStats(id)
        },

        selectAugment2(id) {
            this.augment2 = getAugmentStats(id)
        },
        
        selectAugment3(id) {
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
            return this.augment1.manaStart + this.augment2.manaStart + this.augment3.manaStart;
        },
        getTotalAugmentAp(){
            return this.augment1.ap + this.augment2.ap + this.augment3.ap;
        },
        getTotalAugmentAttack(){
            return this.augment1.attack + this.augment2.attack + this.augment3.attack;
        },
        getTotalAugmentSpeed(){
            return this.augment1.speed + this.augment2.speed + this.augment3.speed;
        },
    });
})

document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const augment1 = Alpine.store('currentAugment').augment1;
        const augment2 = Alpine.store('currentAugment').augment2;
        const augment3 = Alpine.store('currentAugment').augment3;
        Alpine.store('stats').updateCurrentStats();
    });
});



function getAugmentsData() {
    augmentsStats = Alpine.store('augmentsStatsData').augmentsStats;
    augmentMap = [];

    for(var augment of augmentsStats){
        augmentData = { 
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
    augmentStats = Alpine.store('augmentsStatsData').augmentsStats.find(augmentStats => augmentStats.id == id);
    augment = {}
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
