import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  config = {
    apiBaseURL : 'http://localhost:3000'
}
}
