import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Plugins, registerWebPlugin } from '@capacitor/core';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

// import { FacebookLoginPlugin, FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
// import { isPlatform } from '@ionic/angular'
// registerWebPlugin(FacebookLogin);



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  tokenFb = null;
  usuario = null;
  // fbLogin: FacebookLoginPlugin;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: Facebook
  ) { 
    // this.setupFbLogin();
  }

  ngOnInit() {
  }
  // async setupFbLogin() {
  //   if(isPlatform('desktop')) {
  //     console.log('entra desktop');
      
  //     this.fbLogin = FacebookLogin;
  //   } else {
  //     console.log('entra mobile');

  //     const { FacebookLogin } = Plugins;
  //     this.fbLogin = FacebookLogin;
  //   }
  // }

  // async facebookLogin() {
  //   const FACEBOOK_PERMISSIONS = ['email', 'birthday'];
  //   const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  //   console.log(result);
    
  //   if (result.accessToken && result.accessToken.userId) {
  //     this.tokenFb = result.accessToken;
  //     this.cargarDataUsuario();
  //     // Login successful.
  //     console.log(`Facebook access token is ${result.accessToken.token}`);
  //   } else if(result.accessToken && !result.accessToken.userId) {
  //     this.getCurrenToken();
  //   }
  // }
  // async getCurrenToken() {
  //   const result = await this.fbLogin.getCurrentAccessToken();
  //   if(result.accessToken) {
  //     this.tokenFb = result.accessToken;
  //     this.cargarDataUsuario();
  //   }
  // }

  // async cargarDataUsuario() {
  //   const url = `https://graph.facebook.com/${this.tokenFb.userID}?fields=id,name,picture.width(720),birthday,email&access_token=${this.tokenFb.token}`
  //   this.http.get(url).subscribe(res => {
  //     console.log(res);
      
  //     this.usuario = res;
  //   })
  // }
  // async logout() {
  //   await this.fbLogin.logout();
  //   this.usuario = null;
  //   this.tokenFb = null;
  // }

}
