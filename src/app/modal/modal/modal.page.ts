import { Component, OnInit, Input } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import { flushModuleScopingQueueAsMuchAsPossible } from '@angular/core/src/render3/jit/module';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() value: number;
  mimodal: ModalPage;
  conductor;
  origen;
  destino;
  fecha;
  ganancia;
  constructor(navParams: NavParams, private modalCtrl: ModalController) {
   }

  ngOnInit() {
    console.log(this.conductor);
    console.log(this.fecha.seconds);
    console.log(this.Unix_timestamp(this.fecha.seconds));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }


   Unix_timestamp(t)
{
var dt = new Date(t*1000);
var yr = dt.getFullYear();
var mt = dt.getMonth()+1;
var dy = dt.getDate();
var hr = dt.getHours();
var m = "0" + dt.getMinutes();
var s = "0" + dt.getSeconds();
return dy+'/'+mt+'/'+yr+':'+ hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
}
}
