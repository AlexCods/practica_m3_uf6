import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './url';

@Injectable()
export class ChatApiService {

  constructor(private http: Http) {

  }

  getAllUsers() {
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.get(GLOBAL.url+'getAllUsers',{headers: headers})
                    .map(res => res.json());
  }

  getResumeChats(id_user) {
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.get(GLOBAL.url+'getAllResumeChats/'+id_user,{headers: headers})
                    .map(res => res.json());
  }

  getChat(sender,receiver) {
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.get(GLOBAL.url+'getChat/'+sender+'/'+receiver,{headers: headers})
                    .map(res => res.json());
  }

  getName(id_user) {
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.get(GLOBAL.url+'/getName/'+id_user,{headers: headers})
                    .map(res => res.json());
  }

  enviarMensaje(sender,receiver,message) {

    var data = {
      'sender' : sender,
      'receiver' : receiver,
      'message' : message
    }
    console.log(data);

    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(GLOBAL.url+'sendMessage',data,{headers: headers})
                    .map(res => res.json());
  }
  

}
