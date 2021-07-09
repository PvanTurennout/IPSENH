import {MatDialog} from '@angular/material/dialog';
import {WarningDialogComponent} from '../../shared/dialogs/warning-dialog.component';
import {NGXLogger} from 'ngx-logger';

export function handleHttpErrors(err: any, logger: NGXLogger): string {
  let errorMessage = 'Error';

  if (!err.status) {
    logger.error(err);
    return errorMessage;
  }

  switch (err.status){
    case 400:
      logger.debug(err);
      errorMessage = returnMessageIfNotEmpty(err.error.message, true);
      break;
    case 404:
      logger.debug(err);
      errorMessage = returnMessageIfNotEmpty(err.error.message, false);
      break;
    case 409:
      logger.debug(err);
      errorMessage = 'Duplicate Error';
      break;
    case 500:
      logger.error(err);
      errorMessage = 'Server Error';
      break;
  }

  return errorMessage;
}

function returnMessageIfNotEmpty(message: string, fourOO: boolean): string {
  if (message){
    return message;
  }

  if (fourOO) {
    return 'Invalid Data!';
  } else {
    return 'Not Found';
  }
}

export function displayHttpError(message: string, dialog: MatDialog): void {
  dialog.open(WarningDialogComponent, {data: {warningMessage: message}});
}
