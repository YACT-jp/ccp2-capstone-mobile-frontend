import Realm from 'realm';
import {APPID} from "@env";

// Invokes the shared instance of the Realm app.
const app = new Realm.App({id: APPID}); // Set Realm app ID here.
export default app;
