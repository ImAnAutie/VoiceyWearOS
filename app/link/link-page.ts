/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from '@nativescript/core';
import { linkViewModel } from './link-view-model';

import * as dialogs from "@nativescript/core/ui/dialogs";
import { firebase } from "@nativescript/firebase";
const firebaseWebApi = require("@nativescript/firebase/app");
import { firestore } from "@nativescript/firebase";
import { Frame, NavigationEntry } from "@nativescript/core/ui/frame";
import {exit} from 'nativescript-exit';

import {
    showFailure,
    showSuccess,
} from 'nativescript-wear-os/packages/dialogs';


export async function onPageLoaded(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new linkViewModel();

    const user:firebase.User = await firebaseWebApi.auth().currentUser;
    console.log(user);
    console.log(`Subscribing to auth doc`)
    const authDoc = firebaseWebApi.firestore()
        .collection("authDocs").doc(user.uid);
    const unsubscribe = authDoc.onSnapshot(async doc => {
    if (doc.exists) {
        unsubscribe();
        console.log("Document data:", JSON.stringify(doc.data()));
        if (doc.data().token) {
            const token = doc.data().token;
            console.log(`Got auth token: ${token}`);
            try {
                const signInResult = await firebaseWebApi.auth().signInWithCustomToken(token);
                const signInUser:firebase.User = signInResult.user;
                console.log(`Signed in as anoymous user: ${signInUser.uid}`);
                await showSuccess("Signed in!", 5);
            } catch (error) {
                await showFailure(error.message,5);
                exit();
            }
        } else {
            console.log("No token?");
            await showFailure(`Unexpected data from server, please try again later.`,5);
            exit();
        }
    } else {
        console.log("No such document, this is expected till sign in link");
    }
});
}
