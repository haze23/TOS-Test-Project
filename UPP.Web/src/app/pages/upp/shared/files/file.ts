import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';

export interface DownloadFileDTO {
  fileName: string;
  filePath: string;
}
export function requiredFileType(type: string, file: File) : boolean {
  if (file) {
    const extension = file.name.split('.')[1].toLowerCase();
    if (type.toLowerCase() !== extension.toLowerCase()) {
      return false;
    }
    else{
      return true;
    }
  }else{
    throw new Error('Parameter file cannot be null or undefined');
  }
}
