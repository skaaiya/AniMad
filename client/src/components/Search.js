import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import AnimeCard from './AnimeCard';
import Loading from './Loading';

const Search = () => {
    const history = useHistory();
    const {term} = useParams();
    const format =  term.split(" ").join("%20");
    const [searchTerm, setTerm] = useState(format)
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const {isLoading, setIsLoading} = useGlobalContext();

    useEffect(()=>{
        setIsLoading(true);
        fetch(`/search/${searchTerm}/${page}`)
        .then(res=> res.json())
        .then(doc => {
            if(doc.results.length!==0){
            setData(doc.results);
            setIsLoading(false);
        }
        else{
            history.push('/error')
        }
        })
    }, [term, page]);

    return isLoading ? <Loading /> : (
        <div className='container'>
            <div className="row">
                {
                    data.map((anime, index)=>{
                        return (
                            <div className='col-sm-6 col-md-3 col-lg-3'>
                                <Link className="link" to={`/details/${anime.id}`}>
                                    <AnimeCard key={index} {...anime}/>
                                </Link>
                        </div>
                        )  
                    })
                }
            </div>
        </div>
    )
}

export default Search
