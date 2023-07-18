
document.addEventListener('alpine:init', () => {

    Alpine.store('itemsStatsData', {
        itemsStats: [],

        init() {
            this.itemsStats = JSON.parse(document.getElementById("itemsStatsData").textContent);
        },
    });

    Alpine.store('currentItem', {
        item1: {
            name: "Empty item slot",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            manaCast:0,
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
            name: "Empty item slot",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            manaCast:0,
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
            name: "Empty item slot",
            srcPath: "",
            id: 0,
            desc: "",
            health:0,
            armor:0,
            resistance:0,
            manaStart:0,
            manaCast:0,
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
            Alpine.store('urlData').query.set("item1", id);
            this.item1 = getItemStats(id)
        },

        selectItem2(id) {
            Alpine.store('urlData').query.set("item2", id);
            this.item2 = getItemStats(id)
        },
        
        selectItem3(id) {
            Alpine.store('urlData').query.set("item3", id);
            this.item3 = getItemStats(id)
        },

        getItemNames(){
            return this.item1.name + this.item2.name + this.item3.name;
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

        getTotalManaCast(){
            return this.item1.manaCast + this.item2.manaCast + this.item3.manaCast;
        },

        getTotalAp(){
            return this.item1.ap + this.item2.ap + this.item3.ap;
        },

        getTotalAttack(){
            return this.item1.attack + this.item2.attack + this.item3.attack;
        },

        getTotalSpeed(){
            return this.item1.speed + this.item2.speed + this.item3.speed;
        },

        getTotalItemCriticalChance(){
            return this.item1.criticalChance + this.item2.criticalChance + this.item3.criticalChance;
        },

        getManaPerAttack(){
            // shojin/hirana are the only items to change mana onhit
            let itemNames = this.getItemNames();
            let manaPerAttack = itemNames.includes("Shojin") ? 5 : 0;
            manaPerAttack += itemNames.includes("Hirana") ? 8 : 0;
            return manaPerAttack;
        },
    });
})


function getItemsData() {
    let itemsStats = Alpine.store('itemsStatsData').itemsStats;
    let itemMap = [];
    itemMap.push(createEmptyItem()); // this stores a blank item to remove an item if needed

    for(var item of itemsStats){

        let itemData = { 
            "id": Number(item.id), 
            "name": item.name, 
            "srcPath": item.srcPath,
            "desc": item.desc.replace(/<br>/g, "\n")
        };

        if(!isStatsEmpty(item)){
            itemMap.push(itemData);
        }
    }

    return quicksort(itemMap);
}


function getItemStats(id) {
    if(id == 0) {
        return createEmptyItem()
    }

    let itemStats = Alpine.store('itemsStatsData').itemsStats.find(itemStats => itemStats.id == id);
    let item = {}
    item.name = itemStats.name;
    item.srcPath = itemStats.srcPath;
    item.desc = itemStats.desc.replace(/<br>/g, "\n");
    item.id = Number(itemStats.id);
    item.health = Number(itemStats.health);
    item.armor = Number(itemStats.armor);
    item.resistance = Number(itemStats.resistance);
    item.manaStart = Number(itemStats.mana_start);
    item.manaCast = Number(itemStats.mana_cast ?? 0);
    item.ap = Number(itemStats.ap.replace(/%/g, ""));
    item.attack = Number(itemStats.attack.replace(/%/g, ""));
    item.speed = Number(itemStats.speed.replace(/%/g, ""));
    item.criticalChance = Number(itemStats.critical_chance.replace(/%/g, ""));
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
    + Number(item.critical_chance)
    return stats < 1;
}


function getItemSrcPath(itemSrcPath) {
    return itemSrcPath;
}


function createEmptyItemData(){
    let itemData = { 
        "id": 0, 
        "name": "Empty item slot", 
        "srcPath": "",
        "desc": ""
    }
    return itemData
}


function createEmptyItem(){
    let emptyItem= {
        name: "Empty item slot",
        srcPath: "",
        id: 0,
        desc: "",
        health:0,
        armor:0,
        resistance:0,
        manaStart:0,
        manaCast:0,
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
    };
    return emptyItem;
}


function hasSpellCrit(){
    let names = Alpine.store('currentItem').getItemNames();
    return names.includes("Jeweled Gauntlet") 
            || names.includes("Infinity Edge") 
            || names.includes("Zenith Edge") 
            || names.includes("Glamorous Gauntlet")
            ;
}