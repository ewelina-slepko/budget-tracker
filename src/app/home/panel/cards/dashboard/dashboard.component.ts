import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent {

}
