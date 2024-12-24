export function formData(data: any): FormData {
  const frmData: FormData = new FormData();

  for (let key in data) {
    frmData.set(key, data[key]);
  }

  return frmData;
}

// if(typeof this.branchForm.value['img'] =='string'){
//   this.branchForm.patchValue({img:undefined})
// }
