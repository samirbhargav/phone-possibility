import { Prediction } from './../interface/Prediction';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpResponse } from '@angular/common/http';

fdescribe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
      imports: [HttpClientTestingModule],
      providers: [
        DataService
      ]
    }
    );
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getAllPrediction', () => {
    let expectedResult: Prediction;

    beforeEach(() => {
      expectedResult = {
        data: {
          length: 2,
          value: [
            '234345M',
            '234345N',
            '234345O'
          ]
        }
      } as Prediction;
    });

    it('should return expected prediction by calling once', () => {
      service.getData('/process?phone=' + 2343455).subscribe(
        prediction => expect(prediction).toEqual(expectedResult, 'should return expected predictions'),
        fail
      );

      const req = httpTestingController.expectOne(service.serviceEndPoint + '/process?phone=' + 2343455);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedResult);
    });

    it('should return expected prediction when called multiple times', () => {
      service.getData('/process?phone=' + 2343455).subscribe();
      service.getData('/process?phone=' + 2343455).subscribe(
        prediction => expect(prediction).toEqual(expectedResult, 'should return expected employees'),
        fail
      );

      const requests = httpTestingController.match(service.serviceEndPoint + '/process?phone=' + 2343455);
      expect(requests.length).toEqual(2, 'calls to getAllEmployees()');

      requests[0].flush([]);
      requests[1].flush(expectedResult);
    });
  });
});
