angular.module(ApplicationConfiguration.applicationModuleName)
    .config(function($translateProvider) {
        // Our translations will go in here
        //$translateProvider.translations('en', {
        //        HEADLINE: 'Welcome to Easic!',
        //}).translations('fr', {
        //        HEADLINE: 'Bienvenu sur Easic!',
        //    });
        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
    });
