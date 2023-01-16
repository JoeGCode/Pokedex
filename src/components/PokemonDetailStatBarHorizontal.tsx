import React, { CSSProperties, FC } from 'react'
import { typeColoursDark, typeColoursLight } from '../utils/pokemonTypeHelpers';

type PokemonDetailsStatBarProps = {
    statValue: number,
    statName: string,
    primaryType: string,
}

const PokemonDetailsStatBarHorizontal: FC<PokemonDetailsStatBarProps> = ({ statValue, statName, primaryType }) => {

    const barPercentageWidth = (statValue / 255) <= 1 ? (statValue / 255) : 1;

    const mainBarStyle: CSSProperties = {
        width: `calc((100% - 6rem) * ${barPercentageWidth})`,
        backgroundColor: typeColoursDark[primaryType],
    }

    const backgroundBarStyle: CSSProperties = {
        backgroundColor: typeColoursLight[primaryType],
    }

    const borderStyle: CSSProperties = {
        borderColor: typeColoursDark[primaryType],
    }

    return (
        <div className='flex w-full items-center justify-center'>
            <div style={backgroundBarStyle} className='w-full relative h-12 bg-gray-600 rounded-md'>
                <div style={borderStyle} className='absolute left-0 top-0 bottom-0 w-24 text-base flex items-center justify-center border border-r-transparent rounded-l-md'>
                    <span className='text-center'>{statName}</span>
                </div>
                <div style={mainBarStyle} className='absolute left-24 bg-black h-full rounded-r-md'></div>
                <div className='absolute flex items-center justify-center text-center h-full right-2 white-text-shadow z-10'>{statValue}</div>
            </div>
        </div>
    )
}

export default PokemonDetailsStatBarHorizontal