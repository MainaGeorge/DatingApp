import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MemberEditComponent} from '../members/member-edit/member-edit.component';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PreventDataLossGuard implements CanDeactivate<MemberEditComponent>{
  canDeactivate(component: MemberEditComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.editForm.dirty){
      return confirm('Are you sure you want to leave? Changes made will not be saved!');
    }
    return true;
  }
}
