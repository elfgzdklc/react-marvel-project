import React, { useEffect, useState } from 'react';
import api from '../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import Title from "../components/Heads";
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function Index() {
    const [characters, setCharacters] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        getCharacters()
    }, []);

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const getCharacters = async () => {
        try {
            const response = await api.get('/characters', {
                params: {
                    limit: 30,
                    offset: 10
                }
            });
            setCharacters(response.data.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    const loadMoreCharacters = async () => {
        const response = await api.get('/characters', {
            params: {
                limit: 30,
                offset: `${index}0`
            }
        });

        const newCharacters = response.data.data.results;
        setCharacters((prevItems) => [...prevItems, ...newCharacters]);
        setIndex((prevIndex) => prevIndex + 1);

        setHasMore(newCharacters.length > 0);
    }

    return (
        <>
            <Title title="Home Page" />
            <div data-testid="character-list">
                <InfiniteScroll
                    dataLength={characters.length}
                    next={loadMoreCharacters}
                    hasMore={hasMore}
                    loader={
                        <div className='d-flex justify-content-center'>
                            <span className="loader" />
                        </div>
                    }
                    endMessage={<p className="lead d-flex justify-content-center">No more data to load.</p>}
                >
                    <div className='container'>
                        <div className='row mx-5 mt-4'>
                            {characters &&
                                characters.map((item, index) => (
                                    <React.Fragment key={`character_${index}`}>
                                        <div className='col-lg-4 d-flex justify-content-around p-3' data-testid={`character-card-${item.id}`}>
                                            <div className='card shadow-sm animated-div img-detail-custom'
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                                onClick={() => window.open(`/details/${item.id}`, '_blank')}>
                                                <Image loader={imageLoader} loading={"eager"} priority width="300" height="100" className='img-fluid-custom'
                                                    src={`https://${item.thumbnail?.path?.replace(/^https?:\/\//, '')}/standard_fantastic.${item.thumbnail?.extension}`} alt={`item_${item.name}`}
                                                />
                                                <div className='red-line' />
                                                <div className="card-body m-bg-dark pb-5 mb-5">
                                                    <h5 className="card-title text-white overflow-hidden">{item.name}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
            <ScrollToTopButton />
        </>
    )
}
