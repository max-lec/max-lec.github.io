
document.addEventListener('alpine:init', () => {

    Alpine.store('options', {
        multihit: 1,
    });
});


document.addEventListener('alpine:initialized', () => {
    Alpine.effect(() => {
        const multihit = Alpine.store('options').multihit;
        Alpine.store('stats').updateCurrentStats();
    });
});