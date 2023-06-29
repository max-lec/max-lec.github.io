
document.addEventListener('alpine:init', () => {

    Alpine.store('championsStatsData', {
        championsStats: [],

        init() {
            championsStats = JSON.parse(document.getElementById("championsStatsData").textContent);
        },
    });

    Alpine.store('currentChampion', {
        id: 0,
        name: "",
        srcPath: "",
        level: 1,
        health: 0,
        armor: 0,
        resistance: 0,
        manaStart: 0,
        ap: 0,
        attack: 0,
        speed: 0,
        criticalChance: 25,
        criticalDamage: 1.3,

        init() {
            this.id = 798; //inits to jhin
            this.selectChampion(this.id);
        },

        setChampionStats(id) {
            championStats = getChampionStats(id)
            this.name = championStats.name;
            this.srcPath = getChampionSrcPath(championStats.name)
            this.health = championStats.health[this.level - 1]
            this.armor = championStats.armor[this.level - 1]
            this.resistance = championStats.resistance[this.level - 1]
            this.manaStart = championStats.mana_start ?? 0
            this.ap = championStats.ap
            this.attack = championStats.attack[this.level - 1]
            this.speed = championStats.speed
        },

        selectChampion(id) {
            this.id = id;
            this.setChampionStats(id);
        }
    });

});

document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const id = Alpine.store('currentChampion').id;
        Alpine.store('stats').updateCurrentStats();
    });
});

function getChampionsData() {
    championStats = Alpine.store('championsStatsData').championStats;
    championMap = [];

    for(var champion of championsStats){
        championData = { 
            "id": champion.id, 
            "name": champion.name, 
            "srcPath": getChampionSrcPath(champion.name)
        };
        championMap.push(championData);
    }

    return championMap;

}

function getChampionStats(id) {
    championStats = Alpine.store('championsStatsData').championStats;
    return championsStats.find(championStats => championStats.id == id);
}

function getChampionSrcPath(championName) {
    return "public/images/champions/" + championName.replace(" ", "") + ".png"
}
