
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
        stats: {
            health: 0,
            armor: 0,
            resistance: 0,
            manaStart: 0,
            ap: 0,
            attack: 0,
            speed: 0,
            criticalChance: 25,
            criticalDamage: 1.3
        },
        spellDesc: "",
        spells: [
            {
                type: "buff",
                duration: 0,
                manaCast: 0,
                apRatio: [0, 0, 0],
                attackRatio: [0, 0, 0],
                speed: 0,
                omnivamp: 0,
                flatAp: 0,
                flatAttack: 0,
                switchSpellAfter: 0,
                maxMultihit: 0,
                sunder: 0,
                shred: 0,
                percentDamage: 0,
                manaLock: false,
                autoLock: true,
                channel: false
            },
        ],

        init() {
            this.id = 1; //inits to aatrox (jhin is 19)
            this.level = 1;
            this.selectChampion(this.id);
        },

        setChampionStats(id) {
            championStats = getChampionStats(id);

            this.name = decodeHtmlEntity(championStats.name);
            this.srcPath = getChampionSrcPath(this.name);
            this.type = championStats.type[0];
            this.spellDesc = championStats.spell_desc;

            this.stats = mapChampionStats(championStats, this.level);
            this.spells = championStats.spells;
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

function mapChampionStats(championStats, level){
    let stats = {};
    stats.health = championStats.health.length >= level ? Number(championStats.health[level - 1]) : championStats.health[0];
    stats.armor = championStats.armor.length >= level ? Number(championStats.armor[level - 1]) : championStats.armor[0];
    stats.resistance = championStats.resistance.length >= level ? Number(championStats.resistance[level - 1]) : championStats.resistance[0];
    stats.manaStart = Number(championStats.mana_start) ?? 0;
    stats.ap = Number(championStats.ap);
    stats.attack = championStats.attack.length >= level ? Number(championStats.attack[level - 1]) : championStats.attack[0];
    stats.speed = Number(championStats.speed) * 100;
    return stats;
}

function hasCurrentChampionTrait(traitName){
    return Alpine.store('currentChampion').type.includes(traitName) || Alpine.store('currentItem').getItemNames().includes(traitName);
}

function getChampionSrcPath(championName) {
    return "public/images/champions/" + championName.replace(" ", "") + ".png"
}

function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
}
