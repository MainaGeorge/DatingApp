import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  values: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('https://localhost:44337/api/values').subscribe( data => {
      this.values = data;
    }, error => {
      console.log(error);
    })
  }
}
