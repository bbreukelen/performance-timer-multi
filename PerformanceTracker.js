
class PerformanceTracker {

    constructor() {
        this.totals = [];
        this.total = 0;
        this.items = {};
    }

    start() {
        return new PerformanceItem(this);
    }

    copy(items, total) {
        this.total += total;
        this.totals.push(total);
        Object.keys(items).forEach(name => {
            if (this.items.hasOwnProperty(name)) {
                this.items[name] = [...this.items[name], ...items[name]];
            } else {
                this.items[name] = items[name];
            }
        });
    }

    output() {
        console.log('--------------------------------------------------------------------------------');
        console.log(`Total execution time:`, this.total, 'ms', Math.ceil(this.total / 1000), 's');
        console.log(`Shortest cycle time:`, Math.min(...this.totals), 'ms');
        console.log(`Longest cycle time:`, Math.max(...this.totals), 'ms');
        console.log(`Analysis per item:`);
        console.log(`total\taverage\tshort\tlong\tamount\tname`);
        Object.keys(this.items).forEach(name => {
            let total = this.items[name].reduce((a,b)=>a+b);
            let avg = Math.round(total / this.items[name].length);
            let min = Math.min(...this.items[name]);
            let max = Math.max(...this.items[name]);
            let amount = this.items[name].length;
            console.log(`${total}\t${avg}\t${min}\t${max}\t${amount}\t${name}`);
        });
        console.log('--------------------------------------------------------------------------------');

        process.exit(0);
    }
}

class PerformanceItem {
    ptLink = null;
    start = 0;
    last = 0;
    items = {};

    constructor(pt) {
        this.ptLink = pt;
        this.start = new Date().getTime();
        this.last = this.start;
    }

    log(name) {
        let now = new Date();
        let timeItTook = now.getTime() - this.last
        if (this.items.hasOwnProperty(name)) {
            this.items[name].push(timeItTook);
        } else {
            this.items[name] = [timeItTook];
        }
        console.log(now.toISOString(), `::`, timeItTook, 'ms', name);
        this.last = now;
    }

    done() {
        const total = new Date().getTime() - this.start;
        this.ptLink.copy(this.items, total);
        this.ptLink = null; // Destroy
    }
}

module.exports = PerformanceTracker;