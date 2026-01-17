# diStreaming 🎬

Platform streaming film modern dan responsif yang dibangun dengan teknologi web terbaru. Aplikasi ini memberikan pengalaman pengguna yang mulus untuk menjelajahi koleksi film, mencari konten favorit, dan mengelola data film melalui dasbor admin yang komprehensif.

🔗 **Link Demo:** [https://distreaming-agus.vercel.app/](https://distreaming-agus.vercel.app/)

## ✨ Fitur Unggulan

### 👤 Untuk Pengguna (User Features)

- **Jelajah Film & Serial TV**
  - Akses katalog film yang luas dengan tampilan visual yang menarik.
  - Melihat detail lengkap film termasuk sinopsis, rating, durasi, dan informasi rilis.
  - Antarmuka yang responsif dan cepat, memastikan kenyamanan akses baik dari perangkat desktop maupun mobile.

- **Pencarian & Filter Canggih**
  - **Pencarian Real-time**: Temukan film secara instan berdasarkan judul.
  - **Filter Kategori**: Jelajahi konten berdasarkan genre (Action, Comedy, Drama, dil.) untuk menemukan tontonan yang sesuai mood Anda.

- **Autentikasi Pengguna**
  - Sistem registrasi dan login yang aman untuk mengakses fitur personalisasi.
  - Manajemen sesi pengguna yang terintegrasi.

### 🛠️ Untuk Admin (Dashboard Management)

Aplikasi ini dilengkapi dengan panel admin yang kuat untuk pengelolaan konten secara menyeluruh:

- **Manajemen Film (Movie Management)**
  - **Create**: Tambahkan film baru ke dalam katalog dengan mudah.
  - **Read**: Pantau seluruh daftar film yang tersedia di database.
  - **Update**: Perbarui informasi film, perbaiki kesalahan data, atau update poster film.
  - **Delete**: Hapus film yang sudah tidak relevan dari katalog.

- **Manajemen Genre (Genre Management)**
  - Kelola kategori dan genre film untuk memastikan pengelompokan konten yang rapi dan terstruktur.
  - Tambah, ubah, atau hapus genre sesuai kebutuhan perpustakaan film.

## � Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan _tech stack_ modern untuk menjamin performa, skalabilitas, dan pengalaman pengembang yang baik:

- **Frontend Framework**: [React 19](https://react.dev/) - Library UI terbaru untuk membangun antarmuka yang interaktif.
- **Build Tool**: [Vite](https://vitejs.dev/) - Tooling frontend generasi baru yang super cepat.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS utility-first untuk desain yang cepat dan kustomisasi tanpa batas.
- **Routing**: [React Router v7](https://reactrouter.com/) - Standar routing terbaru untuk navigasi aplikasi yang dinamis.
- **State Management**: React Context API (`AuthProvider`) untuk pengelolaan status autentikasi global.
- **HTTP Client**: [Axios](https://axios-http.com/) - Untuk komunikasi data yang efisien dengan API Backend.
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) - Kumpulan ikon vektor populer yang mudah diintegrasikan.

## 📂 Struktur Proyek

Gambaran singkat struktur folder aplikasi untuk referensi arsitektur:

```
distreaming/
├── public/          # Aset statis (gambar, favicon, dll)
├── src/
│   ├── components/  # Komponen UI yang dapat digunakan kembali (Navbar, MovieCard)
│   ├── context/     # State global aplikasi (AuthContext)
│   ├── hooks/       # Custom hooks untuk logika bisnis (useMovies, useGenres)
│   ├── pages/       # Halaman-halaman utama aplikasi
│   ├── routes/      # Konfigurasi routing dan proteksi halaman (ProtectedRoute)
│   ├── App.jsx      # Komponen utama aplikasi
│   └── main.jsx     # Titik masuk aplikasi (Entry point)
└── index.html       # HTML utama
```
