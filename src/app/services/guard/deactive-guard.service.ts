import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// @Injectable();

export  interface IDeactiveGuard{
  canExit: () => boolean | Promise<boolean> | Observable<boolean>;
}

export class DeactiveGuardService implements CanDeactivate<IDeactiveGuard> {

  constructor() { }

  canDeactivate(
    component: IDeactiveGuard, 
    route: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot) : boolean | Promise<boolean> | Observable<boolean>
   {
    return component.canExit();
   }
}
