import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Observable } from "rxjs";

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let sessionService = inject(SessionService);

    if (!sessionService.isLogged) {
        return next(req)
    }

    console.log(sessionService.isLogged)

    const headers = new HttpHeaders({
        Authorization: `Bearer ${sessionService.sessionInformation!.token}`
    });

    const newReq = req.clone({
        headers
    })
    console.log("headers " + headers)
    console.log("body " + newReq.body)
    return next(newReq)

}