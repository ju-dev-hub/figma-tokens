import _ from 'lodash';

export const getShadow = async (frames) => {
    let arr = [];
    let shadow = [];

    const shadowFrame = frames.filter(frame => frame.name === "Shadows");

    arr = _.map(shadowFrame, (index, key) => {
        return shadowFrame[key].children
    })

    shadow = _.map(arr[0], (index, key) => {
        const name = arr[0][key].name;
        const color = arr[0][key].effects[0].color
        const offset = arr[0][key].effects[0].offset
        return { name, color, offset }
    })

    const boxShadow = _.map(shadow, (index) => {
        return `$${index.name}:
        ${index.offset.x}px 
        ${index.offset.y}px 
        ${index.offset.y}px 
         rgba(${index.color.r}, 
            ${index.color.g}, 
            ${index.color.b}, 
            ${index.color.a});`
    })

    return boxShadow
}
