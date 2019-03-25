'use strict';

const myServices = angular.module('apiMovies.services', []);

myServices.constant('URLAPI', 'http://api.themoviedb.org/3');
myServices.constant('APIKEY', 'b4003f183467648a23b25761f187aa6b');

myServices.factory('moviesAPIservice', function($http, APIKEY, URLAPI) {

    const ejectRq = (url, params) => {
        var url = URLAPI + "/" + url + "?api_key=" + APIKEY;
        angular.forEach(params, (value, key) => {
            url = url + "&" + key + "=" + value;
        });
        return $http({
            "url": url,
        	"cache": true,
            "method": "GET",
            "headers": {
            	"Content-Type": "application/json"
        	}
        }).then( (response) => {
            return response.data;
        }).catch( (err) => {
        	console.error(err);
        });
    }

    const search_multi = (query, page = 1) => { 
  		return ejectRq('search/multi',
  			{
                language: 'es-CO',
                query: query,
                page: page,
                region: 'CO',
  			}).then( (data) => {
                return data;
  		    });
	}
	const detail_type_id = (type, id) => { 
  		return ejectRq(type + '/' + id, {language: 'es-CO'});
	}

	var factory = {
        "detail": detail_type_id,
        "search": search_multi,
    };

	return factory;
});