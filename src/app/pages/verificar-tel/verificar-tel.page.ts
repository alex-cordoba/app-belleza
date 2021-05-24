import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-verificar-tel',
  templateUrl: './verificar-tel.page.html',
  styleUrls: ['./verificar-tel.page.scss'],
})
export class VerificarTelPage implements OnInit {
  telefono: string;

  constructor(
    private firebaseAuthentication: FirebaseAuthentication,
    public alertController: AlertController,
    private router: Router
    ) {
      this.firebaseAuthentication.onAuthStateChanged().subscribe(user => {
        if (user) {
          console.log(JSON.stringify(user));
          // this.alertController.dismiss();
          // this.router.navigate(['/registro'])
        }
      })
     }

  ngOnInit() {
    
  }
  
  public enviarMensaje() {
    this.firebaseAuthentication.verifyPhoneNumber('+57'+this.telefono.toString(), 30000).then(verificacionId => {
      this.verificarCodigo(verificacionId);
    })
  }

  async verificarCodigo(verificacionId) {
    const prompt = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingresa tu codigo',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Codigo'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (response) => {
            const smsCode = response.code;
            this.firebaseAuthentication.signInWithVerificationId(verificacionId, smsCode).then(res => alert(res))
          }
        }
      ]
    });

    await prompt.present();
  }


}
