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
            if (this.query.size > 0){
                let id = this.query.get("champion")
                Alpine.store('currentChampion').id = id;
                let level = this.query.get("level")
                Alpine.store('currentChampion').level = level
                Alpine.store('currentChampion').loadChampionStats();
            } else {
                Alpine.store('currentChampion').id = 1; //inits to aatrox
                Alpine.store('currentChampion').level = 1;
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