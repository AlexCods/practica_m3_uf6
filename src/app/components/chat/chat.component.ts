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
  private user_conver;

    ngOnInit() {

        this.refreshData();
        setInterval(() => { 
            this.refreshData(); 
        }, 500);
      
        
        setTimeout(function() {
          var objDiv = document.getElementById("position-bottom");
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 200);
      
    }

  getToBot(){
    var objDiv = document.getElementById("position-bottom");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  refreshData(){

    this.route.params.subscribe(params => {     
      this.id_conver = params['id'];   
      this.getChat(this.id_conver,this.me);
      this.getNombreById(this.id_conver);
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

  getNombreById(id_conver){

    this.ChatApi.getName(id_conver).subscribe(
      response => {
       
        this.user_conver = response.result;
        
        
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
