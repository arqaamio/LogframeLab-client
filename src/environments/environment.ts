// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
//  apiBaseUrl: 'http://dev.logframelab.ai:8080', // http://dev.logframelab.ai
//  webSocketUrl: 'ws://dev.logframelab.ai:8080/stomp'
//apiBaseUrl: 'http://54.216.153.184:8080',
//webSocketUrl: 'ws://54.216.153.184:8080/stomp'
apiBaseUrl: 'https://dev.logframelab.ai/api',
webSocketUrl: 'wss://dev.logframelab.ai/api/stomp'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
