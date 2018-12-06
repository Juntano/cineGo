import { Injectable, NgZone } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { User } from "../../models/user.model";

@Injectable()
export class LoginService {
    constructor(
        private ngZone: NgZone
    ) {

    }

    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then((userCreated) => {
            return "Account successfully created !";
        }, (errorMessage) => {
            console.log("errorMessage", errorMessage);
            return "errorMessage";
        }
        );
    }

    login(user: User) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then((result: any) => {
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }

}
