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
  private posible_users = [];
  private users = [];

  constructor(private router: Router,private ChatApi: ChatApiService,private route: ActivatedRoute) { }

  ngOnInit() {

    
    if (!localStorage.getItem('user')){
      this.ir_login();
    }

    console.log(this.id_user);

    this.refreshData();
    setInterval(() => { 
        this.refreshData(); 
        
    }, 90000);
    
    
    this.route.params.subscribe(params => {
      
      
      this.id_conver = params['id'];   

      setTimeout(function() {
        var objDiv = document.getElementById("position-bottom");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 500);

    });

    this.getAllUsers();

  }

  getAllUsers(){
    this.ChatApi.getAllUsers().subscribe(
      response => {
       
        var aux = [];

        $.each(response.result, function(index,value){
          aux[value.id] = value.name;
        });
        
        this.users = aux;

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getNombreUser(id){
    
    $.each(this.users, function(index,value){

      if ( id == value[0] ) {
        return value[1];
      }

    });

  }

  refreshData(){
    //this.getToBot();
    this.getChatsUser(this.id_user);
  }

  ir_login(){
    this.router.navigate(['']);
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
        console.log(this.converses);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getToBot(){
   
      var objDiv = document.getElementById("position-bottom");
      objDiv.scrollTop = objDiv.scrollHeight;
    
  }

  abrirConver(){
    
    this.ChatApi.getAllUsers().subscribe(
      response => {
        

        if (response.state == 'OK') {

            var user = $('.abrir-conver').val();
            var html = "";
            this.posible_users = [];
            var posible_us = [];
          
            if (user == "") {

              this.posible_users = [];

            } else {
          
            $.each(response.result, function(index,value){
              
              var aux_user = user.toUpperCase();
              var aux_value = value.name.toUpperCase();

              if (aux_value.includes(aux_user)) {
                console.log('hago push');
                posible_us.push([value.id,value.name]);
                //html += '<a href="/dashboard/' + value.id + '"><li style="padding: 10px"><img class="user-image-chat" height="45px" src="assets/img/' + value.id + '.jpg">' + value.name + '</li></a>';  
              }

            });

            this.posible_users = posible_us;
            //$('.abrir-nuevo-chat').html(html);
            //$('.abrir-nuevo-chat').fadeIn();
          }

        } else {
          $('.errors').append('No se pueden cargar los usuarios');
        }
        
        
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

          setTimeout(function() {
            var objDiv = document.getElementById("position-bottom");
            objDiv.scrollTop = objDiv.scrollHeight;
          }, 500);
          
        }

      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
