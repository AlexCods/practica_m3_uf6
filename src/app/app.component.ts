import { Component } from '@angular/core';
import { ChatApiService } from './services/chat-api.service';
import { Router } from '@angular/router';

declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatApiService]
})
export class AppComponent {
  title = 'Chat';
  

  constructor (private ChatApi: ChatApiService,private router: Router) {
    
  }

  public ir_dashboard(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(){

    var $scope = this;

    if (localStorage.getItem('user')) {
      this.ir_dashboard();
    }

  }

  

  

  
}
