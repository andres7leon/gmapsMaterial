import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  
  lat = 51.678418;
  lng = 7.809007;
  marcadores: Marcador [] = [];

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador( event ){
    const coords: {lat: number, lng: number} = event.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push(nuevoMarcador);
    this.snackBar.open('Marcador Agregado', 'Cerrar',{
      duration: 4000
    });
    this.guardarStorage();
  }

  borrarMarcador(i: number){
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', {
      duration: 4000
    });
  }
  
  editarMarcador(marcador: Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.title, desc: marcador.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if( !result ){
        return;
      }
      marcador.title = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this.snackBar.open('Marcador Editado con exito', 'Cerrar', {
        duration: 4000
      });
    });
  }
  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  

}
