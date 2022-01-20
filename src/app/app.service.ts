import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  getPuppies(): Observable<string> {
    return this.http
      .get(
        'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
      )
      .pipe(map((res) => `${res} puppies`));
  }
}
