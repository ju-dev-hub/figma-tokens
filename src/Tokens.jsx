/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import axios from "axios";

export function Tokens(props) {

    const [tokens, setTokens] = useState(props.tokens);
    const [icons, setIcons] = useState(props.icons);

    useEffect(() => {
        setTokens(props.tokens)
        setIcons(props.icons)

    }, [props.tokens, props.icons]);

    const createFile = async (e) => {
        e.preventDefault()

        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:3001',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify(tokens)
            })
        } catch (error) {
            var err = new Error('Verifique se o server está rodando na porta 3001 - npm run server');
            return err;
        }
    }

    return (
        <>
            <table className="tokens">
                <tbody>
                    {
                        Object.keys(tokens).length > 0 ?
                            <>
                                <tr>
                                    <th>
                                        <button className="button-submit" type="submit" onClick={createFile}>Gerar Arquivo</button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={icons} alt={icons} width="500px" />
                                    </th>
                                </tr>
                            </> :
                            null
                    }
                    {
                        Object.keys(tokens).length > 0 ?
                            Object.keys(tokens).map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{tokens[item]}</th>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td>🎨 Os tokens serão listados logo abaixo:</td>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
