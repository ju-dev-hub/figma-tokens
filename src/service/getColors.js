import _ from 'lodash';

export const getColors = async (frames) => {

    let arr = [];
    let secondary = [];
    let primary = [];
    let colors = [];

    const colorFrame = frames.filter(frame => frame.name === "Paleta");
    const colorBlocks = colorFrame[0].children.filter(
        block => block.type === "GROUP"
    );

    arr = _.map(colorBlocks, (index, key) => {
        return colorBlocks[key].children
    })

    secondary = _.map(arr[0], (index, key) => {
        return arr[0][key].children.filter(
            block => block.type === "RECTANGLE"
        );
    })

    primary = _.map(arr[1], (index, key) => {
        return arr[1][key].children.filter(
            block => block.type === "RECTANGLE"
        );
    })

    const color = _.concat(primary, secondary);

    for (let i in color) {
        for (let y in color[i]) {
            const name = color[i][y].name;
            const rgba = color[i][y].fills[0].color;
            const newColor = await formatColor(name, rgba.r, rgba.g, rgba.b, rgba.a);
            colors.push(newColor);
        }
    }
    return colors;
}

// covert float number to integer
const floatToInt = (float) => {
    return Math.round(float * 255);
}

// convert rgba into a string
const rgbaToString = (r, g, b, a) => {
    const rInt = floatToInt(r);
    const gInt = floatToInt(g);
    const bInt = floatToInt(b);
    return `rgba(${rInt},${gInt},${bInt},${a.toFixed(2)})`;
}

const formatColor = async (name, r, g, b, a) => {
    return await `$${name}: ${rgbaToString(r, g, b, a)};`;
}
