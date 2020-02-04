import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class AppService {
    subject = new Subject<any>();

    constructor(private http: HttpClient) {}

    get(school: string, type: string, id: number): void {
        if( school != "x" && school != "y") return; 
        if( type != "proffessors" && type != "subjects") return; 

        this.http.get(`http://schoolmanager-${school}-env.hprzrhg5ij.us-east-1.elasticbeanstalk.com/api/${type}/` + (id ? id : "list")).subscribe(response=>{
            this.subject.next(response);
        }, error=>{
            this.subject.next(error);
        });
    }

    post(school: string, type: string, body: string): void {
        if( school != "x" && school != "y") return; 
        if( type != "proffessors" && type != "subjects") return; 
        if( body === null ) return;

        this.http.post(`http://schoolmanager-${school}-env.hprzrhg5ij.us-east-1.elasticbeanstalk.com/api/${type}`, JSON.parse(body)).subscribe(response=>{
            this.subject.next(response);
        }, error=>{
            this.subject.next(error);
        });
    }

    put(school: string, type: string, id: number, body: string): void {
        if( school != "x" && school != "y") return; 
        if( type != "proffessors" && type != "subjects") return; 
        if( id === null ) return;
        if( body === null ) return;

        this.http.put(`http://schoolmanager-${school}-env.hprzrhg5ij.us-east-1.elasticbeanstalk.com/api/${type}/${id}`, JSON.parse(body)).subscribe(response=>{
            this.subject.next(response);
        }, error=>{
            this.subject.next(error);
        });
    }

    delete(school: string, type: string, id: number): void {
        if( school != "x" && school != "y") return; 
        if( type != "proffessors" && type != "subjects") return; 
        if( id === null ) return;

        this.http.delete(`http://schoolmanager-${school}-env.hprzrhg5ij.us-east-1.elasticbeanstalk.com/api/${type}/${id}`).subscribe(response=>{
            this.subject.next(response);
        }, error=>{
            this.subject.next(error);
        });
    }
}