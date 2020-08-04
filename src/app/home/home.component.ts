import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('detailsChild') detailsChild: DetailsModalComponent;

  requesting;
  profileForm: FormGroup;
  userData = {};
  details = 'sfxdxgf';
  data = { leads: [], contacts: [], tickets: [], users: [] };
  roles = {
    1: 'Admin',
    2: 'Manager',
    3: 'Employee_lvl_2',
    4: 'Employee_lvl_1',
    5: 'Not Yet Admitted',
  };
  isOpen = false;
  tableNo = 0;
  closeResult = '';
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private service: DataService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      url: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getData();
    this.userData = JSON.parse(window.localStorage.getItem('userData'));
  }

  showDetails(details) {
    this.detailsChild.open(details);
  }

  // navbar
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
  setTable(i) {
    this.tableNo = i;
  }
  logout() {
    document.cookie = 'jwt=;';
    this.service.token = '';
    this._router.navigate(['/login']);
    this.toastr.warning('Logged Out!');
  }

  getData() {
    this.getLeads();
    this.getContacts();
    this.getTickets();
    this.getUsers();
  }

  getLeads() {
    this.service.getLeads().subscribe(
      (responce) => {
        this.requesting = false;
        console.log(responce);
        this.data.leads = responce['results'];
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }
  getContacts() {
    this.service.getContacts().subscribe(
      (responce) => {
        this.requesting = false;
        console.log(responce);
        this.data.contacts = responce['results'];
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  getTickets() {
    this.service.getServiceReqs().subscribe(
      (responce) => {
        this.requesting = false;
        console.log(responce);
        this.data.tickets = responce['results'];
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }
  getUsers() {
    this.service.getUsers().subscribe(
      (responce) => {
        this.requesting = false;
        console.log(responce);
        this.data.users = responce['results'];
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        // this.toastr.error(error['error']['message']);
      }
    );
  }

  updateLead(status, cur_stat, lead_id) {
    if (status == cur_stat) return;
    this.service.updateLead({ lead_id, status }).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getLeads();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  updateTicket(status, cur_stat, ticket_id) {
    if (status == cur_stat) return;
    this.service.updateServiceReq({ ticket_id, status }).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getTickets();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  updateUser(role, cur_stat, user_id) {
    if (role == cur_stat) return;
    this.service.updateUser({ user_id, role }).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getUsers();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  addLead(bodyData) {
    bodyData['status'] = 'new';
    this.service.addLead(bodyData).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getLeads();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  addContact(bodyData) {
    this.service.addContact(bodyData).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getContacts();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  addTicket(bodyData) {
    bodyData['status'] = 'created';
    this.service.addTicket(bodyData).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.success(responce['message']);
        this.getTickets();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  deleteLead(id) {
    if (!confirm('Are you sure you want to delete?')) return;
    this.service.deleteLead(id).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.warning(responce['message']);
        this.getLeads();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  deleteContact(id) {
    if (!confirm('Are you sure you want to delete?')) return;
    this.service.deleteContact(id).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.warning(responce['message']);
        this.getContacts();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }
  deleteTicket(id) {
    if (!confirm('Are you sure you want to delete?')) return;
    this.service.deleteTicket(id).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.warning(responce['message']);
        this.getTickets();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }

  deleteUser(id) {
    if (!confirm('Are you sure you want to delete?')) return;
    this.service.deleteTicket(id).subscribe(
      (responce) => {
        this.requesting = false;
        this.toastr.warning(responce['message']);
        this.getUsers();
      },
      (error) => {
        console.log(error);
        if (!error['error']['message']) {
          this.toastr.error('Network Error!');
          return;
        }
        console.log(error['error']['message']);
        this.toastr.error(error['error']['message']);
      }
    );
  }
}
