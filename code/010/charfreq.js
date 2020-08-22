
/**
 * 这段 Node.js 代码是以标准输入的形式读取文本，计算文本中每一个字母的出现频率
 * 并以直方图的形式展示出来；下面这段代码需要 Node.js 12 及以上。
 * 
 * 在 Unix 风格的系统中（Linux 和 Mac ），你可以用下面的方式调用is:
 *    node charfreq.js < corpus.txt
 */

// DefaultMap 是基于 Map 的类，这种方式可以让你在调用不存在的属性时不会返会 null
class DefaultMap extends Map {
    constructor(defaultValue) {
        super();                            // 调用超类构造函数
        this.defaultValue = defaultValue;   // 将输入的值挂在实例的 defaultValue 属性上
    }
    get(key) {
        if (this.has(key)) {                // 如果要查询的属性已经在是实例上
            return super.get(key);          // 通过超类返回对于的属性值
        }
        else {
            return this.defaultValue;       // 否则返回默认值
        }
    }
}

// 这个类用来计算并显示字母的直方图
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);  // 计算字母的出现次数
        this.totalLetters = 0;                  // 记录出现多少了字母
    }

    // 这个方法根据文本中的字母来更新直方图
    add(text) {
        // 删除空格，然后转为大写字母
        text = text.replace(/\s/g, "").toUpperCase();

        // 循环遍历文本的字母
        for (let character of text) {
            let count = this.letterCounts.get(character);   // 获取上次计数
            this.letterCounts.set(character, count + 1);      // 在原有计数的基础上加1
            this.totalLetters++;
        }
    }

    // 将直方图转换为 ASCII 的字符串
    toString() {
        // 将Map结构转换为 [key,value] 数组形式的数组 （数组内套数组）
        let entries = [...this.letterCounts];

        // 通过计数来排序，然后按字母顺序
        entries.sort((a, b) => {                 // 排序函数
            if (a[1] === b[1]) {                // 如果两个字母的出现频率一样
                return a[0] < b[0] ? -1 : 1;    // 按照字母的顺序返回.
            } else {                              // 如果出现频率不一样
                return b[1] - a[1];             // 返回出现频率高的值
            }
        });

        // 将计数转化成百分比
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // 删除所有占比小于1%的数据
        entries = entries.filter(entry => entry[1] >= 2);

        // 转成一行文本
        let lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        // 使用换行符拼成字符串输出
        return lines.join("\n");
    }
}

// 创建直方图的异步函数，使用数据流的方式读取文本，数据流读取完毕后，返回最终的直方图。
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // 读取 Unicode 字符串, 而不是字节
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

// 这个脚本的入口，通过标准输入创建一个直方图对象，然后把它转成字符串输出
histogramFromStdin().then(histogram => {
    console.log(histogram.toString());
});