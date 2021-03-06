import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DocumentTypeService {
	constructor(public userService: UserService, public http: HttpClient) {}

	getTypes() {
		let url = URL_SERVICIOS + '/document-type';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions).pipe(
			map(res => {
				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}
}
