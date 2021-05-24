import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formulario: FormGroup;
  passwordVerificado = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.formulario = this.fb.group({
      nombre: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      password: [null, [Validators.required]],
      Verifpassword: [null, [Validators.required]]
    })
  }
  public registrarUsuario() {
    const email = this.formulario.get('correo').value;
    const password = this.formulario.get('password').value;
    const nombre = this.formulario.get('nombre').value;
    const ciudad = this.formulario.get('ciudad').value;

    if (this.passwordVerificado) {
      this.authService.registrarUsuario(email, password, nombre, ciudad).then(auth => {
        //redirigir a dashboard
        console.log(auth);
      }).catch(err => console.log(err)
      )
    }
  }
  public verificarPassword() {
    console.log(this.formulario.get('Verifpassword').value);
    console.log(this.formulario.get('password').value);
    if (this.formulario.get('Verifpassword').value === this.formulario.get('password').value) {
      this.passwordVerificado = true;
    }
  }

}
