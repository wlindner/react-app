import Reflux from 'reflux';
import React from 'react';
import Infinite from 'react-infinite';
import _ from 'lodash';

import MovieItem from './components/MovieItem';
import MovieStore from '../../stores/MovieStore';

import './Home.scss';

var paddingTop = 100;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {movies: []};

        this.onMovieListChange = this.onMovieListChange.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = MovieStore.listen(this.onMovieListChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onMovieListChange(movies) {
        this.setState({
            movies: movies
        });
    }

    render() {
        return (
            <div className="home" style={{paddingTop}}>
                <Infinite containerHeight={document.body.clientHeight - paddingTop} elementHeight={200}>
                    {this.state.movies.map(function(movie) {
                        return <MovieItem title={movie.Title} year={movie.Year} rating={movie.Rating} />
                    })}
                </Infinite>
            </div>
        );
    }
}

module.exports = Home;
