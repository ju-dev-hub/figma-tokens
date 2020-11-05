import _ from 'lodash';

export const getFontFamily = async (frames) => {
    let arr = [];
    let font = [];

    const radiusFrame = frames.filter(frame => frame.name === "Font Families");

    arr = _.map(radiusFrame, (index, key) => {
        return radiusFrame[key].children
    })

    font = _.map(arr[0], (index, key) => {
        const name = arr[0][key].name;
        const characters = arr[0][key].characters
        return { name, characters }
    })

    const fontFamily = _.map(font, (index) => {
        return `$${index.name}: ${index.characters};`
    })
    return fontFamily
}
