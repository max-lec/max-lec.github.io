
document.addEventListener('alpine:init', () => {
    
    Alpine.store('currentItem', {
        health: 0,
        armor: 0,
        resistance: 0,
        mana: 0,
        ap: 0,
        attack: 0,
        speed: 0,
        criticalChance: 0,
        criticalDamage: 0,
    });
})


function getItemsData() {
    itemsStats = JSON.parse(document.getElementById("itemsStatsData").textContent);
    itemMap = [];

    for(var item of itemsStats){
        itemData = { 
            "id": item.id, 
            "name": item.name, 
            "srcPath": "public/images/items/" + item.name.replace(" ", "") + ".png"
        };
        itemMap.push(itemData);
    }

    return {
        items: itemMap,

        selecteditem: itemsStats[0].id,

    };

}
