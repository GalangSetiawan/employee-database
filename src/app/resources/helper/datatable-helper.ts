import { ObjectHelper } from "./object-helper";
import { TranslateService } from "@ngx-translate/core";
import { GaResponse } from '@gaji1/app/gaji-id-resources/gaji-id-api-response.model';
import { FormArray, FormControl } from "@angular/forms";
import { ContentAlertService } from '@gaji1/app/components/messages/alerts/content-alert/content-alert.service';
import * as _ from 'lodash';

export class DatatableColumn {
  type: 'text' | 'number' | 'date' | 'checkbox' | 'dropdown' | 'autocomplete' | 'yearmonth' | 'slidetoggle' | 'string';
  field: string;
  header: string;
  width: string;
  dataType?: string;
  fieldObj?: any;
  orderNumber?: number;
  translate?: boolean;
}

export class DatatableHelper {

  public static readonly ERRORS_DATA_KEY = 'errors';
  public static readonly WARNINGS_DATA_KEY = 'warnings';
  public static readonly DEFAULT_COMPARISON_KEY = 'id';
  public static readonly DEFAULT_DATA_KEY = 'data';
  public static readonly DEFAULT_METADATA_KEY = 'metadata';
  public static readonly DEFAULT_ERROR_NAME = 'errorDefaultName';
  public static readonly DEFAULT_FORM_ARRAY_ERROR_KEY_NAME = 'errors';
  public static readonly PRS_ABS_ERRORS_CODE = [
    'ERROR_001_TIDAK_ADA_JADWAL',
    'WARNING_403_KEHADIRAN_DI_LUAR_JADWAL',
    'WARNING_404_KEHADIRAN_MASUK_TIDAK_ADA',
    'WARNING_405_KEHADIRAN_PULANG_TIDAK_ADA',
    'ERROR_401_KEHADIRAN_DI_JADWAL_CUTI_TUGAS',
    'ERROR_203_OVERLAP_ANTAR_SURAT',
    'ERROR_201_CUTI_FD_ADA_SURAT_LAIN',
    'ERROR_202_TUGAS_KELUAR_FD_ADA_SURAT_LAIN',
    'ERROR_103_IZIN_DILUAR_JADWAL_MASUK',
    'ERROR_107_TUGAS_MASUK_BUKAN_JADWAL_OFF_PH',
    'ERROR_301_JADWAL_SURAT_TANPA_SURAT',
    'ERROR_101_CUTI_TIDAK_SESUAI_JADWAL',
    'ERROR_105_TUGAS_KELUAR_TIDAK_SESUAI_JADWAL',
    'WARNING_401_KEHADIRAN_TIDAK_ADA',
    'WARNING_402_KEHADIRAN_TIDAK_DIPERLUKAN',
    'ERROR_102_CUTI_OVERLAP',
    'ERROR_104_IZIN_OVERLAP',
    'ERROR_106_TUGAS_KELUAR_OVERLAP',
    'ERROR_108_TUGAS_MASUK_OVERLAP',
    'ERROR_109_SPL_PADA_JAM_KERJA',
    'ERROR_110_SPL_OVERLAP',
  ];


