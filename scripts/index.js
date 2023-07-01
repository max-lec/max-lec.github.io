/* Executes on page load */

document.addEventListener('alpine:init', () => {
  

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