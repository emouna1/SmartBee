import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userName: string='';
  userEmail: string='';
  password: string='';
  repeatPassword: string='';
  agreeTerms: boolean=true;

  accounts: any[] = [];

  // Variables to manage account editing
  editAccountId: number | null = null;
  editAccount: any = {};

  constructor(private accountService: AuthService) {} // Inject the service

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts; // Assign the retrieved accounts to the local array
      },
      error: (error) => {
        console.error('Failed to load accounts:', error);
      }
    });
  }

  addAccount(id: number, name: string, family_name: string, email: string, password: string, permission_key: string): void {
    console.log('Adding account:', name, family_name, email); // Log input values

    if (name.trim() === '' || family_name.trim() === '' || email.trim() === '' || password.trim() === '' || permission_key.trim() === '') {
      console.log('Fields cannot be empty');
      return;
    }

    const newAccount = {
      id: id,
      name: name,
      family_name: family_name,
      email: email,
      password: password,
      permission_key: permission_key
    };

    console.log('New account object:', newAccount); // Log new account object before sending

    this.accountService.registerUser(newAccount).subscribe({
      next: (response) => {
        console.log('Account added successfully:', response); // Log successful response
        this.accounts.push(response); // Assuming the server responds with the added account
        this.resetAccountForm(); // Reset the form after adding
      },
      error: (error) => {
        console.error('Failed to add account:', error); // Log error response
      }
    });
  }

  updateAccount(): void {
    // Find the account to update in the local array
    const index = this.accounts.findIndex(account => account.id === this.editAccountId);
    if (index !== -1) {
      this.accountService.updateAccount(this.editAccount).subscribe({
        next: (response) => {
          this.accounts[index] = this.editAccount; // Update the local array after a successful update
          this.resetEditAccountForm(); // Reset the edit form after update
        },
        error: (error) => {
          console.error('Failed to update account:', error);
        }
      });
    }
  }

  deleteAccount(account: any): void {
    const index = this.accounts.indexOf(account);
    if (index !== -1) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this account!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.accountService.deleteAccount(account.id).subscribe({
            next: (response) => {
              this.accounts.splice(index, 1);
              Swal.fire('Deleted!', 'The account has been deleted.', 'success');
            },
            error: (error) => {
              console.error('Failed to delete account:', error);
              Swal.fire('Error', 'Failed to delete account', 'error');
            }
          });
        }
      });
    }
  }

  editAccountForm(id: number): void {
    this.editAccountId = id;
    // Find the account to edit in the local array
    const account = this.accounts.find(account => account.id === id);
    if (account) {
      // Copy the account information to the edit object
      this.editAccount = { ...account };
    }
  }

  resetAccountForm(): void {
    // Implement the reset logic here if needed
  }

  resetEditAccountForm(): void {
    this.editAccountId = null;
    this.editAccount = {};
  }
}
