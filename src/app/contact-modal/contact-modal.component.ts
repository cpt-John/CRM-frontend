import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css'],
})
export class ContactModalComponent {
  profileForm: FormGroup;

  @Output() sendForm: EventEmitter<any> = new EventEmitter();
  sendToParent(): void {
    this.sendForm.emit(this.profileForm.value);
  }
  closeResult = '';
  faPlus = faPlus;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      contact_name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      ph: this.fb.control('', Validators.pattern('[0-9]*')),
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
}
