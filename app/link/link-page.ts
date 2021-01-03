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
import {exit} from 'nativescript-exit';
import { Frame, NavigationEntry } from "@nativescript/core/ui/frame";

import {
    showFailure,
    showSuccess,
} from 'nativescript-wear-os/packages/dialogs';


export async function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new linkViewModel();
    //const user:firebase.User = await firebaseWebApi.auth().currentUser;
}
