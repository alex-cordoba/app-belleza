import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.formulario = this.fb.group({
      correo: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  public iniciarSesion() {
    const correo = this.formulario.get('correo').value;
    const password = this.formulario.get('password').value;

    this.authService.login(correo, password).then(res => {
      this.router.navigate(['/dashboard']);
    }).catch(err => console.log(err)
    )
  }
}
