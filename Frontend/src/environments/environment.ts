// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: 'http://localhost:5011/api/',

  firebase: {
    apiKey: "AIzaSyCtdK82us7pMsPpHxBhx0CpfIdAD8p2yLk",
    authDomain: "musicisum.firebaseapp.com",
    projectId: "musicisum",
    storageBucket: "musicisum.appspot.com",
    messagingSenderId: "692606201561",
    appId: "1:692606201561:web:e549caf44c9c5d08b118c8",
    measurementId: "G-CCQ82Z15PE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.scripts/dist/zone-error';  // Included with Angular CLI.
