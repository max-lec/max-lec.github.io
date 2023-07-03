
document.addEventListener('alpine:init', () => {

    Alpine.store('championsStatsData', {
        championsStats: [],

        init() {
            this.championsStats = JSON.parse(document.getElementById("championsStatsData").textContent);
        },
    });

    Alpine.store('currentChampion', {
        id: 0,
        name: "",
        srcPath: "",
        type: [],
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
            this.id = 19; //inits to jhin
            this.selectChampion(this.id);
        },

        setChampionStats(id) {
            championStats = getChampionStats(id)
            this.name = decodeHtmlEntity(championStats.name);
            this.srcPath = getChampionSrcPath(this.name)
            this.type = championStats.type[0];
            this.health = championStats.health.length >= this.level ? Number(championStats.health[this.level - 1]) : championStats.health[0]
            this.armor = championStats.armor.length >= this.level ? Number(championStats.armor[this.level - 1]) : championStats.armor[0]
            this.resistance = championStats.resistance.length >= this.level ? Number(championStats.resistance[this.level - 1]) : championStats.resistance[0]
            this.manaStart = Number(championStats.mana_start) ?? 0
            this.ap = Number(championStats.ap)
            this.attack = championStats.attack.length >= this.level ? Number(championStats.attack[this.level - 1]) : championStats.attack[0]
            this.speed = Number(championStats.speed) * 100
        },

        selectChampion(id) {
            this.id = id;
            this.setChampionStats(id);
        },
        
        setChampionLevel(level) {
            this.level = level;
            this.setChampionStats(this.id);
        },
    });

});

document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const id = Alpine.store('currentChampion').id;
        const level = Alpine.store('currentChampion').level;
        Alpine.store('stats').updateCurrentStats();
    });
});

function getChampionsData() {
    championsStats = Alpine.store('championsStatsData').championsStats;
    championMap = [];

    for(var champion of championsStats){
        championData = { 
            "id": champion.id, 
            "name": decodeHtmlEntity(champion.name), 
            "srcPath": getChampionSrcPath(decodeHtmlEntity(champion.name))
        };
        championMap.push(championData);
    }

    return championMap;

}

function getChampionStats(id) {
    return Alpine.store('championsStatsData').championsStats.find(champ => champ.id == id);
}

function hasCurrentChampionTrait(traitName){
    return Alpine.store('currentChampion').type.includes(traitName);
}

function getChampionSrcPath(championName) {
    return "public/images/champions/" + championName.replace(" ", "") + ".png"
}

function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
}
