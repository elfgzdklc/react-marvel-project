import Image from 'next/image';
import api from '../../services/api';
import React, { useEffect, useState } from "react";
import { dataLoader } from '../../components/PageLoader';
import moment from 'moment';
import Title from "../../components/Heads";

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.query.id
        },
    }
}

export default function DetailPage(props) {
    const [characterId, setCharacterId] = useState(parseInt(props.id))
    const [character, setCharacter] = useState([])
    const [characterComics, setCharacterComics] = useState([])
    const [loading, setLoading] = useState([])
    const pageLoader = dataLoader;

    useEffect(() => {
        const getCharacterDetail = async () => {
            setLoading(true);
            try {
                const character_response = await api.get(`/characters/${characterId}`);
                setCharacter(character_response.data.data.results[0]);

                const comics_response = await api.get(`/characters/${characterId}/comics`, {
                    params: {
                        limit: 10,
                        orderBy: '-onsaleDate',
                    },
                });
                setCharacterComics(comics_response.data.data.results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCharacterDetail();
    }, [characterId]);

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <>
            <Title title="Character Detail" />
            {loading && pageLoader}
            <div className="wrapper">
                <div className="header text-wrap">{character.name}</div>
                <div className="content scrollable-div">{character.description}</div>
                <div className="image">
                    <Image loader={imageLoader} loading={"eager"} priority width="300" height="100" className="d-flex justify-items-center image-detail" src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} alt={`comic_${character.name}`} />
                </div>
            </div>
            <div className="comics-card">
                <div className="content-detail d-flex justify-content-center">
                    <ul className="team">
                        {characterComics.map((comic, index) => (
                            <li className="member co-funder" style={{ '--comicContent': `"${comic.format}"` }} key={`comic_${comic.id}`}>
                                <div className="thumb">
                                    <Image loader={imageLoader} loading={"eager"} priority width="300" height="100" className="d-flex justify-items-center image-detail" src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`} alt={`comic_${comic.name}`} />
                                </div>
                                <div className="description">
                                    <h3>{comic.title}</h3>
                                    <p>{comic.description}<br />
                                        <span>{comic.dates && comic.dates[0] ? moment(comic.dates[0].date).format('YYYY.MM.DD') : ''}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}