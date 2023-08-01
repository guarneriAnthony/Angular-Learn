import { Injectable } from '@angular/core';
import {firstValueFrom, isObservable, Observable} from "rxjs";
declare const Zone: any;
@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor() { }
  async waitForResponse<T>(promise: Promise<T>| Observable<T> ) : Promise<T>
  {
    if (isObservable(promise)){
      promise = firstValueFrom(promise)
    }

    const macroTask = Zone.current.scheduleMacroTask(`WAIT FOR-${Math.random()}`,() => {},{},() => {})

    return promise.then((p: T) => {
      macroTask.invoke()
      return p
    })
  }
}
