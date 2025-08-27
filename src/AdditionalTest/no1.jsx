let num = [0, 1];
for(let i = 2;i<10;i++){
    num[i] = num[i-1] + num[i-2]
}
console.log(num)