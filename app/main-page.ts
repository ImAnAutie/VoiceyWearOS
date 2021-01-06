/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

import * as dialogs from "@nativescript/core/ui/dialogs";
import { firebase } from "@nativescript/firebase";
const firebaseWebApi = require("@nativescript/firebase/app");
import {exit} from 'nativescript-exit';
import { Frame, NavigationEntry } from "@nativescript/core/ui/frame";

import {
    showFailure,
    showSuccess,
} from 'nativescript-wear-os/packages/dialogs';

const displayLinkQr = async function(page:Page) {
    console.log("Switching to link account page");
    try {
    let navEntryWithContext: NavigationEntry = {
        moduleName: "link/link-page",
    };
    Frame.topmost().navigate(navEntryWithContext);
} catch (error) {
    console.log("Error navigating")
    console.log(error);
}
}
// Event handler for Page 'onPageLoaded' event attached in main-page.xml
export async function onPageLoaded(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    const user:firebase.User = await firebaseWebApi.auth().currentUser;
    if (user) {
        if (user.isAnonymous) {
            console.log("Authenticated as anonymous user, need to link");
            displayLinkQr(page);
        } else {
            console.log(`Authenticated as user: ${user.uid}`);
        }
     } else {
        await dialogs.alert("Unauthenticated, signing in as anonymous");
        try {
            const anonUserResult = await firebaseWebApi.auth().signInAnonymously();
            const anonUser:firebase.User = anonUserResult.user;
            console.log(`Signed in as anoymous user: ${anonUser.uid}`);
            displayLinkQr(page);
        } catch (error) {
            console.log(error);
            await showFailure(`Sorry, there was a problem signing in.
                message: ${error.message}`,5);
            exit();
        }
    }
}