  public static setErrors(
    displayedDataArr: any[],
    errorsArr: GaResponse<any>,
    translateService: TranslateService,
    errorDefaultName: string = this.DEFAULT_ERROR_NAME,
    metadataKey: string = this.DEFAULT_METADATA_KEY,
    errorsDataKey: string = this.ERRORS_DATA_KEY
  ) {
    if (!ObjectHelper.isEmpty(errorsArr.multiErrors)) {
      if (!ObjectHelper.isEmpty(errorsArr.multiErrors) ? errorsArr.multiErrors instanceof Array : false) {
        for (const errorArr of errorsArr.multiErrors!) {
          if (errorArr['name'] === errorDefaultName) {
            for (let j = 0; j < displayedDataArr.length; j++) {
              for (let k = 0; k < errorArr['messages'].length; k++) {
                if (j === k) {
                  const translatedErrors:any[] = [];
                  for (const error of errorArr['messages'][k]) {

                    if (error.args) {
                      translateService.get(error.code, error.args).subscribe(
                        (translated) => {
                          if (translated === 'Translation / message not found') {
                            translatedErrors.push(error.code);
                          }
                          else {
                            translatedErrors.push(translated);
                          }
                        }
                      );
                    } else {
                      translateService.get(error.code, error.args).subscribe(
                        (translated) => {
                          if (translated === 'Translation / message not found') {
                            translatedErrors.push(error.code);
                          }
                          else {
                            translatedErrors.push(translated);
                          }
                        }
                      );
                    }
                  }
                  if (!ObjectHelper.isEmpty(displayedDataArr[j][metadataKey])) {
                    displayedDataArr[j][metadataKey][errorsDataKey] = translatedErrors;
                  }
                  else {
                    displayedDataArr[j][metadataKey] = {
                      errorsDataKey: []
                    };
                    displayedDataArr[j][metadataKey][errorsDataKey] = translatedErrors;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  
  public static setErrorsGridByRecordIdAsLastArgsNotMultiBatchError(
    displayedDataArr: any[],
    errorsArr: GaResponse<any>,
    contentAlertService: ContentAlertService,
    translateService: TranslateService,
  ) {
    if (!ObjectHelper.isEmpty(errorsArr.errors)) {
      
      let anyGridError = false;


      displayedDataArr.forEach(dataGrid => {
        var recordId:any = null;
        const translatedErrors:any[] = [];
        errorsArr.errors?.forEach(error => {
          if(!ObjectHelper.isEmpty(error.args)){
            
            var countLengthArgs = error.args?.length;
            if(countLengthArgs! > 0){
              recordId = error.args![countLengthArgs!-1];

              if(recordId == dataGrid.recordId){
                anyGridError = true;
                translateService.get(error.code, error.args).subscribe(
                  (translated) => {
                    if (translated === 'Translation / message not found') {
                      translatedErrors.push(error.code);
                    }
                    else {
                      translatedErrors.push(translated);
                    }
                  }
                );
              }

            }
            dataGrid.errors = translatedErrors;
          }
        });
      });

      if (anyGridError) {
        contentAlertService.error({ code: 'data.detail.error' });
      } else {
        contentAlertService.error(errorsArr);
      }
      
    }
  }

  public static setErrorsGridByRecordIdAsLastArgsIsMultiBatchError(
    displayedDataArr: any[],
    errorsArr: GaResponse<any>,
    contentAlertService: ContentAlertService,
    translateService: TranslateService,
    errorDefaultName: string = this.DEFAULT_ERROR_NAME,
    metadataKey: string = this.DEFAULT_METADATA_KEY,
    errorsDataKey: string = this.ERRORS_DATA_KEY
  ) {

    let anyGridError = false;


    if (!ObjectHelper.isEmpty(errorsArr.multiErrors)) {
      if (!ObjectHelper.isEmpty(errorsArr.multiErrors) ? errorsArr.multiErrors instanceof Array : false) {
        for (const errorArr of errorsArr.multiErrors!) {
          if (errorArr['name'] === errorDefaultName) {


            for (let j = 0; j < displayedDataArr.length; j++) {
              for (let k = 0; k < errorArr['messages'].length; k++) {

                const translatedErrors:any[] = [];
                  for (const error of errorArr['messages'][k]) {

                    var recordId:any = null;
                    if(!ObjectHelper.isEmpty(error.args)){

                      error.args!.map(arg => {
                        if (this.PRS_ABS_ERRORS_CODE.indexOf(arg) > 0) {
                          translateService.get(arg).subscribe(
                            (translatedError) => {
                            error.args![error.args!.indexOf(arg)] = translatedError;
                            }
                          );
                        }
                      });
                      
                      var countLengthArgs = error.args?.length;
                      if(countLengthArgs! > 0){
                        recordId = error.args![countLengthArgs!-1];

                        var findErrorRow  = displayedDataArr.findIndex(x=> x.recordId == recordId);


                        if(findErrorRow != -1){
                          anyGridError = true;
                          translateService.get(error.code, error.args).subscribe(
                            (translated) => {
                              if (translated === 'Translation / message not found') {
                                translatedErrors.push(error.code);
                              }
                              else {
                                translatedErrors.push(translated);
                              }
                            }
                          );

                          displayedDataArr[findErrorRow].multiErrors = errorArr;
                          displayedDataArr[findErrorRow][metadataKey][errorsDataKey] = translatedErrors;
                          displayedDataArr[findErrorRow].errors = translatedErrors;

                        }
                      }
                    }
                  }
              }
            }

            
          }
        }
      }
    }


    if (anyGridError) {
      contentAlertService.error({ code: 'data.detail.error' });
    } else {
      contentAlertService.error(errorsArr);
    }
  }

  public static setErrorsGridByRecordIdAsLastArgs(
    displayedDataArr: any[],
    errorsArr: GaResponse<any>,
    contentAlertService: ContentAlertService,
    translateService: TranslateService
  ) {
    if(errorsArr.hasOwnProperty('multiErrors')){
      if(!ObjectHelper.isEmpty(errorsArr.multiErrors)){
        this.setErrorsGridByRecordIdAsLastArgsIsMultiBatchError(displayedDataArr,errorsArr,contentAlertService,translateService)
      }
      if((errorsArr.hasOwnProperty('errors'))){
        if(!ObjectHelper.isEmpty(errorsArr.errors)){
          this.setErrorsGridByRecordIdAsLastArgsNotMultiBatchError(displayedDataArr,errorsArr,contentAlertService,translateService)
        }
      }
    }else{
      this.setErrorsGridByRecordIdAsLastArgsNotMultiBatchError(displayedDataArr,errorsArr,contentAlertService,translateService)
    }

  }

  public static getErrors(
    errorsArr: GaResponse<any>,
    translateService: TranslateService,
    errorDefaultName: string = this.DEFAULT_ERROR_NAME): string[][] {
    const displayedDataArr = [];

    if (!ObjectHelper.isEmpty(errorsArr.multiErrors)) {
      if (!ObjectHelper.isEmpty(errorsArr.multiErrors) ? errorsArr.multiErrors instanceof Array : false) {
        for (const errorArr of errorsArr.multiErrors!) {
          if (errorArr['name'] === errorDefaultName) {
            for (let j = 0; j < errorArr['messages'].length; j++) {
              const translatedErrors:any[] = [];
              for (const error of errorArr['messages'][j]) {
                if (error.args) {
                  translateService.get(error.code, error.args).subscribe(
                    (translated) => {
                      if (translated === 'Translation / message not found') {
                        translatedErrors.push(error.code);
                      }
                      else {
                        translatedErrors.push(translated);
                      }
                    }
                  );
                } else {
                  translateService.get(error.code, error.args).subscribe(
                    (translated) => {
                      if (translated === 'Translation / message not found') {
                        translatedErrors.push(error.code);
                      }
                      else {
                        translatedErrors.push(translated);
                      }
                    }
                  );
                }
              }
              displayedDataArr[j] = translatedErrors;
            }
          }
        }
      }
    }
    return displayedDataArr;
  }

  public static setCustomFormArrayErrors(formArrays: FormArray, errors: any[], formArrayErrorKey: string = this.DEFAULT_FORM_ARRAY_ERROR_KEY_NAME) {
    if (formArrays === null || errors === null) {
      return;
    }

    formArrays.controls.forEach((item, index) => {
      if (!ObjectHelper.isEmpty(errors[index])) {
        item.get(formArrayErrorKey)!.setValue(errors[index]);
      }
    });
  }

  public static isError(
    displayedDataArr: any[],
    metadataKey: string = this.DEFAULT_METADATA_KEY,
    errorsDataKey: string = this.ERRORS_DATA_KEY
  ): boolean {
    for (const displayedData of displayedDataArr) {
      if (!ObjectHelper.isEmpty(displayedData[metadataKey]) && !ObjectHelper.isEmpty(displayedData[metadataKey][errorsDataKey])) {
        return true;
      }
    }

    return false;
  }

  public static clearFormArrayErrors(formArrays: FormArray, formArrayErrorKey: string = this.DEFAULT_FORM_ARRAY_ERROR_KEY_NAME, values: any[] = []): void {
    if (formArrays) {
      for (const control of formArrays.controls) {
        if (control.get(formArrayErrorKey)) {
          control.get(formArrayErrorKey)!.setValue(values);
        }
      }
    }
  }

  public static isErrorFormArray(
    formArrays: FormArray,
    formArrayErrorKey: string = this.DEFAULT_FORM_ARRAY_ERROR_KEY_NAME
  ): boolean {
    if (formArrays) {
      for (const control of formArrays.controls) {
        if (control.get(formArrayErrorKey) && control.get(formArrayErrorKey)!.value) {
          for (const displayedData of control.get(formArrayErrorKey)!.value) {
            if (!ObjectHelper.isEmpty(displayedData)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}


