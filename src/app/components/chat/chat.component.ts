import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatApiService } from '../../services/chat-api.service';

declare var $:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatApiService]
})


export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute,private ChatApi: ChatApiService) { }

  private id_conver;
  private me = localStorage.getItem('id_user');
  public conver;

    ngOnInit() {
        this.refreshData();
        setInterval(() => { 
            this.refreshData(); 
        }, 500);
    }

  refreshData(){

    this.route.params.subscribe(params => {     
      this.id_conver = params['id'];   
      this.getChat(this.id_conver,this.me);
    });

  }

  getChat(sender,receiver){
    
    this.ChatApi.getChat(sender,receiver).subscribe(
      response => {
       
        this.conver = response.result;
        
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
