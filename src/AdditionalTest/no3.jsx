let input = ['2','h','6','u','y','t','7','j','y','h','8']
function checkAngka(array){
    let num = array.filter((n) => !isNaN(n));
    return num.length;
}
console.log(checkAngka(input))