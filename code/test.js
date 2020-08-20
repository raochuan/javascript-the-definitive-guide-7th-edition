function aaa(stepN, StepM, ary) {
    // stepN 代表水平步长
    // StepM 代表垂直步长
    // ary 代表数据
    if (stepN * StepM !== ary.length) {
        throw '原始数据错误'
    }

    //  找出一组数组
    // - 从小到大递增
    // - 并且这个数组长度，尽可能的长

    // 先找到最小数和最大数
    let minValue = Math.min(...ary);// 1
    let maxValue = Math.max(...ary);// 9

    // 根据步长，查找出 1 之后的最小值 Y 。push到一个临时数组
    // 判断 Y 是否等于 maxValue。 
    // 如果不等于重复上一部 ...
    // 如果等于，结束

    let resultAry = [];

    // console.log();
    // return resultAry.length;
};

let n = 3;
let m = 3;
let tempAry = [
    9, 9, 4,
    6, 6, 8,
    2, 1, 1
]

let target = aaa(n, m, tempAry);
console.log(target);//4
// 搞内聚，内耦合!