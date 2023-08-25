import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadService } from '../../services/download.service';
import { Download } from '../../models/download.model';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  downloadForm!: FormGroup;
  metadata: any;  // This can be used to store and display the metadata after the download
  userAgent!: string;

  constructor(
    private fb: FormBuilder,
    private downloadService: DownloadService
  ) {
    // Initialize the form group here
    this.downloadForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      times: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.downloadForm.valid) {
      const url = this.downloadForm.value.url;
      const times = this.downloadForm.value.times;
      this.downloadService.downloadFile({ url, times }).subscribe(
        (response) => {
          // Handle the successful response, e.g., update the metadata table
          console.log('Successful response:', response);
          this.metadata = response.metadata;
          this.userAgent = 'Some User Agent Value';
          console.log(this.metadata);
        },
        error => {
          // Handle error response
          console.error('Error downloading the file:', error);
        }
      );
    }
  }
}
