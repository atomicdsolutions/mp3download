import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadService } from '../../services/download.service';
import { Download } from '../../models/download.model';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {
  metadataForm!: FormGroup;
  metadata: any;  // This can be used to store and display the fetched metadata
  selectedFile: File = null;

  constructor(
    private fb: FormBuilder,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.metadataForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });
  }
onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
}
  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    if (this.metadataForm.valid) {
      const url = this.metadataForm.value.url;
      this.downloadService.getMetadata({ url }).subscribe(
        (response: Download) => {
          // Handle the successful response, e.g., update the metadata table
          this.metadata = response.metadata;
          console.log('Metadata:', this.metadata);
        },
        (error: any) => {
          // Handle error response
          console.error('Error fetching metadata:', error);
        }
      );
    }
  }
}
