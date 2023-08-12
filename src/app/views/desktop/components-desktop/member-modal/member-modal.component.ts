import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
  }

}
