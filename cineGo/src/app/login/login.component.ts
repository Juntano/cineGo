import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../models/user.model";
import { LoginService } from "../services/login/login.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    currentUser: User;
    isLoggingIn = true;

    constructor(private loginService: LoginService) {
        this.currentUser = new User();
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    login() {

        if (this.isLoggingIn) {
            this.loginService.login(this.currentUser);
        } else {
            this.loginService.register(this.currentUser)
                .then((message) => {
                    alert(message);
                }).then(() => {
                    this.isLoggingIn = true;
                });
        }

    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
