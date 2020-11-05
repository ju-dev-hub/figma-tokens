import { getColors } from './getColors'
import { getFontSize } from './getFontSize'
import { getSpacing } from './getSpacing'
import { getRadius } from './getRadius'
import { getShadow } from './getShadow'
import { getFontFamily } from './getFontFamily'

import _ from 'lodash';

const setTokens = async (frames) => {
    const colors = await getColors(frames)
    const fontSize = await getFontSize(frames)
    const spacing = await getSpacing(frames)
    const radius = await getRadius(frames)
    const shadow = await getShadow(frames)
    const fontFamily = await getFontFamily(frames)

    return _.concat(colors, fontFamily, fontSize, spacing, radius, shadow)
}

export const getTokens = async (figmaApiKey, figmaId) => {
    const url = `https://api.figma.com/v1/files/${figmaId}`;
    let response;

    try {
        response = await fetch(url, {
            headers: { "X-FIGMA-TOKEN": figmaApiKey },
            method: "get"
        });
        if (response.status === 200) {
            const data = await response.json()

            const frames = await data.document.children.filter(children => children.name === "Design Tokens")[0].children;

            console.log(frames)
            return await setTokens(frames)
        } else {
            switch (response.status) {
                case 403:
                    throw new Error(`${response.status} - Cannot authenicate you`);
                case 404:
                    throw new Error(
                        `${response.status} - Cannot find board (id:${figmaId})`
                    );
                default:
                    break;
            }
            return;
        }
    } catch (error) {
        var err = new Error('Erro ao tentar importar os tokens por meio da API do Figma. Verifique seus dados e tente novamente.');
        return err;
    }
}
