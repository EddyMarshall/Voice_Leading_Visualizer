class Chord {
    constructor(name, quality, scale, number) {
        this.name = name
        this.number = number
        this.scale = scale
        this.quality = quality
        this.triad = this.buildChord(scale);
    }

    buildChord(scale) {
        let buildFrom = scale.slice(0)
        let newArr = []
        while (buildFrom[0] != this.name) {
            let holder = buildFrom.shift();

            buildFrom.push(holder);
        }
        newArr.push(buildFrom[0])
        newArr.push(buildFrom[2])
        newArr.push(buildFrom[4])
        return newArr;
    }




}


export default Chord;