import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'https://crmapi-john.herokuapp.com/';
  token = document.cookie.split(';')[0].split('=')[1];
  constructor(private http: HttpClient) {}
  login(bodyData): Observable<any> {
    return this.http.post(this.baseUrl + 'login', bodyData);
  }
  register(bodyData): Observable<any> {
    return this.http.post(this.baseUrl + 'register', bodyData);
  }
  verifyEmail(bodyData) {
    return this.http.post(this.baseUrl + 'verifyEmail', bodyData);
  }
  resetPassLink(bodyData) {
    return this.http.post(this.baseUrl + 'resetPassLink', bodyData);
  }
  resetPass(bodyData) {
    return this.http.post(this.baseUrl + 'resetPass', bodyData);
  }

  //get data

  getLeads() {
    return this.http.get(this.baseUrl + 'getLeads', {
      headers: { jwt: this.token },
    });
  }
  getContacts() {
    return this.http.get(this.baseUrl + 'getContacts', {
      headers: { jwt: this.token },
    });
  }
  getUsers() {
    return this.http.get(this.baseUrl + 'getUsers', {
      headers: { jwt: this.token },
    });
  }
  getServiceReqs() {
    return this.http.get(this.baseUrl + 'getServiceTickets', {
      headers: { jwt: this.token },
    });
  }

  //update data

  updateLead(bodyData) {
    return this.http.put(this.baseUrl + 'updateLead', bodyData, {
      headers: { jwt: this.token },
    });
  }
  updateUser(bodyData) {
    return this.http.put(this.baseUrl + 'updateUserRole', bodyData, {
      headers: { jwt: this.token },
    });
  }
  updateServiceReq(bodyData) {
    return this.http.put(this.baseUrl + 'updateServiceTicket', bodyData, {
      headers: { jwt: this.token },
    });
  }

  //add Data

  addLead(bodyData) {
    return this.http.post(this.baseUrl + 'addLead', bodyData, {
      headers: { jwt: this.token },
    });
  }

  addContact(bodyData) {
    return this.http.post(this.baseUrl + 'createContact', bodyData, {
      headers: { jwt: this.token },
    });
  }

  addTicket(bodyData) {
    return this.http.post(this.baseUrl + 'addServiceTicket', bodyData, {
      headers: { jwt: this.token },
    });
  }

  //delete Data

  deleteLead(id) {
    return this.http.delete(this.baseUrl + 'deleteLead', {
      headers: { jwt: this.token, id },
    });
  }

  deleteContact(id) {
    return this.http.delete(this.baseUrl + 'deleteContact', {
      headers: { jwt: this.token, id },
    });
  }

  deleteTicket(id) {
    return this.http.delete(this.baseUrl + 'deleteServiceTicket', {
      headers: { jwt: this.token, id },
    });
  }
  deleteUser(id) {
    return this.http.delete(this.baseUrl + 'deleteUser', {
      headers: { jwt: this.token, id },
    });
  }
}
