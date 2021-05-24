import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  registrarUsuario(email: string, password: string, nombre: string, ciudad: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
        if (res) {
          this.registrarDatosAdicionalesUsuario(nombre, ciudad, email);
        }
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  registrarDatosAdicionalesUsuario(nombre: string, ciudad: string, correo: string) {
    this.db.collection('usuarios').doc(correo).set({
      nombre: nombre,
      ciudad: ciudad,
      correo: correo
    })
  }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
}
