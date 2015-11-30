(function() {
    angular.module("HotelApp")
        .factory("BusinessService", BusinessService);

    function BusinessService($http, $q, $rootScope) {

        var api={
            searchByBusinessId:searchByBusinessId
        }

        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }

        function searchByBusinessId(bid)
        {

            console.log("Here..........");

            var deferred=$q.defer();




           var method = "GET";
           var url = "https://api.yelp.com/v2/business/"+bid+"?callback=JSON_CALLBACK";


           var params = {
               callback: 'angular.callbacks._0',

               oauth_consumer_key: 'VuklhoLZCMZlHoioieLPew',
               oauth_token: 'wx2QaMJoVlkngzuh5EavVI0FNyhtBRUF',
               oauth_signature_method: "HMAC-SHA1",
               oauth_timestamp: new Date().getTime(),
               oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
               term: "food",



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


           }).error(function(response) {

               deferred.resolve(response);

           });

           return deferred.promise;



        }
    }
})();
