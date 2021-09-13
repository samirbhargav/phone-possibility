import { Prediction } from './../../interface/Prediction';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-phone-renderer',
  templateUrl: './phone-renderer.component.html',
  styleUrls: ['./phone-renderer.component.scss']
})
export class PhoneRendererComponent implements OnInit {
  form: FormGroup;
  predictionList: string[] =  [];
  spinnerFlag = false;
  page = 1;
  count = 10;
  constructor(
    private fb: FormBuilder,
    private service: DataService
    ) {
    this.form = fb.group({
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  convertData(combination: string): string {
    const value = combination.substring(0, 3) + ' ' + combination.substring(3, combination.length + 1);
    return value;
  }

  onClickToPredict(): void {
    this.spinnerFlag = true;
    if ( this.form.valid) {
      const convertValue: string =  this.form.value.phone;
      const value = convertValue.replace(/ /g, '');
      this.service.getData('process?phone=' + value).subscribe((res: Prediction) => {
        this.spinnerFlag = false;
        if (res && res.data) {
          this.predictionList = res.data.value;
        }
      });
    }
  }

}
