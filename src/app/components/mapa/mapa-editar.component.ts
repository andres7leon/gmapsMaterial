import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.scss']
})
export class MapaEditarComponent implements OnInit {
    
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
      console.log("data",data)
      this.forma = fb.group({
        'titulo': data.titulo,
        'desc': data.desc
      })
     }

  ngOnInit() {
  }

  guardarCambios(){
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
