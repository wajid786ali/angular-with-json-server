import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent {
  photoFile: File | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onFileChange(event: any) {
    const file = event.target.files[0];

    // Check if the file is of the allowed type (jpg or png)
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (file && allowedTypes.includes(file.type)) {
      this.photoFile = file;
      this.errorMessage = '';  // Clear error message if valid
    } else {
      this.errorMessage = 'Only JPG and PNG files are allowed.';
      event.target.value = '';  // Clear the file input
    }
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async registerEmployer(form: any) {
    if (form.valid) {
      const employerData = form.value;
      if (this.photoFile) {
        try {
          const base64Photo = await this.convertToBase64(this.photoFile);
          employerData.photo = base64Photo;
        } catch (error) {
          console.error('Error converting photo:', error);
          alert('Failed to process the photo. Please try again.');
          return;
        }
      }
      this.http.post('http://localhost:3000/employers', employerData).subscribe(
        () => {
          alert('Employer registered successfully!');
          this.router.navigate(['/employer-list']);
        },
        (error) => {
          console.error('Error Registering Employer:', error);
          alert('An error occurred while Registering the Employer.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
