'use strict';

angular.module(ApplicationConfiguration.applicationModuleName)
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
    });
