(function() {
    angular.module("HotelApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $q, $rootScope) {
        $rootScope.callback_counter = 0;
        var api = {
            searchByTerm: searchByTerm,
            searchByPlace: searchByPlace,
            searchByTermAndPlace: searchByTermAndPlace,
            searchByNumberAndTerm: searchByNumberAndTerm
        };
        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }

        function searchByNumberAndTerm(num, term1) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";

            var params = {
                callback: 'angular.callbacks._0',
                location: 'California',
                limit: num,
                oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: term1,

            };
            var consumerSecret = 'HrqvdDlChpNaOyobojXUTAR8Sus';
            var tokenSecret = 'DxAev56PBQ8KTrnkPbQ_mleWEUs';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                //console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function searchByTermAndPlace(search_term, place,value) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";
            var params;
            if(value===0){
                params = {
                   callback: 'angular.callbacks._0',
                   location: place,
                   limit: 10,

                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: search_term,

               };

            }
            else if(value===undefined){
                params = {
                   callback: 'angular.callbacks._0',
                   location: place,
                   limit: 10,

                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: search_term,

               };

            }
            else{

                params = {
                   callback: 'angular.callbacks._0',
                   location: place,
                   limit: 10,
                   offset:value,
                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: search_term,

               };

            }


            var consumerSecret = 'HrqvdDlChpNaOyobojXUTAR8Sus';
            var tokenSecret = 'DxAev56PBQ8KTrnkPbQ_mleWEUs';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                //console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;
        }


        function searchByPlace(search_term,value) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";

            var params;

            if(value===undefined){
                params = {
                   callback: 'angular.callbacks._0',
                   location: search_term,
                   limit: 10,
                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: "food",

               };

            }
            else if(value===0){
                params = {
                   callback: 'angular.callbacks._0',
                   location: search_term,
                   limit: 10,
                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: "food",

               };

            }
            else{

                params = {
                   callback: 'angular.callbacks._0',
                   location: search_term,
                   limit: 10,
                   offset:value,
                   oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                   oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                   oauth_signature_method: "HMAC-SHA1",
                   oauth_timestamp: new Date().getTime(),
                   oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                   term: "food",

               };

            }


            var consumerSecret = 'HrqvdDlChpNaOyobojXUTAR8Sus';
            var tokenSecret = 'DxAev56PBQ8KTrnkPbQ_mleWEUs';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                //console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;
        }





        function searchByTerm(search_term,value) {
            //console.log("In model");
            //console.log(search_term);
            //console.log(value);

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";
            var params=undefined;
            if(value===undefined)
            {
                //console.log("In zero");
                 params = {
                    callback: 'angular.callbacks._0',
                    location: 'Boston',
                    limit: 10,
                    oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                    oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term
                };

            }

            else if(value===0)
            {
                //console.log("In zero");
                 params = {
                    callback: 'angular.callbacks._0',
                    location: 'Boston',
                    limit: 10,
                    oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                    oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term
                };

            }
            else {
                //console.log("Not in zeero");
                 params = {
                    callback: 'angular.callbacks._0',
                    location: 'Boston',
                    limit: 10,
                    offset:value,
                    oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
                    oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term
                };
            }


            var consumerSecret = 'HrqvdDlChpNaOyobojXUTAR8Sus';
            var tokenSecret = 'DxAev56PBQ8KTrnkPbQ_mleWEUs';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });
            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                //console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }

})();
