let input = [10,9,6,5,15]
function checkSaham(array){
    let num = array.sort((a,b) => a-b)
    return num[0]
}

console.log(checkSaham(input))