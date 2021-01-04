import { Observable } from '@nativescript/core';
import { ImageSource } from "@nativescript/core";
import { Image } from "@nativescript/core";
import { QrGenerator } from "nativescript-qr-generator"
import { firebase } from "@nativescript/firebase";
const firebaseWebApi = require("@nativescript/firebase/app");

export class linkViewModel extends Observable {
    private _qrCode: ImageSource;

    get qrCode(): ImageSource {
        return this._qrCode;
    }

    set qrCode(value: ImageSource) {
        if (this._qrCode !== value) {
            this._qrCode = value;
            this.notifyPropertyChange('qrCode', value)
        }
    }
    constructor() {
        super();
//        this._qrCode;
        this.getQrCode();
    }
    private async getQrCode() {
        const user:firebase.User = await firebaseWebApi.auth().currentUser;
        const result = new QrGenerator().generate(`https://voicey.app/link/${user.uid}`);
        this.qrCode = new ImageSource(result);
    }
}
