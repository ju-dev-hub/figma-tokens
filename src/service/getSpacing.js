import _ from 'lodash';

export const getSpacing = async (frames) => {
    let arr = [];
    let space = [];

    const spaceFrame = frames.filter(frame => frame.name === "Spacing");

    arr = _.map(spaceFrame, (index, key) => {
        return spaceFrame[key].children
    })

    space = _.map(arr[0], (index, key) => {
        const name = arr[0][key].name;
        const width = arr[0][key].absoluteBoundingBox.width
        return { name, width }
    })

    const spacing = _.map(space, (index) => {
        return `$${index.name}: ${index.width}px;`
    })

    return spacing
}
