
document.addEventListener('alpine:init', () => {

    Alpine.store('itemsStatsData', {
        itemsStats: [],

        init() {
            this.itemsStats = JSON.parse(document.getElementById("itemsStatsData").textContent);
        },
    });

    Alpine.store('currentItem', {
        item1: {
            name: "Choose an item",
            srcPath: "",
            id: 0,
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            flatShield:0, 
            percentShield:0,
            percentDamage:0,
            percentDamageAd:0,
            percentDamageAp:0,
            flatDamageAd:0,
            flatDamageAp:0,
            criticalChance:0,
            sunder:0,
            shred:0,
            burn:0,
            spellcrit:0,
            manaOnhit:0,
            speedOnhit:0
        },
        item2:{            
            name: "Choose an item",
            srcPath: "",
            id: 0,
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            flatShield:0, 
            percentShield:0,
            percentDamage:0,
            percentDamageAd:0,
            percentDamageAp:0,
            flatDamageAd:0,
            flatDamageAp:0,
            criticalChance:0,
            sunder:0,
            shred:0,
            burn:0,
            spellcrit:0,
            manaOnhit:0,
            speedOnhit:0
        },
        item3: {
            name: "Choose an item",
            srcPath: "",
            id: 0,
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            ap:0,
            attack:0,
            speed:0,
            flatShield:0, 
            percentShield:0,
            percentDamage:0,
            percentDamageAd:0,
            percentDamageAp:0,
            flatDamageAd:0,
            flatDamageAp:0,
            criticalChance:0,
            sunder:0,
            shred:0,
            burn:0,
            spellcrit:0,
            manaOnhit:0,
            speedOnhit:0
        },

        selectItem1(id) {
            this.item1 = getItemStats(id)
        },

        selectItem2(id) {
            this.item2 = getItemStats(id)
        },
        
        selectItem3(id) {
            this.item3 = getItemStats(id)
        },

        getTotalHealth(){
            return this.item1.health + this.item2.health + this.item3.health;
        },
        getTotalMaxHealth(){
            // TODO
            return 0;
        },
        getTotalArmor(){
            return this.item1.armor + this.item2.armor + this.item3.armor;
        },
        getTotalResistance(){
            return this.item1.resistance + this.item2.resistance + this.item3.resistance;
        },
        getTotalManaStart(){
            return this.item1.manaStart + this.item2.manaStart + this.item3.manaStart;
        },
        getTotalItemAp(){
            return this.item1.ap + this.item2.ap + this.item3.ap;
        },
        getTotalItemAttack(){
            return this.item1.attack + this.item2.attack + this.item3.attack;
        },
        getTotalItemSpeed(){
            return this.item1.speed + this.item2.speed + this.item3.speed;
        },
        getTotalItemCriticalChance(){
            return this.item1.criticalChance + this.item2.criticalChance + this.item3.criticalChance;
        },
    });
})

document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const item1 = Alpine.store('currentItem').item1;
        const item2 = Alpine.store('currentItem').item2;
        const item3 = Alpine.store('currentItem').item3;
        Alpine.store('stats').updateCurrentStats();
    });
});



function getItemsData() {
    itemsStats = Alpine.store('itemsStatsData').itemsStats;
    itemMap = [];

    for(var item of itemsStats){

        itemData = { 
            "id": Number(item.id), 
            "name": item.name, 
            "srcPath": item.srcPath
        };
        if(!isStatsEmpty(item)){
            itemMap.push(itemData);
        }
    }

    return quicksort(itemMap);
}

function getItemStats(id) {
    itemStats = Alpine.store('itemsStatsData').itemsStats.find(itemStats => itemStats.id == id);
    item = {}
    item.name = itemStats.name;
    item.srcPath = itemStats.srcPath;
    item.id = Number(itemStats.id);
    item.health = Number(itemStats.health);
    item.armor = Number(itemStats.armor);
    item.resistance = Number(itemStats.resistance);
    item.manaStart = Number(itemStats.mana_start);
    item.ap = Number(itemStats.ap);
    item.attack = Number(itemStats.attack);
    item.speed = Number(itemStats.speed);
    return item;
}

function isStatsEmpty(item) {
    let stats = Number(item.health) 
    + Number(item.armor) 
    + Number(item.resistance)
    + Number(item.mana_start)
    + Number(item.ap)
    + Number(item.attack)
    + Number(item.speed)
    return stats < 1;
}

function getItemSrcPath(itemSrcPath) {
    return itemSrcPath;
}