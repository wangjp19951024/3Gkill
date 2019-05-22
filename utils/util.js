/**
 * 工具集
 */

require('child_process');

exports.getRangeArr = const getRangeArr = (a, b) => {
    if (a < b) [a, b] = [b, a];
    let res = [];
    for (let i = a; i < b; ++i) {
        res.push(i);
    }
    return res;
};

exports.uniq = const uniq = (array) => {
    return [...new Set(array)];
};

exports.random = const random = (a, b) => {
    if (a > b) [a, b] = [b, a];

    return Math.floor(Math.random() * (b - a + 1) + a);
}

exports.timeOut = const timeOut = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

exports.sum = const sum = (array) => {
    return array.reduce((total, n) => {return total + n});
}

exports.average = const average = (array) => {
    return sum(array) / array.length;
}

exports.getRandomSequence = const getRandomSequence = *(array, randomFunc) => {
    let arr = array.slice();
    let end = array.length - 1;
    for (let a of arr) {
        let n = randomFunc(0, end);
        yield arr[n];
        arr[n] = arr[end];
        end --;
    }
}

/**遍历，找一个随机数交换位置 */
exports.shuffle = const shuffle = (array, random) => {
    let arr = array.splice(0);
    let end = array.length - 1;

    arr.forEach((t) => {
        let n = random(0, n); //找到一个随机数
        arr.push(array[n]);
        array[n] = array[end]; //交换位置 下一轮遍历
        end --;
    });
    return arr;
}