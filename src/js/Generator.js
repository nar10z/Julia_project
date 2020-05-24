class Generator {
    /**
     * @param {String[]} examples
     * @param {Number} order
     * @param {Number} minLength
     * */
    constructor(examples, order = 1, minLength = 4) {
        this.examples = examples;
        this.order = order;
        this.minLength = minLength;
        this.used = [];


        let arr = examples.map(el => el.toUpperCase());
        this.examples = arr;
        let data = {};

        arr.forEach(word => {
            let l = word.length;

            for (let letter = 0; letter < l - order; letter++) {
                let token = word.substr(letter, order);

                if (!(token in data)) {
                    data[token] = [];
                }

                data[token].push(word.substr(letter + order, 1));
            }
        });


        this.data = data;
    }

    genName() {
        let s = "";

        do {
            let n = this.getRandom(0, this.examples.length);
            let name = this.examples[n];
            let nameLength = name.length;
            s = name.substr(this.getRandom(0, (nameLength - this.order) - 1), this.order);

            while (s.length < nameLength) {
                let token = s.substr(s.length - this.order, this.order);
                let c = this.getLetter(token);
                if (c !== '?') {
                    s += this.getLetter(token)
                } else {
                    break;
                }
            }


            if (s.indexOf(' ') > -1) {
                let tokens = s.split(' ');
                s = '';

                for (let i in tokens) {
                    let token = tokens[i];
                    if (token === '') {
                        continue;
                    }

                    if (token.length === 1) {
                        tokens[i] = token.toUpperCase();
                    } else {
                        let f = token.substr(0, 1);
                        let l = (token.substr(1)).toLowerCase();

                        tokens[i] = f + l;
                    }

                    if (s !== '') {
                        s += ' ';
                    }

                    s += tokens[i];
                }
            } else {
                let f = s.substr(0, 1);
                let l = (s.substr(1)).toLowerCase();

                s = f + l;
            }

        } while (this.used.includes(s) || s.length < this.minLength);

        this.used.push(s);

        return s;
    }


    getLetter(token) {
        if (!(token in this.data)) {
            return '?';
        }

        let letters = JSON.parse(JSON.stringify(this.data[token]));
        let n = this.getRandom(0, letters.length);

        return letters[n];
    }

    getRandom(min = 0, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}