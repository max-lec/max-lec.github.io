/* Executes on page load */

document.addEventListener('alpine:initialized', () => {
    Alpine.store('urlData', {
        query: "",
        url: "",
        
        init() {
            this.url = new URL(window.location.href);
            this.query = new URLSearchParams(location.search);
            this.loadData();
        },
        
        getCompleteUrl() {
            return new URL(`${this.url.origin}${this.url.pathname}?${this.query.toString()}`)
        },

        loadData() {

            // champion
            let id = this.query.get("champion");
            if (id != undefined){
                Alpine.store('currentChampion').id = id;
                Alpine.store('currentChampion').loadChampionStats();
            }
            let level = this.query.get("level");
            if (level != undefined){
                Alpine.store('currentChampion').level = level
                Alpine.store('currentChampion').loadChampionStats();
            }

            // items
            let item1 = this.query.get("item1");
            if (item1 != undefined){
                Alpine.store('currentItem').item1 = getItemStats(item1);
            } 
            let item2 = this.query.get("item2");
            if (item2 != undefined){
                Alpine.store('currentItem').item2 = getItemStats(item2);
            }
            let item3 = this.query.get("item3");
            if (item3 != undefined){
                Alpine.store('currentItem').item3 = getItemStats(item3);
            }

            // augments
            let augment1 = this.query.get("augment1");
            if (augment1 != undefined){
                Alpine.store('currentAugment').augment1 = getAugmentStats(augment1);
            } 
            let augment2 = this.query.get("augment2");
            if (augment2 != undefined){
                Alpine.store('currentAugment').augment2 = getAugmentStats(augment2);
            }
            let augment3 = this.query.get("augment3");
            if (augment3 != undefined){
                Alpine.store('currentAugment').augment3 = getAugmentStats(augment3);
            }

            // traits
            let activeTraits = this.query.get("activeTraits");
            if (activeTraits != undefined){
                Alpine.store('currentTrait').activeTraits = JSON.parse(activeTraits);
            }
        }
    });

    Alpine.effect(() => {
        const query = Alpine.store('urlData').query;
        Alpine.store('urlData').loadData();
        Alpine.store('stats').updateCurrentStats();
        history.pushState(query.toString() ,"", Alpine.store('urlData').getCompleteUrl().toString());
    });
})


function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }

    var pivot = array[0];

    var left = []; 
    var right = [];

    for (var i = 1; i < array.length; i++) {
        array[i].id < pivot.id ? left.push(array[i]) : right.push(array[i]);
    }

    return quicksort(left).concat(pivot, quicksort(right));
};