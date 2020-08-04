import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//modalcomp
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">More Details</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ details }}</p>
    </div>
    <div class="modal-footer"></div>
  `,
})
export class ChildModal {
  @Input() details;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent {
  constructor(private modalService: NgbModal) {}
  open(details) {
    const modalRef = this.modalService.open(ChildModal);
    modalRef.componentInstance.details = details;
  }
}
