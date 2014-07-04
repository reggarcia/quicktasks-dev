
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
angular.module('bucketList.services', [])
    .factory('API', function ($rootScope, $http, $ionicLoading, $window) {
       var base = "http://localhost:9804";
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.logout = function () {
            $rootScope.setToken("");
            $window.location.href = '#/auth/signin';
        };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchCompleted');

            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        }

        $rootScope.getToken = function () {
            return $window.localStorage.token;
        }

        $rootScope.isSessionActive = function () {
            return $window.localStorage.token ? true : false;
        }

        return {
            signin: function (form) {
                return $http.post(base+'/api/v1/bucketList/auth/login', form);
            },
            signup: function (form) {
                return $http.post(base+'/api/v1/bucketList/auth/register', form);
            },
            getAll: function (email) {
                return $http.get(base+'/api/v1/bucketList/data/list', {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            },
            getOne: function (id, email) {
                return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            },
            saveItem: function (form, email) {
                return $http.post(base+'/api/v1/bucketList/data/item', form, {
                    method: 'POST',
                    params: {
                        token: email
                    }
                });
            },
            putItem: function (id, form, email) {
                return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                    method: 'PUT',
                    params: {
                        token: email
                    }
                });
            },
            deleteItem: function (id, email) {
                return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'DELETE',
                    params: {
                        token: email
                    }
                });
            }
        }
    });