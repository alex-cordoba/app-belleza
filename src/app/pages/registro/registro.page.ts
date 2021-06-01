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
  patternEmail = "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"

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
      password: [null, [Validators.required, Validators.minLength(6)]],
      Verifpassword: [null, [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: [null, [Validators.required]]
    })
  }
  public registrarUsuario() {
    this.authService.tipoUsuario = true;
    console.log(this.passwordVerificado, this.formulario.valid);
    
    if (this.passwordVerificado && this.formulario.valid) {
      this.authService.registrarUsuario(this.formulario.value).then(auth => {
        //redirigir a dashboard
        console.log(auth);
      }).catch(err => console.log(err)
      )
    }
  }
  public verificarPassword() {
    if (this.formulario.get('Verifpassword').value === this.formulario.get('password').value) {
      this.passwordVerificado = true;
    }
  }

}
