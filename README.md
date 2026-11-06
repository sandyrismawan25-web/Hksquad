# HK Squad

## Login Google dan hosting GitHub Pages

Situs tetap dapat dibuka tanpa login. Login Google opsional; hanya akun admin yang dikonfigurasi yang dapat mereset kata sandi anggota setelah tiga kali percobaan masuk yang salah. Backend Node.js memverifikasi identitas Google dan membatasi percobaan login.

GitHub Pages hanya menjalankan file statis, jadi backend perlu di-host terpisah pada layanan yang mendukung Node.js.

### Konfigurasi Google

1. Buat OAuth Client ID bertipe **Web application** di Google Cloud Console.
2. Tambahkan origin situs sebagai **Authorized JavaScript origin**, misalnya `https://nama-akun.github.io`. Alur ini tidak memerlukan redirect URI.
3. Edit `java script/auth-config.js`:
   - `googleClientId`: Client ID publik dari Google.
   - `apiBaseUrl`: URL HTTPS backend, tanpa garis miring di akhir.
4. Di pengaturan environment backend, atur:
   - `GOOGLE_CLIENT_ID`: Client ID yang sama.
   - `ADMIN_GOOGLE_EMAIL`: alamat Gmail admin yang diizinkan.
   - `ALLOWED_ORIGINS`: origin GitHub Pages yang tepat, misalnya `https://nama-akun.github.io`.
   - `PORT`: biasanya diberikan otomatis oleh penyedia hosting.
5. Deploy backend ini dengan Node.js 18 atau lebih baru dan perintah `npm start`. Penyedia hosting harus memasang dependency dari `package.json`.
6. Publikasikan file situs di GitHub Pages melalui **Settings → Pages**.

Untuk menjalankan backend lokal, salin `.env.example` menjadi `.env`, sesuaikan nilainya, jalankan `npm install`, lalu `npm start`. Buka `http://127.0.0.1:3000`.

Client ID Google boleh ada di frontend. Jangan memasukkan client secret, password, atau token ke file frontend maupun repository publik. File `.env` diabaikan Git; simpan nilainya hanya di environment variables layanan backend.

## Akun pengunjung dengan email atau Google

Pengunjung dapat mendaftar, masuk, mengatur ulang kata sandi, dan keluar menggunakan email/password, atau masuk memakai akun Google. Login ini opsional dan hanya mengelola akun Firebase Authentication; akun tersebut tidak memberi akses untuk mengedit 12 profil anggota atau menyimpan profil pengunjung.

1. Di Firebase Console, buka **Authentication → Sign-in method** dan aktifkan **Email/Password**.
2. Pada halaman yang sama, aktifkan juga penyedia **Google**.
3. Buka **Authentication → Settings → Authorized domains** dan tambahkan domain tempat situs dipublikasikan. Untuk pengujian lokal, gunakan `localhost` melalui server web lokal; membuka file langsung dengan `file://` bukan cara yang didukung untuk menguji autentikasi.
4. Konfigurasi Firebase Web App berada di `java script/auth-config.js`. Firebase Web SDK dimuat dari CDN, sehingga browser memerlukan koneksi internet.
5. Publikasikan perubahan situs. Tidak perlu membuat service account atau menaruh private key Firebase di frontend.

## Penyimpanan anggota

Password awal untuk mengelola foto/profil setiap slot adalah `Dantar112*`. Saat versi kode ini pertama kali dimuat, password slot lama di browser tersebut diperbarui satu kali tanpa menghapus nama atau foto yang tersimpan. Perangkat atau domain lain akan menerapkan pembaruan ketika memuat versi situs yang sudah dipublikasikan.

Data profil dan kata sandi anggota saat ini disimpan di browser/perangkat masing-masing. Reset kata sandi hanya memperbarui penyimpanan browser yang sedang digunakan; data tidak otomatis tersinkron ke perangkat lain. Gunakan HTTPS untuk situs dan backend.
