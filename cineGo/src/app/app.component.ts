import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouteReuseStrategy } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { LoginService } from "./services/login/login.service";
const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent implements OnInit {

    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private ngZone: NgZone) {

        firebase.init({
            onAuthStateChanged(data) {
                console.log(data);
                let view: string = "/login";
                if (data.loggedIn) {
                    view = "/home";
                }
                ngZone.run(() => {
                    routerExtensions.navigate([view], {
                        transition: {
                            name: "fade"
                        }
                    });
                });
            }
        }).then(
            (instance) => {
                console.log("firebase.init done");
            },
            (error) => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
