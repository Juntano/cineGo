import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { LoginService } from "../services/login/login.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [LoginService]
})
export class HomeComponent implements OnInit {

    constructor(private loginService: LoginService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.loginService.getCurrentUserProfile();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logOut(): void {
        this.loginService.logOut();
    }
}
