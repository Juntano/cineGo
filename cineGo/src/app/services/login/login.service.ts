import { Injectable, NgZone } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { FirebaseCustomLoginOptions } from "nativescript-plugin-firebase";
import { Observable } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { User } from "../../models/user.model";

@Injectable()
export class LoginService {
    async register(user: User): Promise<firebase.User> {
        try {
            const result = await firebase.createUser({
                email: user.email,
                password: user.password
            });

            return result;
        } catch (error) {
            return error;
        }
    }

    async login(user: User) {
        try {
            const result = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: user.email,
                    password: user.password
                }
            });

            return result;
        } catch (error) {
            return error;
        }
    }

    logOut() {
        firebase.logout();
    }

    // async getCurrentUser(): Promise<firebase.User> {
    //     try {
    //         const result = await firebase.getCurrentUser();

    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }
    myAccountChanged(result) {
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
    }

    async getCurrentUserProfile(): Promise<any> {
        await firebase.getCurrentUser().then((user) => {
            console.log(user);
        });
        firebase.addChildEventListener(this.myAccountChanged, `/accounts`);
    }
}
