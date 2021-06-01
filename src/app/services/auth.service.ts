import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from "@ionic/angular";
import firebase from "@firebase/app";
import "@firebase/auth";
import { BehaviorSubject } from 'rxjs';
// import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tipoUsuario: boolean;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fb: Facebook,
    private platform: Platform,
    private zone: NgZone
  ) { }

  init(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyDXl8qbSy9D4KOq8I9lc_p_ckHnJ4Qol74",
      authDomain: "app-belleza.firebaseapp.com",
      projectId: "app-belleza",
      storageBucket: "app-belleza.appspot.com",
      messagingSenderId: "383879460168",
      appId: "1:383879460168:web:9001c92c793631243d6f7d",
      measurementId: "G-JS32SB045X"
    }
    firebase.initializeApp(firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }
  PlataformaloginFB(): void {
    if (this.platform.is("capacitor")) {
      this.nativeFacebookAuth();
    } else {
      this.browserFacebookAuth();
    }
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.fb.login(["public_profile", "email"]);

      console.log(response);

      if (response.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(response.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                console.log(error);
              });
          } else {
            // User is already signed-in Firebase with the correct user.
            console.log("already signed in");
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  private  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }

  public registrarUsuario(form) {
    console.log(form);
    
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(form.correo, form.password).then(res => {
        if (res) {
          if (this.tipoUsuario) {
            console.log('entra a registrar usuario');
            
            this.registrarDatosAdicionalesUsuario(form);
          } else {
            console.log('entra a registrar prof');

            this.registrarDatosAdicionalesProfesional(form);
          }
        }
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  private registrarDatosAdicionalesUsuario(form) {
    this.db.collection('usuarios').doc(form.correo).set({
      nombre: form.nombre,
      ciudad: form.ciudad,
      correo: form.correo
    })
  }
  private registrarDatosAdicionalesProfesional(form) {
    this.db.collection('profesionales').doc(form.correo).set({
      nombre: form.nombre,
      ciudad: form.ciudad,
      correo: form.correo,
      fechaNacimiento: form.fechaNacimiento,
      id: form.numeroIdentificacion,
      tipoId: form.idIdentificacion
    })
  }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  // loginConFacebook() {
  //   this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
  //     // const credencialFb = auth.face
  //   })
  // }
}
