import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.css'],
})
export class LeadModalComponent {
  profileForm: FormGroup;

  @Output() sendForm: EventEmitter<any> = new EventEmitter();
  sendToParent(): void {
    this.sendForm.emit(this.profileForm.value);
  }
  closeResult = '';
  faPlus = faPlus;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      lead_name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      details: this.fb.control(''),
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
