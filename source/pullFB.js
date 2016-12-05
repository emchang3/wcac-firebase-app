import { setFbSDK } from './actions'

export const pullFB = (dispatch) => {
  window.fbAsyncInit = function() {
    // FB.init({
    //   appId      : '193476354446811',
    //   xfbml      : false,
    //   version    : 'v2.8'
    // });
    // FB.AppEvents.logPageView();
    dispatch(setFbSDK(FB))
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}
