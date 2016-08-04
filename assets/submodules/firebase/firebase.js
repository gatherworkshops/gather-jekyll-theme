var Firebase = (function(){

	'use strict';

    var user = null;
    var config = null;
    var onLogin = null;
    var onLogout = null;

    var connection = null;

    /**
     * Use your app's config from the Firebase console
     * to establish a connection with Firebase.
     */
    function init(config){
        
        this.config = config;
        this.onLogin = config.onLogin;
        this.onLogout = config.onLogout;

        this.connection = firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(updateAuthState, onError);
    }


    /**
     * When the auth state changes we can check who the
     * current user is if any and update the UI accordingly.
     */
    function updateAuthState(user){
        
        Firebase.user = user;

        if (user) {
            
            user.getToken().then(function(accessToken) {
                Firebase.user.accessToken = accessToken;
                Firebase.onLogin();
            });

        } else {
            Firebase.onLogout();
        }
        
    }

    /**
     * Log any errors to the console.
     */
    function onError(error){
        console.log(error);
    }


    function signOut(){
        this.connection.unauth();
    }



    // --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//


	return {
        init: init,
        signOut: signOut
    };

})();



