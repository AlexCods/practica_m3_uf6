import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { ChatApiService } from '../../services/chat-api.service';
import { Conversa } from '../../classes/conversa';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute } from '@angular/router';



declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ChatApiService,ChatComponent]
})
export class DashboardComponent implements OnInit {

  private user = localStorage.getItem('user');
  private id_user = localStorage.getItem('id_user');
  public converses = [];
  public id_conver;

  constructor(private router: Router,private ChatApi: ChatApiService,private route: ActivatedRoute) { }

  ngOnInit() {

    
    if (!localStorage.getItem('user')){
      this.ir_login();
    }

    console.log(this.id_user);

    this.refreshData();
    setInterval(() => { 
        this.refreshData(); 
    }, 1000);
    
    
    this.route.params.subscribe(params => {
      
      this.id_conver = params['id'];   

    });


  }

  refreshData(){
    this.getChatsUser(this.id_user);
  }

  ir_login(){
    this.router.navigate(['']);
  }

  hola(){
    console.log('hola');
  }

  getChatsUser(id_user){
    
    this.ChatApi.getResumeChats(id_user).subscribe(
      response => {
       var test = [];
        $.each(response.result, function(index,value){
          
          var conv = new Conversa(value.sender,value.receiver,value.message,value.date);
          test.push(conv);
          //$('.chats-abiertos').append(value.message);
        });

        this.converses = test;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  enviarMensaje(){

    var mensaje = $('.mensaje').val();

    this.ChatApi.enviarMensaje(this.id_user,this.id_conver,mensaje).subscribe(
      response => {
     
        if (response.state == 'OK') {
          $('.mensaje').val('');
        }

      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
