import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {Location} from '../model/ubicaciones';
import { SourceListMap } from 'source-list-map';

@Injectable({
  providedIn: 'root'
})
export class HereService {

  constructor(private http: HttpClient) { }

  private getLocation(query:string):Observable<any>{
    console.log(environment.hereEndPoints.autocomplete+query);
    return this.http.get(environment.hereEndPoints.autocomplete+query);
  }
  private getPosition(query:string):Observable<any>{
  console.log(environment.hereEndPoints.geocode+query);
  return this.http.get(environment.hereEndPoints.geocode+query);
  }
  private getRoute(latitudeOr: string, longitudeOr: string,latitudeDes:string, longitudeDes:string):Observable<any>{
    console.log('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&mode=fastest;car;traffic:disabled&waypoint0=geo!'+latitudeOr+','+longitudeOr+'&waypoint1=geo!'+latitudeDes+','+longitudeDes+'');
    return this.http.get('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&mode=fastest;car;traffic:disabled&waypoint0=geo!'+latitudeOr+','+longitudeOr+'&waypoint1=geo!'+latitudeDes+','+longitudeDes+'');
  }
  //callable from your page. Resolve the promise when info available, catch if error
  autoCompleteLocation(query:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.getLocation(query)
      .pipe(
        map(x =>x.suggestions)
      )
      .subscribe((json)=>{
      //tengo un array de objetos
      
        const jsonmodificado = json.filter(ciudad => ciudad.matchLevel=="city");
        const label = jsonmodificado.map(ciudad =>ciudad.label);
        console.log(label);
        resolve(label);
      })
    });
  }
  autoCompleteLocation2(query:string):Observable<any>{
    console.log(query);
    return this.getLocation(query)
      .pipe(
        map(x =>x.suggestions),
        map(memberArray => memberArray.filter(t=>{
            return t.matchLevel=="city" || t.matchLevel=="district"
          })
       ),
       map(entradas=>{
         console.log(entradas)
         let miarray:Location[]=[];
         
         for(let j=0;j<entradas.length;j++)
         {
          let ubicacion: Location = {
            location: entradas[j].label,
            locationId: entradas[j].locationId
          }
           //miarray.push(entradas[j].label)
           miarray.push(ubicacion);
         }
         console.log(miarray);
         return miarray;
         
       })
        
      )
  }
  geocoding (query:string):Observable<any>{
    let latitude:string;
    let longitude:string;
   return  this.getPosition(query)
   .pipe(
    map(x =>x.response),
    map(x =>x.view),
    map(memberArray => memberArray.map(x =>x.result.map(x=>x.location.displayPosition))),
    

    
    )
    
     
     
    
  }
  route(latitudeOr: string, longitudeOr: string,latitudeDes:string, longitudeDes:string):Observable<any>{
    return this.getRoute(latitudeOr,longitudeOr,latitudeDes,longitudeDes)
    .pipe(
      map(x=>x.response),
      map(x=>x.route)
    )
  }
}
