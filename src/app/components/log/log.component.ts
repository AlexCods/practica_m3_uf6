import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../../services/chat-api.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [ChatApiService]
})
export class LogComponent implements OnInit {

  title = 'Log In';
  
  constructor(private ChatApi: ChatApiService,private router: Router) {
    
   }

  ngOnInit() {
  }

  guardar_datos(){
    localStorage.setItem('user',$('.input-busqueda').val());
    localStorage.setItem('id_user',$('#log-in').data('id_user'));
    
    if (localStorage.getItem('user')) {
      this.ir_dashboard();
    }
    
    
  };

  public ir_dashboard(){
    this.router.navigate(['/dashboard']);
  }

  executar(){
    this.ChatApi.getAllUsers().subscribe(
      response => {

        if (response.state == 'OK') {

            var user = $('.input-busqueda').val();
            var height = $('.input-busqueda').outerHeight();
            var html = "";
          
            $.each(response.result, function(index,value){
              
              if (user.includes(value.name)) {
                html += '<img id="log-in" data-id_user="' + value.id + '" height="' + height + '" src="./assets/images/success.svg">';  
              }

            });

            $('.users-chat').html(html);
            $('.users-chat').fadeIn();

        } else {
          $('.errors').append('No se pueden cargar los usuarios');
        }
        
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
