import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
	selector: 'app-modal-upload',
	templateUrl: './modal-upload.component.html',
	styles: [],
})
export class ModalUploadComponent implements OnInit {
	imagenSubir: File;
	imagenTemp: string | ArrayBuffer;
	constructor(
		public subirArchivoService: SubirArchivoService,
		public modalUploadService: ModalUploadService
	) {}

	ngOnInit(): void {}

	seleccionImagen(archivo: File) {
		if (!archivo) {
			this.imagenSubir = null;
			return;
		}

		if (archivo.type.indexOf('image') < 0) {
			Swal.fire({
				title: 'No es una imagen',
				text: 'El archivo no es una imagen',
				icon: 'error',
			});
			this.imagenSubir = null;
			return;
		}

		this.imagenSubir = archivo;

		let reader = new FileReader();
		let urlImagenTemp = reader.readAsDataURL(archivo);

		reader.onloadend = () => (this.imagenTemp = reader.result);
	}

	subirImagen() {
		this.subirArchivoService
			.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
			.then(res => {
				this.modalUploadService.notificacion.emit(res);
				this.cerrarModal();
			})
			.catch(err => {
				console.log('Error en la carga...');
			});
	}

	cerrarModal() {
		this.imagenTemp = null;
		this.imagenSubir = null;

		this.modalUploadService.ocultarModal();
	}
}
