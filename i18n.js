/**
 * @ngdoc filter
 * @name app.filter:i18n
 * @description
 * Translation for strings in your entire angular application
 * It depends on
 *
 * You need a javascript opject with your translations like this:
 * lang = {
 *   'Name': 'Name'
 *   ,'City': 'Ort'
 *   ,'Population': 'Einwohner'
 * }
 * You could include it as a file dependig on e.g. url (http://domain.tld/de/) or session
 *
 * Usage in template:
 * {{'My Text'|i18n}}
 *
 * Usage in controller/directrive/widget:
 * angular.filter.i18n('My Text');
 *
 */

var _locales={};
var xComponent = angular.module('xcomponent', []);
xComponent.filter('i18n',function(){
    return function(str){
        var l_lang;
        if(navigator.userLanguage){
            l_lang = navigator.language;
        }else if ( navigator.language){
            l_lang = navigator.language;
        }else{
            l_lang = "en";
        }

        l_lang = l_lang.toLocaleLowerCase();
        console.debug("Current locale : "+ l_lang);
        var offset = 1;

        str = _locales[l_lang][str] || str;

        for( var i = offset ; i < arguments.length ; i++){
            str = str.split('%' + (i - offset + 1).join(arguments[i]));
        }
        return str;
    };

});