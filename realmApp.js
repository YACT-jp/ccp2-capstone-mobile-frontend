import Realm from "realm";


// Invokes the shared instance of the Realm app.
const app = new Realm.App({id: process.env.REALM_APP_ID}); // Set Realm app ID here.
export default app;

