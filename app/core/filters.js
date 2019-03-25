'use strict';

angular.module('apiMovies').filter("mediatypehuman", function() {
	const MOVIE = 'movie';
	const TV = 'tv';
	const PERSON = 'person';

    return function(text){
        var textf = text || '';

        if (textf === MOVIE) {
            return 'Película';
        } else if (textf === TV){
            return 'Programa de Televisión';
        } else if (textf === PERSON) {
            return 'Celebridad';
        }
    };
});