import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/services/data.service';

import { PhoneRendererComponent } from './phone-renderer.component';

fdescribe('PhoneRendererComponent', () => {
  let component: PhoneRendererComponent;
  let fixture: ComponentFixture<PhoneRendererComponent>;
  let service: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let inputElement: DebugElement;
  let btnElement: DebugElement;
  let listElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        MatListModule,
        MatCardModule
      ],
      declarations: [ PhoneRendererComponent ],
      providers: [DataService]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneRendererComponent);
    component = fixture.componentInstance;
    btnElement = fixture.debugElement.query(By.css('button'));
    inputElement = fixture.debugElement.query(By.css('input[type=text]'));
    listElement = fixture.debugElement.query(By.css('mat-selection-list'));
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
  it('phone field validity', () => {
    expect(component.form.controls.phone.valid).toBeFalsy();
  });

  it('phone require field validity', () => {
    expect(component.form.controls.phone?.errors?.required).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
