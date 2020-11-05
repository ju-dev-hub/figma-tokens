import _ from 'lodash';

export const getRadius = async (frames) => {
    let arr = [];
    let radius = [];

    const radiusFrame = frames.filter(frame => frame.name === "Radil");

    arr = _.map(radiusFrame, (index, key) => {
        return radiusFrame[key].children
    })

    radius = _.map(arr[0], (index, key) => {
        const name = arr[0][key].name;
        const cornerRadius = arr[0][key].cornerRadius
        return { name, cornerRadius }
    })

    const borderRadius = _.map(radius, (index) => {
        return `$${index.name}: ${index.cornerRadius}px;`
    })

    return borderRadius
}
