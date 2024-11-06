
<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/595d8118-e3e4-48a0-ab91-1e181ead8217" height="120" alt="anime-yes"/>
    </td>
    <td style="vertical-align: middle;">
      <h5>Nama: Muhamad Galih</h5>
      <h5>NIM: H1D022052</h5>
      <h5>Shift: E (Baru)</h5>
    </td>
  </tr>
</table>



# 📘 Daftar Isi

1. [🔐 Penjelasan Detail Proses Login](#-penjelasan-detail-proses-login)
   - [🔄 Flowchart Login](#-flowchart-login)
2. [📜 Langkah-langkah Proses Login](#-langkah-langkah-proses-login)
   - [1. Deklarasi HTTP Client](#1-deklarasi-http-client)
   - [2. Form Login](#2-form-login)
   - [3. Pengiriman Data Login](#3-pengiriman-data-login)
   - [4. Penyimpanan Token Autentikasi](#4-penyimpanan-token-autentikasi)
   - [5. Redirection ke Halaman Home](#5-redirection-ke-halaman-home)
   - [6. Proteksi Halaman dengan Guard](#6-proteksi-halaman-dengan-guard)

---

## 🔐 Penjelasan Detail Proses Login

Pada aplikasi ini, proses login menghubungkan pengguna dengan API untuk verifikasi akun dan menyimpan status autentikasi secara lokal. Berikut langkah-langkah rinci proses login yang terjadi dalam kode:

1. **Deklarasi HTTP Client**: Pada file `app.module.ts`, HTTP Client diaktifkan untuk berinteraksi dengan API, memungkinkan pengiriman permintaan autentikasi.
   ```typescript
   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient()],
   ```

2. **Form Login**: Di `login.page.html`, terdapat form login dengan input untuk `username` dan `password` serta tombol "Login". Pengguna mengisi form ini untuk memulai proses autentikasi.
   ```html
   <ion-input type="text" [(ngModel)]="username" required="required"></ion-input>
   <ion-input type="password" [(ngModel)]="password" required="required"></ion-input>
   ```

3. **Pengiriman Data Login**: Ketika tombol login ditekan, fungsi `login()` di `login.page.ts` akan dipanggil. Fungsi ini memeriksa apakah `username` dan `password` tidak kosong, kemudian mengirimkan data tersebut ke API melalui metode `postMethod()` dari `AuthenticationService`.
   ```typescript
   login() {
       if (this.username && this.password) {
           const data = { username: this.username, password: this.password };
           this.authService.postMethod(data, 'login.php').subscribe({
               next: (res) => {
                   if (res.status_login == "berhasil") {
                       this.authService.saveData(res.token, res.username);
                       this.router.navigateByUrl('/home');
                   } else {
                       this.authService.notifikasi('Username atau Password Salah');
                   }
               },
               error: () => this.authService.notifikasi('Login Gagal Periksa Koneksi Internet Anda')
           });
       } else {
           this.authService.notifikasi('Username atau Password Tidak Boleh Kosong');
       }
   }
   ```

4. **Penyimpanan Token Autentikasi**: Jika API mengembalikan respons sukses (`status_login == "berhasil"`), maka token dan username disimpan melalui `saveData()` di `AuthenticationService`. Data ini disimpan menggunakan `Preferences` untuk digunakan dalam sesi berikutnya.
   ```typescript
   saveData(token: string, user: any) {
       Preferences.set({ key: TOKEN_KEY, value: token });
       Preferences.set({ key: USER_KEY, value: user });
       this.isAuthenticated.next(true); // Menandakan pengguna telah terautentikasi
   }
   ```

5. **Redirection ke Halaman Home**: Setelah berhasil login, pengguna diarahkan ke halaman **home** (`/home`), yang hanya dapat diakses ketika `isAuthenticated` bernilai `true`.

6. **Proteksi Halaman dengan Guard**: Guard `authGuard` memastikan bahwa pengguna yang mengakses halaman **home** harus dalam status terautentikasi. Jika pengguna belum login, mereka akan diarahkan kembali ke halaman login (`/login`).
   ```typescript
   return authService.authenticationState.pipe(
       filter((val) => val !== null),
       take(1),
       map((isAuthenticated) => {
           if (isAuthenticated) {
               return true;
           } else {
               router.navigateByUrl('/login', { replaceUrl: true });
               return false;
           }
       })
   );
   ```

---

## 🔄 Flowchart Login

Berikut adalah flowchart proses login dari mulai input pengguna hingga akses ke halaman yang dilindungi:

```mermaid
flowchart TD
    A[Pengguna mengisi Form Login] --> B{Username & Password Terisi?}
    B -- Tidak --> C[Notifikasi: Username atau Password Tidak Boleh Kosong]
    B -- Ya --> D[AuthenticationService.postMethod mengirim data ke API]
    D --> E{Login Berhasil?}
    E -- Tidak --> F[Notifikasi: Username atau Password Salah]
    E -- Ya --> G[AuthenticationService.saveData menyimpan token & username]
    G --> H[Update authenticationState ke true]
    H --> I[Redirect ke halaman Home]
    I --> J{Akses ke halaman dilindungi}
    J --> K{authenticationState = true?}
    K -- Tidak --> L[Redirect ke Login]
    K -- Ya --> M[Halaman dapat diakses]
```

---

Sekarang, README.md Anda telah diatur sesuai permintaan dengan bagian **Perkenalan** di awal dan **Daftar Isi** yang rapi.
