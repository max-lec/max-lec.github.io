document.addEventListener('alpine:init', () => {

    Alpine.store('enemyChampion', {
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
            criticalDamage: 0.4
        },

        init() {
            this.id = 1; //inits to aatrox (jhin is 19)
            this.level = 1;
            this.selectChampion(this.id);
        },

        loadChampionStats() {
            let championStats = getChampionStats(this.id);
            this.name = decodeHtmlEntity(championStats.name);
            this.srcPath = getChampionSrcPath(this.name);
            this.type = championStats.type[0];
            this.stats = mapChampionStats(championStats, this.level);
        },

        selectChampion(id) {
            this.id = id;
            this.loadChampionStats();
        },
        
        setChampionLevel(level) {
            this.level = level;
            this.loadChampionStats();
        },
    });

});


document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const id = Alpine.store('enemyChampion').id;
        Alpine.store('enemyChampion').selectChampion(id);
        const level = Alpine.store('enemyChampion').level;
        Alpine.store('enemyChampion').setChampionLevel(level);

        Alpine.store('stats').updateCurrentStats();
    });
});