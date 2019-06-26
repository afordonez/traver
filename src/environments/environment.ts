// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAXZDuLXIHiNAtigr1cDNdg1dOYE0Efh2Q',
    authDomain: 'traver-f1bbf.firebaseapp.com',
    databaseURL: 'https://traver-f1bbf.firebaseio.com',
    projectId: 'traver-f1bbf',
    storageBucket: 'traver-f1bbf.appspot.com',
    messagingSenderId: '738453651411',
    viajeColeccion: 'viaje'
  },
  hereEndPoints:{
    autocomplete:'https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&country=ESP&resultType=areas&query=',
    geocode:'https://geocoder.api.here.com/6.2/geocode.json?jsonattributes=1&gen=9&app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&locationid=',
    route:''
  },
  hereRouteEndpoint(latitudeOr: string, longitudeOr: string,latitudeDes:string, longitudeDes:string){
    route:''
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
