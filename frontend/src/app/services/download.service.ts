import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Download } from '../models/download.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private baseUrl = 'http://localhost:3000/api';  // Update with your backend URL

  constructor(private http: HttpClient) { }

  downloadFile(data: { url: string, times: number }): Observable<Download> {
    console.log(data);
    return this.http.post<Download>(`${this.baseUrl}/download/${data.times}`, data);
  }

  getMetadata(data: { url: string }): Observable<Download> {
    return this.http.post<Download>(`${this.baseUrl}/metadata`, data);
  }

  uploadFile(formData: FormData): Observable<any> {
    const uploadUrl = `${this.baseUrl}/upload`; // Replace with your backend endpoint for file upload
    return this.http.post(uploadUrl, formData);
  }
}
