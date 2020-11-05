import _ from 'lodash';

export const getFontSize = async (frames) => {
    let arr = [];
    let fonts = [];

    const fontFrame = frames.filter(frame => frame.name === "Font Sizes");

    arr = _.map(fontFrame, (index, key) => {
        return fontFrame[key].children
    })

    fonts = _.map(arr[0], (index, key) => {
        const name = arr[0][key].name;
        const font = arr[0][key].style.fontSize
        return { name, font }
    })

    const fontSize = _.map(fonts, (index) => {
        return `$${index.name}: ${index.font}px;`
    })
    return fontSize
}
