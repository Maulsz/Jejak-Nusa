# JejakNusa — Dokumentasi dan Pembelajaran JavaScript

## 1. Tentang JejakNusa

JejakNusa adalah website eksplorasi budaya Indonesia yang dibuat menggunakan HTML, CSS, dan Vanilla JavaScript.

Project ini dibuat sebagai sarana belajar JavaScript melalui pengembangan website nyata. Fokus utamanya bukan hanya membuat tampilan, tetapi juga memahami bagaimana JavaScript mengelola data, memanipulasi DOM, menangani interaksi pengguna, dan menghubungkan berbagai bagian website.

### Fitur yang tersedia

- Hero slideshow yang berganti secara otomatis.
- Navbar responsif dengan hamburger menu.
- Navbar active berdasarkan section yang sedang dilihat.
- Kartu kategori eksplorasi budaya.
- Tombol untuk menggeser daftar kategori.
- Modal kategori yang menampilkan daftar tempat.
- Detail tempat yang bisa dibuka dari dalam modal kategori.
- Tombol untuk kembali ke daftar tempat.
- Section destinasi unggulan.
- Modal detail destinasi.
- Animasi ketika modal dibuka dan ditutup.

### Teknologi yang digunakan

| Teknologi | Kegunaan |
|---|---|
| HTML | Membuat struktur website. |
| CSS | Mengatur tampilan dan animasi. |
| JavaScript | Mengatur data dan interaksi website. |
| ES Modules | Memisahkan data dan logika JavaScript. |
| DOM API | Mengakses dan memanipulasi elemen HTML. |
| Browser API | Menggunakan fitur bawaan browser seperti IntersectionObserver. |

---

# 2. Struktur Project

```text
jejakNusa/
│
├── assets/
│   ├── images/
│   └── heroimages2.jpg
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   └── main.js
│
├── logo.svg
└── index.html
```

**Penjelasan:**

- `index.html`: struktur utama website.
- `style.css`: seluruh styling dan animasi.
- `data.js`: menyimpan data kategori, tempat, slide hero, dan destinasi.
- `main.js`: mengatur seluruh interaksi dan perilaku website.
- `assets/`: menyimpan gambar dan aset lainnya.

---

# 3. Memahami Alur Besar JavaScript

Sebelum masuk ke setiap function, pahami dulu hubungan antara file `data.js` dan `main.js`.

```text
                  data.js
                     |
        +------------+------------+
        |            |            |
    categories   heroSlides   destinations
        |            |            |
        +------------+------------+
                     |
                   main.js
                     |
        +------------+------------+
        |            |            |
    Eksplorasi    Hero Slide   Destinasi
        |            |            |
    Modal          Gambar       Modal
        |          Berganti       |
    Daftar Tempat              Detail
        |
    Detail Tempat
```

Prinsipnya:

1. `data.js` menyediakan data.
2. `main.js` mengambil data melalui `import`.
3. JavaScript mengolah data tersebut.
4. Hasil pengolahan ditampilkan ke HTML.
5. Event listener menangani interaksi pengguna.

---

# 4. File data.js

File ini bertugas menyimpan informasi yang akan digunakan oleh website.

Data dipisahkan dari `main.js` supaya kode lebih terorganisir dan lebih mudah diperbarui.

## 4.1 Export Data

Contoh:

```js
export const categories = [
  // Data kategori
];

export const heroSlides = [
  // Data slideshow
];

export const destinations = [
  // Data destinasi
];
```

**Penjelasan:**

- `export`: memungkinkan variabel digunakan oleh file JavaScript lain.
- `const`: membuat variabel yang tidak dapat di-assign ulang.
- `categories`: array yang menyimpan kumpulan kategori budaya.
- `heroSlides`: array yang menyimpan kumpulan gambar untuk slideshow.
- `destinations`: array yang menyimpan kumpulan destinasi unggulan.

Kenapa menggunakan `export`?

Karena data berada di file yang berbeda dari logika utama. Agar `main.js` bisa menggunakannya, data harus diekspor terlebih dahulu.

## 4.2 Struktur Object Kategori

Contoh sederhana:

```js
{
  id: "rumah-adat",
  number: "01",
  label: "ARSITEKTUR",
  title: "Rumah Adat",
  description: "Mengenal rumah tradisional Indonesia.",
  image: "./assets/images/rumah-gadang.webp",
  places: [
    {
      name: "Rumah Gadang",
      location: "Sumatera Barat",
      image: "./assets/images/rumah-gadang.webp",
      description: "Rumah tradisional Minangkabau.",
      detail: {
        asal: "Sumatera Barat",
        keunikan: "Memiliki atap berbentuk gonjong.",
        nilaiBudaya: "Melambangkan identitas masyarakat Minangkabau."
      }
    }
  ]
}
```

**Penjelasan:**

Object di atas merupakan satu data kategori.

Setiap properti memiliki fungsi:

| Properti | Kegunaan |
|---|---|
| `id` | Identitas kategori. |
| `number` | Nomor kategori. |
| `label` | Label kategori. |
| `title` | Judul kategori. |
| `description` | Deskripsi kategori. |
| `image` | Lokasi gambar kategori. |
| `places` | Array yang menyimpan tempat dalam kategori tersebut. |

Perhatikan bahwa `places` merupakan array di dalam object kategori.

Artinya, kita memiliki struktur data bertingkat:

```text
categories (Array)
    |
    +-- Object kategori
            |
            +-- id
            +-- title
            +-- description
            |
            +-- places (Array)
                    |
                    +-- Object tempat
                            |
                            +-- name
                            +-- location
                            +-- detail (Object)
```

Untuk mengambil nama tempat pertama dari kategori pertama:

```js
categories[0].places[0].name;
```

Cara membacanya:

1. `categories[0]`: ambil kategori pertama.
2. `.places`: ambil array tempat milik kategori tersebut.
3. `[0]`: ambil tempat pertama.
4. `.name`: ambil nama tempat.

## 4.3 Kenapa Menggunakan Array dan Object?

Array cocok digunakan untuk menyimpan banyak data yang memiliki urutan.

Object cocok digunakan untuk mengelompokkan beberapa informasi yang saling berhubungan.

Dalam JejakNusa:

- Array `categories` menyimpan banyak kategori.
- Setiap kategori merupakan object.
- Properti `places` menyimpan banyak tempat.
- Setiap tempat juga merupakan object.

Pendekatan ini membuat data lebih terstruktur dan mudah diolah menggunakan JavaScript.

---

# 5. File main.js

Sekarang masuk ke bagian utama project.

File `main.js` mengatur bagaimana data ditampilkan dan bagaimana website merespons interaksi pengguna.

## 5.1 Import Data

Kode:

```js
import { categories, heroSlides, destinations } from "./data.js";
```

Penjelasan per bagian:

- `import`: mengambil sesuatu yang sebelumnya diekspor dari file lain.
- `{ categories, heroSlides, destinations }`: nama variabel yang ingin digunakan.
- `from "./data.js"`: menunjukkan sumber data yang diambil.

Kenapa menggunakan import?

Karena data sudah dipisahkan ke `data.js`. Dengan begitu, `main.js` tidak perlu menyimpan seluruh data secara langsung.

---

# 6. Mengambil Elemen HTML

Sebelum JavaScript bisa mengubah tampilan website, kita perlu mengambil elemen HTML yang ingin dimanipulasi.

Contoh:

```js
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
```

**Penjelasan:**

- `const`: menyimpan hasil pengambilan elemen.
- `document`: mewakili dokumen HTML.
- `querySelector()`: mengambil elemen pertama yang cocok dengan selector.
- `querySelectorAll()`: mengambil seluruh elemen yang cocok dan menghasilkan NodeList.

Perbedaan keduanya:

```js
document.querySelector(".hamburger");
```

Mengambil satu elemen hamburger.

```js
document.querySelectorAll(".nav-menu a");
```

Mengambil seluruh link yang berada di dalam `.nav-menu`.

Kenapa elemen harus diambil terlebih dahulu?

Karena kita membutuhkan referensi elemen tersebut agar JavaScript bisa:

- Mengubah teks.
- Mengubah gambar.
- Menambahkan atau menghapus class.
- Menyembunyikan elemen.
- Menambahkan event listener.

## 6.1 Pengelompokan Elemen DOM

Di dalam `main.js`, elemen diambil berdasarkan fitur yang akan digunakan.

### Navbar

```js
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
```

### Eksplorasi

```js
const categoryTrack = document.querySelector("#category-track");
const scrollNext = document.querySelector("#scroll-next");
const scrollPrev = document.querySelector("#scroll-prev");
```

### Category Modal

```js
const categoryModal = document.querySelector("#category-modal");
const modalClose = document.querySelector("#modal-close");

const modalImage = document.querySelector("#modal-image");
const modalNumber = document.querySelector("#modal-number");
const modalLabel = document.querySelector("#modal-label");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");

const placesCount = document.querySelector("#places-count");
const placesList = document.querySelector("#places-list");
```

### Modal Views

```js
const categoryView = document.querySelector("#category-view");
const placeView = document.querySelector("#place-view");
const backToCategory = document.querySelector("#back-to-category");
```

### Place Detail

```js
const detailLocation = document.querySelector("#detail-location");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailOrigin = document.querySelector("#detail-origin");
const detailUniqueness = document.querySelector("#detail-uniqueness");
const detailCulturalValue = document.querySelector("#detail-cultural-value");
```

### Hero Slideshow

```js
const heroImageA = document.querySelector("#hero-image-a");
const heroImageB = document.querySelector("#hero-image-b");
const heroRegion = document.querySelector("#hero-region");
const heroLocation = document.querySelector("#hero-location");
```

Kenapa ada dua elemen gambar?

Karena slideshow menggunakan dua elemen `<img>` yang bergantian menampilkan gambar. Satu sedang terlihat, sedangkan satu lagi dipersiapkan untuk gambar berikutnya.

### Destinasi

```js
const destinationsGrid = document.querySelector(".destinations-grid");

const destinationModal = document.querySelector("#destination-modal");
const destinationModalClose = document.querySelector("#destination-modal-close");

const destinationModalImage = document.querySelector("#destination-modal-image");
const destinationModalLocation = document.querySelector("#destination-modal-location");
const destinationModalTitle = document.querySelector("#destination-modal-title");
const destinationModalDescription = document.querySelector("#destination-modal-description");

const destinationModalHistory = document.querySelector("#destination-modal-history");
const destinationModalUniqueness = document.querySelector("#destination-modal-uniqueness");
const destinationModalCulture = document.querySelector("#destination-modal-culture");
```

Setiap elemen diambil secara terpisah karena masing-masing memiliki tugas berbeda.

---

# 7. Helper Function

Helper function adalah function yang dibuat untuk membantu pekerjaan function atau bagian kode lainnya.

Di JejakNusa terdapat beberapa helper function yang digunakan kembali.

## 7.1 Function openDialog()

Kode asli:

```js
function openDialog(dialog, img) {
  img
    .decode()
    .catch(() => {})
    .then(() => dialog.showModal());
}
```

### Baris 1

```js
function openDialog(dialog, img) {
```

Membuat function bernama `openDialog`.

Function menerima dua parameter:

- `dialog`: elemen modal yang ingin dibuka.
- `img`: elemen gambar yang perlu dipastikan siap ditampilkan.

Kenapa menggunakan parameter?

Karena function ini akan digunakan oleh dua modal berbeda. Daripada membuat function pembuka modal secara terpisah, kita bisa menggunakan satu function dengan elemen yang dikirim melalui parameter.

### Baris 2

```js
img
```

Mengakses elemen gambar yang dikirim melalui parameter.

### Baris 3

```js
.decode()
```

Memanggil method `decode()` milik HTMLImageElement.

Method ini menghasilkan Promise yang akan terpenuhi ketika gambar berhasil didekode dan siap ditampilkan.

Kenapa diperlukan?

Agar gambar dipersiapkan sebelum modal dibuka sehingga perpindahan tampilan tidak terasa patah.

### Baris 4

```js
.catch(() => {})
```

Menangani kemungkinan kegagalan proses decode gambar.

- `.catch()` menangkap penolakan Promise.
- `() => {}` merupakan callback kosong.

Kenapa callback-nya kosong?

Karena jika proses decode gagal, kita tidak ingin proses pembukaan modal berhenti hanya karena kegagalan tersebut.

### Baris 5

```js
.then(() => dialog.showModal());
```

Setelah proses sebelumnya selesai, jalankan callback untuk membuka dialog.

- `.then()` dijalankan setelah Promise sebelumnya selesai.
- `dialog.showModal()` membuka elemen `<dialog>` sebagai modal.

Karena `.catch()` sudah menangani kegagalan decode, `.then()` tetap bisa berjalan setelahnya.

### Alur Function

```text
openDialog(dialog, img)
          |
      img.decode()
          |
    Decode berhasil?
       /       \
     Ya       Tidak
      \         /
       .then()
          |
   dialog.showModal()
          |
      Modal terbuka
```

**Kenapa dibuat terpisah?**

Karena pembukaan modal kategori dan modal destinasi sama-sama membutuhkan proses yang sama.

Contoh penggunaannya:

```js
openDialog(categoryModal, modalImage);
```

```js
openDialog(destinationModal, destinationModalImage);
```

Function-nya sama, tetapi elemen yang dikirim berbeda.

---

## 7.2 Function closeDialog()

Kode asli:

```js
function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;

  dialog.classList.add("is-closing");

  const done = (e) => {
    if (e.target !== dialog || e.animationName !== "modal-out") return;

    dialog.removeEventListener("animationend", done);
    dialog.classList.remove("is-closing");
    dialog.close();
  };

  dialog.addEventListener("animationend", done);
}
```

Function ini bertugas menutup modal dengan menjalankan animasi keluar terlebih dahulu.

### Baris 1

```js
function closeDialog(dialog) {
```

Membuat function dengan parameter `dialog`.

Parameter ini menentukan modal mana yang ingin ditutup.

### Baris 2

```js
if (!dialog.open || dialog.classList.contains("is-closing")) return;
```

Baris ini merupakan pengaman.

Kita memeriksa dua kondisi:

1. `!dialog.open`: modal sedang tidak terbuka.
2. `dialog.classList.contains("is-closing")`: modal sedang menjalankan animasi keluar.

Operator `||` berarti salah satu kondisi cukup terpenuhi untuk menjalankan `return`.

`return` menghentikan function.

Kenapa diperlukan?

Supaya modal tidak menjalankan proses penutupan ketika sebenarnya sudah tertutup atau sedang dalam proses ditutup.

### Baris 3

```js
dialog.classList.add("is-closing");
```

Menambahkan class `is-closing` ke elemen dialog.

Class ini digunakan oleh CSS untuk menjalankan animasi keluar.

### Baris 4

```js
const done = (e) => {
```

Membuat callback function bernama `done`.

Parameter `e` menerima informasi event yang dikirim browser.

Callback ini akan dijalankan ketika animasi selesai.

### Baris 5

```js
if (e.target !== dialog || e.animationName !== "modal-out") return;
```

Memeriksa apakah animasi yang selesai benar-benar merupakan animasi keluar dari dialog yang sedang ditutup.

- `e.target`: elemen tempat event terjadi.
- `e.animationName`: nama animasi CSS yang selesai.
- `!==`: operator tidak sama dengan.
- `||`: operator logika OR.

Jika event bukan berasal dari dialog tersebut atau nama animasinya bukan `modal-out`, function berhenti.

Kenapa perlu diperiksa?

Karena satu elemen bisa memiliki beberapa animasi. Kita hanya ingin menjalankan penutupan setelah animasi keluar selesai.

### Baris 6

```js
dialog.removeEventListener("animationend", done);
```

Menghapus event listener yang sebelumnya dipasang.

Kenapa?

Supaya listener tidak terus menunggu event animasi berikutnya setelah tugasnya selesai.

### Baris 7

```js
dialog.classList.remove("is-closing");
```

Menghapus class animasi keluar.

### Baris 8

```js
dialog.close();
```

Menutup elemen `<dialog>` menggunakan method bawaan browser.

### Baris 9

```js
dialog.addEventListener("animationend", done);
```

Memasang event listener yang menunggu animasi selesai.

Ketika animasi selesai, callback `done` dijalankan.

### Alur Function

```text
closeDialog(dialog)
        |
   Modal terbuka?
        |
       Ya
        |
 Tambah is-closing
        |
 Tunggu animationend
        |
 Cek nama animasi
        |
 Hapus event listener
        |
 Hapus is-closing
        |
    dialog.close()
```

**Kenapa tidak langsung menggunakan `dialog.close()`?**

Karena modal perlu menyelesaikan animasi keluarnya terlebih dahulu. Kalau langsung ditutup, animasi bisa terpotong.

---

## 7.3 Function showView()

Kode asli:

```js
function showView(show, hide) {
  hide.hidden = true;
  show.hidden = false;
  show.classList.remove("view-enter");
  void show.offsetWidth;
  show.classList.add("view-enter");
}
```

Function ini digunakan untuk mengganti tampilan di dalam modal kategori.

Terdapat dua tampilan:

- `categoryView`: tampilan daftar tempat.
- `placeView`: tampilan detail tempat.

### Baris 1

```js
function showView(show, hide) {
```

Membuat function dengan dua parameter:

- `show`: elemen yang ingin ditampilkan.
- `hide`: elemen yang ingin disembunyikan.

### Baris 2

```js
hide.hidden = true;
```

Menyembunyikan elemen yang dikirim melalui parameter `hide`.

Properti `hidden` merupakan properti bawaan HTML yang mengatur apakah elemen disembunyikan.

### Baris 3

```js
show.hidden = false;
```

Menampilkan elemen yang dikirim melalui parameter `show`.

### Baris 4

```js
show.classList.remove("view-enter");
```

Menghapus class `view-enter` terlebih dahulu.

Kenapa?

Agar animasi dapat dimulai kembali ketika pengguna berpindah tampilan.

### Baris 5

```js
void show.offsetWidth;
```

Baris ini memiliki fungsi khusus.

- `offsetWidth` membaca lebar aktual elemen.
- Pembacaan properti layout seperti ini dapat memaksa browser menghitung ulang layout.
- `void` digunakan untuk membuang nilai hasil ekspresi karena kita hanya membutuhkan efek pembacaan layout-nya.

Tujuannya adalah memaksa browser menyelesaikan perubahan tampilan sebelumnya sebelum class animasi ditambahkan kembali.

### Baris 6

```js
show.classList.add("view-enter");
```

Menambahkan class `view-enter` agar animasi masuk dijalankan kembali.

### Contoh Penggunaan

```js
showView(placeView, categoryView);
```

Artinya:

- Tampilkan `placeView`.
- Sembunyikan `categoryView`.

Sedangkan:

```js
showView(categoryView, placeView);
```

Artinya:

- Tampilkan `categoryView`.
- Sembunyikan `placeView`.

**Kenapa menggunakan satu function?**

Karena proses pergantian tampilan selalu sama. Yang berubah hanya elemen mana yang ingin ditampilkan dan disembunyikan.

---

# 8. Event Listener untuk Modal

Kode:

```js
[categoryModal, destinationModal].forEach((dialog) => {
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeDialog(dialog);
  });
});
```

Bagian ini menangani event ketika pengguna mencoba membatalkan atau menutup dialog menggunakan mekanisme bawaan browser, misalnya tombol Escape.

### Baris 1

```js
[categoryModal, destinationModal]
```

Membuat array yang berisi dua elemen dialog.

Kenapa dijadikan array?

Karena kedua modal membutuhkan perlakuan yang sama.

### Baris 2

```js
.forEach((dialog) => {
```

Mengulang setiap elemen di dalam array.

Setiap elemen secara bergantian dikirim ke parameter `dialog`.

### Baris 3

```js
dialog.addEventListener("cancel", (e) => {
```

Memasang event listener `cancel` pada dialog.

Event `cancel` dapat terjadi ketika pengguna menekan Escape untuk membatalkan dialog.

### Baris 4

```js
e.preventDefault();
```

Mencegah perilaku default browser.

Kenapa?

Karena kita ingin mengatur sendiri proses penutupan modal melalui `closeDialog()`, termasuk animasi keluarnya.

### Baris 5

```js
closeDialog(dialog);
```

Memanggil helper function yang sudah dijelaskan sebelumnya.

Karena parameter `dialog` berisi modal yang sedang menerima event, function tersebut akan menutup modal yang tepat.

---

# 9. Hero Slideshow

Bagian ini mengatur pergantian gambar pada hero section secara otomatis.

## 9.1 Variabel Slideshow

Kode:

```js
let activeSlideIndex = 0;

let activeImage = heroImageA;
let nextImage = heroImageB;
```

### `activeSlideIndex`

Menyimpan indeks slide yang sedang aktif.

Nilai awalnya `0`, berarti slide pertama.

### `activeImage`

Menyimpan referensi elemen gambar yang sedang ditampilkan.

### `nextImage`

Menyimpan referensi elemen gambar yang akan digunakan untuk gambar berikutnya.

Kenapa menggunakan `let`?

Karena nilai ketiga variabel tersebut akan berubah selama slideshow berjalan.

---

## 9.2 Function changeHeroSlide()

Kode asli:

```js
function changeHeroSlide() {
  activeSlideIndex = (activeSlideIndex + 1) % heroSlides.length;

  const nextSlide = heroSlides[activeSlideIndex];

  nextImage.src = nextSlide.image;
  nextImage.alt = nextSlide.alt;

  heroRegion.textContent = nextSlide.region;
  heroLocation.textContent = nextSlide.location;

  nextImage.classList.add("is-active");
  activeImage.classList.remove("is-active");

  const temporaryImage = activeImage;
  activeImage = nextImage;
  nextImage = temporaryImage;
}
```

### Baris 1

```js
function changeHeroSlide() {
```

Membuat function untuk mengganti slide hero.

### Baris 2

```js
activeSlideIndex = (activeSlideIndex + 1) % heroSlides.length;
```

Baris ini mengatur indeks slide berikutnya.

Mari pecah:

- `activeSlideIndex + 1`: berpindah ke indeks berikutnya.
- `heroSlides.length`: jumlah seluruh slide.
- `%`: operator modulo, menghasilkan sisa pembagian.

Kenapa menggunakan modulo?

Supaya indeks tidak melewati jumlah slide yang tersedia.

Misalnya ada 3 slide:

| Indeks sebelumnya | Perhitungan | Indeks baru |
|---|---|---|
| 0 | (0 + 1) % 3 | 1 |
| 1 | (1 + 1) % 3 | 2 |
| 2 | (2 + 1) % 3 | 0 |

Ketika mencapai slide terakhir, indeks kembali ke `0`.

Dengan begitu slideshow terus berulang.

### Baris 3

```js
const nextSlide = heroSlides[activeSlideIndex];
```

Mengambil object slide berdasarkan indeks yang baru.

Contohnya jika indeksnya `1`, maka JavaScript mengambil data slide kedua.

### Baris 4

```js
nextImage.src = nextSlide.image;
```

Mengubah sumber gambar pada elemen yang akan digunakan untuk slide berikutnya.

### Baris 5

```js
nextImage.alt = nextSlide.alt;
```

Mengubah teks alternatif gambar sesuai data slide.

### Baris 6

```js
heroRegion.textContent = nextSlide.region;
```

Mengubah informasi wilayah pada hero section.

### Baris 7

```js
heroLocation.textContent = nextSlide.location;
```

Mengubah informasi lokasi pada hero section.

### Baris 8

```js
nextImage.classList.add("is-active");
```

Menambahkan class `is-active` ke gambar berikutnya.

CSS menggunakan class ini untuk menentukan gambar mana yang terlihat.

### Baris 9

```js
activeImage.classList.remove("is-active");
```

Menghapus class aktif dari gambar sebelumnya.

Sekarang gambar berikutnya menjadi gambar yang terlihat.

### Baris 10

```js
const temporaryImage = activeImage;
```

Menyimpan referensi gambar yang sebelumnya aktif ke variabel sementara.

Kenapa diperlukan?

Karena kita akan menukar peran kedua elemen gambar.

### Baris 11

```js
activeImage = nextImage;
```

Menjadikan gambar berikutnya sebagai gambar aktif.

### Baris 12

```js
nextImage = temporaryImage;
```

Menjadikan gambar sebelumnya sebagai gambar yang akan dipakai untuk pergantian berikutnya.

### Kenapa Gambar Ditukar?

Bayangkan kita memiliki dua elemen:

```text
Awal:

heroImageA = aktif
heroImageB = berikutnya
```

Setelah pergantian:

```text
heroImageB = aktif
heroImageA = berikutnya
```

Pergantian selanjutnya:

```text
heroImageA = aktif
heroImageB = berikutnya
```

Jadi kedua elemen terus bergantian.

Pendekatan ini memungkinkan transisi gambar tanpa harus membuat elemen gambar baru setiap kali slide berubah.

---

# 10. Navbar dan Interaksinya

## 10.1 Membuka dan Menutup Hamburger Menu

Kode:

```js
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navMenu.classList.toggle("is-active");
});
```

### Baris 1

```js
hamburger.addEventListener("click", () => {
```

Memasang event listener pada tombol hamburger.

Ketika pengguna mengeklik tombol, callback function dijalankan.

### Baris 2

```js
hamburger.classList.toggle("is-active");
```

Membalik kondisi class `is-active` pada tombol hamburger.

- Jika class belum ada, tambahkan.
- Jika class sudah ada, hapus.

### Baris 3

```js
navMenu.classList.toggle("is-active");
```

Melakukan hal yang sama pada menu navigasi.

Kenapa keduanya menggunakan `toggle()`?

Karena tombol dan menu perlu berubah secara bersamaan mengikuti kondisi menu terbuka atau tertutup.

---

## 10.2 Menutup Menu Ketika Link Diklik

Kode:

```js
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  });
});
```

### Baris 1

```js
navLinks.forEach((link) => {
```

Mengulang seluruh link navigasi.

Setiap link dikirim ke parameter `link`.

### Baris 2

```js
link.addEventListener("click", () => {
```

Memasang event listener pada masing-masing link.

### Baris 3

```js
hamburger.classList.remove("is-active");
```

Memastikan class aktif pada hamburger dihapus.

### Baris 4

```js
navMenu.classList.remove("is-active");
```

Memastikan menu navigasi tertutup.

Kenapa menggunakan `remove()` bukan `toggle()`?

Karena tujuan kita bukan membalik kondisi, melainkan memastikan menu tertutup setelah link diklik.

---

## 10.3 Menutup Menu dengan Tombol Escape

Kode:

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  }
});
```

### Baris 1

```js
document.addEventListener("keydown", (event) => {
```

Meminta browser mendengarkan event ketika tombol keyboard ditekan.

Parameter `event` menerima informasi mengenai kejadian tersebut.

### Baris 2

```js
if (event.key === "Escape") {
```

Memeriksa tombol keyboard yang ditekan.

`event.key` berisi nama tombol yang menghasilkan event.

Jika tombolnya Escape, kondisi menjadi benar.

### Baris 3

```js
hamburger.classList.remove("is-active");
```

Menghapus class aktif hamburger.

### Baris 4

```js
navMenu.classList.remove("is-active");
```

Menutup menu navigasi.

---

## 10.4 Menutup Menu Ketika Area Luar Navbar Diklik

Kode:

```js
document.addEventListener("click", (event) => {
  const clickedInsideNavbar = event.target.closest(".navbar");

  if (!clickedInsideNavbar) {
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  }
});
```

### Baris 1

```js
document.addEventListener("click", (event) => {
```

Mendengarkan event click pada seluruh dokumen.

### Baris 2

```js
const clickedInsideNavbar = event.target.closest(".navbar");
```

Mencari elemen `.navbar` terdekat dari elemen yang benar-benar diklik.

- `event.target`: elemen yang menjadi target klik.
- `.closest()`: mencari elemen yang cocok dengan selector, dimulai dari elemen tersebut dan bergerak ke parent.

Kenapa menggunakan `closest()`?

Karena pengguna bisa mengeklik isi navbar, misalnya logo, link, atau tombol hamburger. Kita ingin mengetahui apakah klik tersebut masih berada di dalam navbar.

### Baris 3

```js
if (!clickedInsideNavbar) {
```

Memeriksa apakah hasil pencarian tidak ditemukan.

Jika tidak ditemukan, berarti klik terjadi di luar navbar.

### Baris 4–5

```js
hamburger.classList.remove("is-active");
navMenu.classList.remove("is-active");
```

Menutup menu navigasi.

### Konsep Event Bubbling

Event bubbling adalah proses ketika event yang terjadi pada elemen anak dapat merambat ke elemen parent hingga ke dokumen.

Itulah mengapa event click pada `document` dapat mengetahui klik yang terjadi pada elemen lain di halaman.

---

## 10.5 Navbar Active Menggunakan IntersectionObserver

Kode:

```js
const navSections = document.querySelectorAll(
  "#beranda, #eksplorasi, #destinations",
);
```

Mengambil seluruh section yang akan diamati.

Kemudian:

```js
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      }
    });
  },
  {
    rootMargin: "-40% 0px -50% 0px",
  },
);
```

### Baris 1

```js
new IntersectionObserver(...)
```

Membuat objek IntersectionObserver.

IntersectionObserver merupakan API browser yang dapat mengamati apakah sebuah elemen masuk atau keluar dari area pengamatan.

### Baris 2

```js
(entries) => {
```

Callback yang dijalankan ketika status elemen yang diamati berubah.

`entries` berisi informasi mengenai elemen yang diamati.

### Baris 3

```js
entries.forEach((entry) => {
```

Mengulang setiap informasi perubahan yang diterima.

### Baris 4

```js
if (entry.isIntersecting) {
```

Memeriksa apakah elemen sedang beririsan dengan area pengamatan.

Jika benar, berarti section tersebut sedang berada di area yang diperhatikan observer.

### Baris 5

```js
navLinks.forEach((link) => {
```

Mengulang seluruh link navbar.

### Baris 6

```js
link.classList.toggle(
  "active",
  link.getAttribute("href") === `#${entry.target.id}`,
);
```

Bagian ini menggunakan bentuk kedua dari `classList.toggle()`.

Bentuknya:

```js
element.classList.toggle("nama-class", kondisi);
```

- Jika kondisi `true`, class ditambahkan.
- Jika kondisi `false`, class dihapus.

Kemudian:

```js
link.getAttribute("href")
```

Mengambil nilai atribut `href` dari link.

Sedangkan:

```js
`#${entry.target.id}`
```

Mengambil ID section yang sedang diamati dan menambahkan tanda `#`.

Contoh:

```text
href link       = #eksplorasi
entry.target.id = eksplorasi
```

Keduanya cocok, sehingga link tersebut mendapatkan class `active`.

### Baris 7

```js
{
  rootMargin: "-40% 0px -50% 0px",
}
```

Mengatur batas area pengamatan IntersectionObserver.

Nilai tersebut mengubah area pengamatan dari ukuran viewport normal.

Tujuannya agar pergantian navbar active tidak harus menunggu section benar-benar memenuhi seluruh viewport.

### Mengaktifkan Observer

Kode:

```js
navSections.forEach((section) => {
  navObserver.observe(section);
});
```

Penjelasan:

- `navSections.forEach()`: mengulang seluruh section.
- `section`: satu section yang sedang diproses.
- `navObserver.observe(section)`: meminta observer mulai mengamati section tersebut.

Tanpa `observe()`, observer belum mengetahui elemen mana yang harus diamati.

---

# 11. Fitur Eksplorasi

Fitur eksplorasi menampilkan berbagai kategori budaya dalam bentuk card.

## 11.1 Function renderCategories()

Kode asli:

```js
function renderCategories() {
  const cards = categories.map((category) => {
    return `
      <div role="button" tabindex="0"
        class="category-card"
        data-category-id="${category.id}">
        <img src="${category.image}" alt="${category.title}" />

        <div class="category-info">
          <span>${category.number} / ${category.label}</span>
          <h3>${category.title}</h3>
          <p>${category.description} ↗</p>
        </div>
      </div>`;
  });

  const gabungCards = cards.join("");

  categoryTrack.innerHTML = gabungCards;
}
```

### Baris 1

```js
function renderCategories() {
```

Membuat function untuk menampilkan seluruh kategori ke halaman.

### Baris 2

```js
const cards = categories.map((category) => {
```

Memanggil method `map()` pada array `categories`.

`map()` akan:

1. Mengambil setiap object kategori.
2. Menjalankan callback untuk setiap object.
3. Mengumpulkan nilai yang dikembalikan oleh callback.
4. Menghasilkan array baru.

Parameter `category` mewakili satu object kategori yang sedang diproses.

Kenapa bukan `categories`?

Karena:

- `categories`: seluruh array.
- `category`: satu object di dalam array.

### Baris 3

```js
return `
```

Mengembalikan template literal berisi HTML card.

`return` membuat hasil callback dikirim kembali ke `map()`.

### Bagian HTML

```html
<div role="button" tabindex="0"
  class="category-card"
  data-category-id="${category.id}">
```

Penjelasan:

- `role="button"`: memberi informasi semantik bahwa elemen berperilaku seperti tombol.
- `tabindex="0"`: membuat elemen dapat menerima fokus melalui keyboard.
- `class="category-card"`: identitas class untuk CSS dan JavaScript.
- `data-category-id`: menyimpan ID kategori pada elemen HTML.

Kenapa menggunakan `data-category-id`?

Karena nanti ketika card diklik, JavaScript perlu mengetahui kategori mana yang dipilih.

### Gambar

```html
<img src="${category.image}" alt="${category.title}" />
```

- `src`: mengambil lokasi gambar dari object kategori.
- `alt`: memberikan teks alternatif gambar.

### Informasi Kategori

```html
<span>${category.number} / ${category.label}</span>
<h3>${category.title}</h3>
<p>${category.description} ↗</p>
```

Setiap bagian mengambil data yang berbeda dari object kategori.

### Baris Berikutnya

```js
});
```

Menutup callback `map()`.

Sekarang variabel `cards` berisi array HTML hasil pengolahan kategori.

### Baris Selanjutnya

```js
const gabungCards = cards.join("");
```

Menggabungkan seluruh isi array menjadi satu string.

Kenapa menggunakan `join("")`?

Karena hasil `map()` berupa array. Sedangkan kita ingin memasukkan seluruh HTML card sebagai satu string.

Contoh:

```js
const cards = ["Card A", "Card B", "Card C"];

const result = cards.join("");
```

Hasil:

```text
Card ACard BCard C
```

### Baris Terakhir

```js
categoryTrack.innerHTML = gabungCards;
```

Memasukkan string HTML ke dalam elemen `categoryTrack`.

`innerHTML` membuat browser membaca string tersebut sebagai markup HTML.

### Alur Function

```text
categories
    |
   map()
    |
Object kategori diolah
    |
HTML card dibuat
    |
Array HTML
    |
 join("")
    |
Satu string HTML
    |
innerHTML
    |
Card tampil di website
```

**Kenapa menggunakan map() dan join()?**

Karena jumlah kategori berasal dari data. Dengan pendekatan ini, kita tidak perlu menulis card satu per satu secara manual.

---

## 11.2 Tombol Scroll Kategori

### Tombol Berikutnya

Kode:

```js
scrollNext.addEventListener("click", () => {
  categoryTrack.scrollBy({
    left: 312,
    behavior: "smooth",
  });
});
```

### Baris 1

```js
scrollNext.addEventListener("click", () => {
```

Memasang event listener pada tombol berikutnya.

### Baris 2

```js
categoryTrack.scrollBy({
```

Meminta browser menggeser posisi scroll container kategori.

`scrollBy()` menggunakan jarak relatif dari posisi scroll saat ini.

### Baris 3

```js
left: 312,
```

Menggeser container ke kanan sejauh 312 piksel.

Kenapa 312?

Karena ukuran card dan jaraknya:

```text
Lebar card = 290px
Gap        = 22px

290 + 22 = 312px
```

### Baris 4

```js
behavior: "smooth",
```

Memberikan animasi perpindahan yang halus.

### Tombol Sebelumnya

Kode:

```js
scrollPrev.addEventListener("click", () => {
  categoryTrack.scrollBy({
    left: -312,
    behavior: "smooth",
  });
});
```

Cara kerjanya sama seperti tombol berikutnya.

Perbedaannya:

```js
left: -312
```

Nilai negatif menggeser container kembali ke kiri.

### Perbedaan scrollBy() dan scrollTo()

| Method | Cara Kerja |
|---|---|
| `scrollBy()` | Bergeser sejauh jarak dari posisi sekarang. |
| `scrollTo()` | Menuju posisi koordinat tertentu. |

Contoh:

```js
categoryTrack.scrollBy({ left: 312 });
```

Jika posisi sekarang 624px, posisi berikutnya menjadi 936px.

Sedangkan:

```js
categoryTrack.scrollTo({ left: 312 });
```

Akan menuju posisi horizontal 312px.

---

# 12. Modal Kategori dan Daftar Tempat

## 12.1 Function renderPlaces()

Kode asli:

```js
function renderPlaces(places) {
  const cards = places.map((place, index) => {
    return `
      <article class="place-card" data-place-index="${index}">
        <div class="place-image">
          <img src="${place.image}" alt="${place.name}" />
        </div>

        <div class="place-info">
          <h4>${place.name}</h4>
          <span class="place-location">${place.location}</span>
          <p>${place.description}</p>
        </div>
      </article>`;
  });

  placesList.innerHTML = cards.join("");
}
```

### Baris 1

```js
function renderPlaces(places) {
```

Membuat function untuk menampilkan daftar tempat.

Function menerima parameter `places`.

Parameter ini berisi array tempat dari kategori yang dipilih pengguna.

Kenapa menggunakan parameter?

Karena setiap kategori memiliki daftar tempat yang berbeda. Dengan parameter, function ini bisa digunakan untuk kategori apa pun.

### Baris 2

```js
const cards = places.map((place, index) => {
```

Mengolah setiap object tempat menggunakan `map()`.

Terdapat dua parameter:

- `place`: object tempat yang sedang diproses.
- `index`: posisi object tersebut di dalam array.

Contoh:

```text
places[0] = Rumah Gadang
places[1] = Tongkonan
places[2] = Rumah Joglo
```

Maka nilai `index` secara berurutan adalah 0, 1, dan 2.

### Baris 3

```js
return `
```

Mengembalikan HTML untuk satu card tempat.

### Baris 4

```html
<article class="place-card" data-place-index="${index}">
```

Membuat elemen card tempat.

`data-place-index` menyimpan posisi tempat dalam array.

Kenapa menggunakan index?

Karena ketika card diklik, JavaScript perlu mengetahui object tempat mana yang harus ditampilkan.

### Bagian Gambar

```html
<img src="${place.image}" alt="${place.name}" />
```

Mengambil gambar dan nama tempat dari object `place`.

### Bagian Informasi

```html
<h4>${place.name}</h4>
<span class="place-location">${place.location}</span>
<p>${place.description}</p>
```

Menampilkan nama, lokasi, dan deskripsi tempat.

### Baris Berikutnya

```js
});
```

Menutup callback `map()`.

### Baris Terakhir

```js
placesList.innerHTML = cards.join("");
```

Menggabungkan seluruh hasil HTML dan memasukkannya ke dalam elemen `placesList`.

### Kenapa Function Ini Dibutuhkan?

Karena daftar tempat berubah sesuai kategori yang dipilih.

Misalnya:

```js
renderPlaces(selectedCategory.places);
```

Jika pengguna memilih kategori Rumah Adat, function menerima daftar tempat dari kategori Rumah Adat.

Jika pengguna memilih kategori Kuliner, function menerima daftar kuliner.

Function yang sama bisa digunakan untuk data berbeda.

---

## 12.2 Variabel activeCategory

Kode:

```js
let activeCategory = null;
```

Variabel ini menyimpan kategori yang sedang dibuka.

Kenapa menggunakan `let`?

Karena nilainya akan berubah setiap kali pengguna memilih kategori berbeda.

Kenapa nilai awalnya `null`?

Karena ketika website baru dibuka, belum ada kategori yang dipilih.

Variabel ini penting karena ketika pengguna memilih tempat, JavaScript perlu mengetahui daftar tempat dari kategori yang sedang aktif.

---

## 12.3 Event Listener pada Daftar Tempat

Kode asli:

```js
placesList.addEventListener("click", (event) => {
  const clickedPlace = event.target.closest(".place-card");

  if (!clickedPlace) return;

  const placeIndex = Number(clickedPlace.dataset.placeIndex);

  const selectedPlace = activeCategory.places[placeIndex];

  if (!selectedPlace) return;

  modalImage.src = selectedPlace.image;
  modalImage.alt = selectedPlace.name;

  detailLocation.textContent = selectedPlace.location;
  detailTitle.textContent = selectedPlace.name;
  detailDescription.textContent = selectedPlace.description;

  detailOrigin.textContent = selectedPlace.detail.asal;
  detailUniqueness.textContent = selectedPlace.detail.keunikan;
  detailCulturalValue.textContent = selectedPlace.detail.nilaiBudaya;

  showView(placeView, categoryView);
  document.querySelector(".modal-content").scrollTop = 0;
});
```

### Baris 1

```js
placesList.addEventListener("click", (event) => {
```

Memasang event listener pada elemen `placesList`.

Kenapa event listener dipasang pada container, bukan setiap card?

Karena card dibuat secara dinamis menggunakan JavaScript.

Dengan event delegation, satu event listener pada parent bisa menangani klik dari banyak elemen anak.

### Baris 2

```js
const clickedPlace = event.target.closest(".place-card");
```

Mencari card tempat terdekat dari elemen yang diklik.

Misalnya pengguna mengeklik gambar atau paragraf di dalam card.

`closest()` akan mencari parent yang memiliki class `.place-card`.

### Baris 3

```js
if (!clickedPlace) return;
```

Memastikan elemen yang diklik memang berada di dalam card tempat.

Jika tidak ditemukan, hentikan function.

Ini merupakan guard clause atau pengaman awal.

### Baris 4

```js
const placeIndex = Number(clickedPlace.dataset.placeIndex);
```

Mengambil nilai `data-place-index` dari elemen HTML.

Kemudian `Number()` mengubah nilainya menjadi angka.

Kenapa perlu `Number()`?

Karena nilai yang dibaca melalui `dataset` selalu berupa string.

Contoh:

```js
clickedPlace.dataset.placeIndex;
```

Hasilnya:

```js
"2"
```

Sedangkan kita ingin menggunakan nilai tersebut sebagai index array:

```js
2
```

### Baris 5

```js
const selectedPlace = activeCategory.places[placeIndex];
```

Mengambil object tempat berdasarkan index.

Contoh:

```js
activeCategory.places[2];
```

Mengambil tempat ketiga dari kategori yang sedang aktif.

### Baris 6

```js
if (!selectedPlace) return;
```

Memastikan object tempat berhasil ditemukan.

Jika tidak ada, hentikan function supaya kode selanjutnya tidak mencoba membaca properti dari nilai yang tidak tersedia.

### Bagian Pengisian Gambar

```js
modalImage.src = selectedPlace.image;
modalImage.alt = selectedPlace.name;
```

Mengubah gambar dan teks alternatif sesuai tempat yang dipilih.

### Bagian Informasi Tempat

```js
detailLocation.textContent = selectedPlace.location;
detailTitle.textContent = selectedPlace.name;
detailDescription.textContent = selectedPlace.description;
```

Mengubah informasi utama tempat.

### Bagian Detail Budaya

```js
detailOrigin.textContent = selectedPlace.detail.asal;
detailUniqueness.textContent = selectedPlace.detail.keunikan;
detailCulturalValue.textContent = selectedPlace.detail.nilaiBudaya;
```

Mengambil informasi dari object `detail` yang berada di dalam object tempat.

Perhatikan struktur datanya:

```text
selectedPlace
    |
    +-- name
    +-- location
    +-- description
    |
    +-- detail
          |
          +-- asal
          +-- keunikan
          +-- nilaiBudaya
```

Itulah kenapa kita menggunakan:

```js
selectedPlace.detail.asal
```

Bukan:

```js
selectedPlace.asal
```

### Mengganti Tampilan

```js
showView(placeView, categoryView);
```

Memanggil helper function `showView()`.

Tujuannya:

- Menampilkan tampilan detail tempat.
- Menyembunyikan tampilan daftar tempat.

### Mengatur Scroll

```js
document.querySelector(".modal-content").scrollTop = 0;
```

Mengambil elemen `.modal-content`, kemudian mengatur posisi scroll vertikalnya menjadi 0.

Tujuannya agar ketika pengguna membuka detail tempat, tampilan dimulai dari bagian paling atas.

---

## 12.4 Tombol Kembali ke Kategori

Kode:

```js
backToCategory.addEventListener("click", () => {
  modalImage.src = activeCategory.image;
  modalImage.alt = activeCategory.title;
  showView(categoryView, placeView);
});
```

### Baris 1

```js
backToCategory.addEventListener("click", () => {
```

Memasang event listener pada tombol kembali.

### Baris 2

```js
modalImage.src = activeCategory.image;
```

Mengembalikan gambar modal ke gambar kategori yang sedang aktif.

### Baris 3

```js
modalImage.alt = activeCategory.title;
```

Mengembalikan teks alternatif gambar sesuai judul kategori.

### Baris 4

```js
showView(categoryView, placeView);
```

Menggunakan helper function untuk:

- Menampilkan kembali daftar tempat.
- Menyembunyikan detail tempat.

Kenapa menggunakan `activeCategory`?

Karena kita perlu mengembalikan gambar kategori yang sedang dibuka, bukan gambar kategori lain.

---

## 12.5 Function preloadCategoryImages()

Kode:

```js
function preloadCategoryImages() {
  categories.forEach((category) => {
    const image = new Image();
    image.src = category.image;
  });
}
```

Function ini bertugas mempersiapkan gambar kategori lebih awal.

### Baris 1

```js
function preloadCategoryImages() {
```

Membuat function untuk melakukan preload gambar kategori.

Preload adalah proses memulai pemuatan aset sebelum aset tersebut benar-benar dibutuhkan.

### Baris 2

```js
categories.forEach((category) => {
```

Mengulang seluruh kategori.

`forEach()` menjalankan callback untuk setiap elemen array.

Berbeda dari `map()`, `forEach()` tidak digunakan untuk menghasilkan array baru.

### Baris 3

```js
const image = new Image();
```

Membuat object gambar baru melalui constructor `Image()`.

Object ini bukan berarti langsung membuat gambar terlihat di halaman.

Object tersebut digunakan untuk memulai pemuatan gambar.

### Baris 4

```js
image.src = category.image;
```

Memberikan lokasi gambar kepada object Image.

Browser kemudian mulai memuat gambar tersebut.

**Kenapa menggunakan preload?**

Supaya gambar memiliki kesempatan untuk dimuat sebelum pengguna membutuhkannya, sehingga perpindahan tampilan berpotensi terasa lebih cepat.

---

# 13. Interaksi Modal Eksplorasi

## 13.1 Keyboard Support pada Card Kategori

Kode:

```js
categoryTrack.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.target.closest(".category-card")?.click();
  }
});
```

### Baris 1

```js
categoryTrack.addEventListener("keydown", (event) => {
```

Memasang event listener untuk mendengarkan input keyboard pada area kategori.

### Baris 2

```js
if (event.key === "Enter" || event.key === " ") {
```

Memeriksa apakah pengguna menekan Enter atau Space.

Operator `||` berarti salah satu kondisi harus benar.

Kenapa Enter dan Space?

Karena kedua tombol umum digunakan untuk mengaktifkan elemen yang berperilaku seperti tombol.

### Baris 3

```js
event.preventDefault();
```

Mencegah perilaku default browser.

Dalam konteks ini, Space dapat menyebabkan halaman bergulir jika tidak dicegah.

### Baris 4

```js
event.target.closest(".category-card")?.click();
```

Mari pecah:

- `event.target`: elemen yang menerima event keyboard.
- `.closest(".category-card")`: mencari card kategori terdekat.
- `?.`: optional chaining.
- `.click()`: memicu event click pada card.

Apa fungsi optional chaining?

Jika hasil `closest()` adalah `null`, JavaScript tidak akan mencoba memanggil `.click()` dan tidak menghasilkan error karena akses tersebut.

Dengan begitu, elemen yang tidak memiliki card kategori tidak akan menyebabkan error.

---

## 13.2 Event Listener Click pada Category Track

Kode asli:

```js
categoryTrack.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".category-card");

  if (!clickedCard) return;

  event.preventDefault();

  const categoryId = clickedCard.dataset.categoryId;

  const selectedCategory = categories.find((category) => {
    return category.id === categoryId;
  });

  activeCategory = selectedCategory;

  if (!selectedCategory) return;

  const places = selectedCategory.places;
  const placesTotal = selectedCategory.places.length;
  placesCount.textContent = `${placesTotal} PLACES`;

  renderPlaces(places);

  modalImage.src = selectedCategory.image;
  modalImage.alt = selectedCategory.title;
  modalNumber.textContent = `${selectedCategory.number} / ${selectedCategory.label}`;
  modalLabel.textContent = selectedCategory.label;
  modalTitle.textContent = selectedCategory.title;
  modalDescription.textContent = selectedCategory.description;

  categoryView.hidden = false;
  placeView.hidden = true;

  document.querySelector(".modal-content").scrollTop = 0;

  openDialog(categoryModal, modalImage);
});
```

### Baris 1

```js
categoryTrack.addEventListener("click", (event) => {
```

Memasang event listener click pada container kategori.

Karena card dibuat secara dinamis, kita menggunakan event delegation.

### Baris 2

```js
const clickedCard = event.target.closest(".category-card");
```

Mencari card kategori yang menjadi tempat terjadinya klik.

### Baris 3

```js
if (!clickedCard) return;
```

Jika klik bukan berasal dari card kategori, hentikan function.

### Baris 4

```js
event.preventDefault();
```

Mencegah perilaku default elemen.

Pada card ini, atribut `role="button"` dan `tabindex="0"` digunakan untuk aksesibilitas, sedangkan `preventDefault()` menjaga agar perilaku default elemen yang diklik tidak mengganggu interaksi yang kita buat.

### Baris 5

```js
const categoryId = clickedCard.dataset.categoryId;
```

Mengambil ID kategori dari atribut HTML `data-category-id`.

### Memahami data-* dan dataset

Di HTML kita memiliki:

```html
<div data-category-id="rumah-adat">
```

Di JavaScript kita membacanya dengan:

```js
clickedCard.dataset.categoryId;
```

Perhatikan perubahan namanya:

```text
data-category-id
       |
       v
dataset.categoryId
```

Aturannya:

1. `data-` dihilangkan.
2. Tanda hubung `-` dihilangkan.
3. Huruf setelah tanda hubung berubah menjadi huruf kapital.

Contoh lain:

| Atribut HTML | JavaScript |
|---|---|
| `data-category-id` | `dataset.categoryId` |
| `data-destination-id` | `dataset.destinationId` |
| `data-place-index` | `dataset.placeIndex` |

Nilai yang dibaca melalui `dataset` selalu berupa string.

### Baris Berikutnya

```js
const selectedCategory = categories.find((category) => {
  return category.id === categoryId;
});
```

Mencari object kategori yang memiliki ID sesuai dengan ID dari card.

`find()` mengembalikan satu elemen pertama yang memenuhi kondisi.

Parameter `category` mewakili satu object kategori yang sedang diperiksa.

```js
return category.id === categoryId;
```

Memeriksa apakah ID object sama dengan ID dari card yang diklik.

Jika cocok, object tersebut dikembalikan oleh `find()`.

Jika tidak ditemukan, hasil `find()` adalah `undefined`.

### Baris Selanjutnya

```js
activeCategory = selectedCategory;
```

Menyimpan kategori yang dipilih ke variabel `activeCategory`.

Kenapa disimpan?

Karena kita akan membutuhkan data kategori tersebut ketika pengguna membuka salah satu tempat dan ketika kembali ke daftar tempat.

### Pengaman

```js
if (!selectedCategory) return;
```

Menghentikan function jika kategori tidak ditemukan.

Ini penting karena kita akan mengakses properti kategori pada baris berikutnya.

### Mengambil Data Tempat

```js
const places = selectedCategory.places;
```

Mengambil array tempat dari kategori yang dipilih.

```js
const placesTotal = selectedCategory.places.length;
```

Mengambil jumlah tempat di dalam kategori tersebut.

`.length` digunakan untuk mengetahui jumlah elemen array.

### Menampilkan Jumlah Tempat

```js
placesCount.textContent = `${placesTotal} PLACES`;
```

Mengubah teks jumlah tempat pada modal.

### Menampilkan Daftar Tempat

```js
renderPlaces(places);
```

Memanggil function `renderPlaces()` dengan array tempat yang sudah diambil.

Function tersebut akan membuat card tempat secara dinamis.

### Memperbarui Informasi Modal

```js
modalImage.src = selectedCategory.image;
modalImage.alt = selectedCategory.title;
```

Mengubah gambar dan teks alternatif sesuai kategori.

```js
modalNumber.textContent = `${selectedCategory.number} / ${selectedCategory.label}`;
```

Menampilkan nomor dan label kategori.

```js
modalLabel.textContent = selectedCategory.label;
modalTitle.textContent = selectedCategory.title;
modalDescription.textContent = selectedCategory.description;
```

Memperbarui informasi kategori lainnya.

Kenapa semuanya menggunakan `selectedCategory`?

Karena object tersebut sudah berisi seluruh informasi kategori yang dipilih.

### Mengatur Tampilan Modal

```js
categoryView.hidden = false;
placeView.hidden = true;
```

Memastikan tampilan daftar tempat terlihat dan tampilan detail tempat disembunyikan.

```js
document.querySelector(".modal-content").scrollTop = 0;
```

Mengatur posisi scroll konten modal kembali ke atas.

### Membuka Modal

```js
openDialog(categoryModal, modalImage);
```

Memanggil helper function `openDialog()`.

Parameter yang dikirim:

- `categoryModal`: modal yang ingin dibuka.
- `modalImage`: gambar yang perlu dipersiapkan sebelum modal ditampilkan.

---

## 13.3 Tombol Tutup Modal Kategori

Kode:

```js
modalClose.addEventListener("click", () => {
  closeDialog(categoryModal);
});
```

### Baris 1

Memasang event listener click pada tombol tutup.

### Baris 2

Memanggil `closeDialog()` dengan parameter `categoryModal`.

Artinya modal kategori ditutup melalui helper function yang sudah dijelaskan sebelumnya.

Kenapa tidak langsung menggunakan `.close()`?

Karena kita ingin animasi keluar dijalankan terlebih dahulu.

---

## 13.4 Menutup Modal Ketika Overlay Diklik

Kode:

```js
categoryModal.addEventListener("click", (event) => {
  if (event.target === categoryModal) {
    closeDialog(categoryModal);
  }
});
```

### Baris 1

Memasang event listener click pada elemen dialog.

### Baris 2

```js
if (event.target === categoryModal) {
```

Memeriksa apakah target klik adalah elemen dialog itu sendiri.

Kenapa perlu pemeriksaan ini?

Karena ketika pengguna mengeklik isi modal, target event adalah elemen di dalam dialog.

Sedangkan ketika pengguna mengeklik area overlay, target event adalah dialog itu sendiri.

### Baris 3

```js
closeDialog(categoryModal);
```

Menutup modal hanya ketika area overlay diklik.

Dengan begitu, mengeklik isi modal tidak akan membuat modal ikut tertutup.

---

# 14. Section Destinasi

Section ini menampilkan destinasi unggulan yang berasal dari array `destinations`.

## 14.1 Function renderDestinations()

Kode asli:

```js
function renderDestinations() {
  const destinationCards = destinations.map((destination) => {
    return `
      <article class="destination-card" data-destination-id="${destination.id}">
        <img src="${destination.image}" alt="${destination.name}">

        <div class="destination-info">
          <span>${destination.location}</span>
          <h3>${destination.name}</h3>
          <p>${destination.description}</p>
          <button class="destination-detail" type="button">
            Lihat Detail ↗
          </button>
        </div>
      </article>
    `;
  });

  destinationsGrid.innerHTML = destinationCards.join("");
}
```

### Baris 1

```js
function renderDestinations() {
```

Membuat function untuk menampilkan seluruh destinasi.

### Baris 2

```js
const destinationCards = destinations.map((destination) => {
```

Mengolah setiap object destinasi menggunakan `map()`.

Parameter `destination` mewakili satu object destinasi.

### Baris 3

```js
return `
```

Mengembalikan template literal yang berisi HTML card destinasi.

### Bagian Card

```html
<article class="destination-card" data-destination-id="${destination.id}">
```

Membuat elemen card dan menyimpan ID destinasi pada atribut `data-destination-id`.

Kenapa ID disimpan?

Supaya JavaScript dapat mengetahui destinasi mana yang dipilih ketika card diklik.

### Bagian Gambar

```html
<img src="${destination.image}" alt="${destination.name}">
```

Mengambil sumber gambar dan nama destinasi.

### Bagian Informasi

```html
<span>${destination.location}</span>
<h3>${destination.name}</h3>
<p>${destination.description}</p>
```

Menampilkan lokasi, nama, dan deskripsi destinasi.

### Tombol Detail

```html
<button class="destination-detail" type="button">
  Lihat Detail ↗
</button>
```

Membuat tombol yang secara visual mengarahkan pengguna untuk melihat detail destinasi.

`type="button"` memastikan tombol tidak bertindak sebagai tombol submit jika suatu saat berada di dalam form.

### Menggabungkan HTML

```js
destinationsGrid.innerHTML = destinationCards.join("");
```

- `destinationCards`: array berisi HTML card.
- `.join("")`: menggabungkan seluruh hasil menjadi satu string.
- `innerHTML`: memasukkan string HTML ke dalam container destinasi.

### Kenapa Menggunakan Cara Ini?

Karena data destinasi berasal dari `data.js`.

Jika jumlah destinasi bertambah, kita cukup menambahkan object baru ke array `destinations`. Function ini akan mengolahnya secara otomatis.

---

## 14.2 Event Listener Click Destinasi

Kode asli:

```js
destinationsGrid.addEventListener("click", (event) => {
  const clickedButton = event.target.closest(".destination-card");

  if (!clickedButton) return;

  const clickedCard = clickedButton.closest(".destination-card");
  const destinationId = clickedCard.dataset.destinationId;

  const selectedDestination = destinations.find((destination) => {
    return destination.id === destinationId;
  });

  if (!selectedDestination) return;

  destinationModalImage.src = selectedDestination.image;
  destinationModalImage.alt = selectedDestination.name;
  destinationModalLocation.textContent = selectedDestination.detail.alamat;
  destinationModalTitle.textContent = selectedDestination.name;
  destinationModalDescription.textContent = selectedDestination.description;
  destinationModalHistory.textContent = selectedDestination.detail.sejarah;

  destinationModalUniqueness.textContent = selectedDestination.detail.keunikan;

  destinationModalCulture.textContent = selectedDestination.detail.nilaiBudaya;

  openDialog(destinationModal, destinationModalImage);
});
```

### Baris 1

```js
destinationsGrid.addEventListener("click", (event) => {
```

Memasang event listener pada container destinasi.

Kita menggunakan event delegation karena card destinasi dibuat secara dinamis.

### Baris 2

```js
const clickedButton = event.target.closest(".destination-card");
```

Mencari elemen `.destination-card` terdekat dari elemen yang diklik.

**Catatan:** nama variabel `clickedButton` sebenarnya kurang tepat karena selector yang dicari adalah `.destination-card`, bukan tombol. Nama yang lebih sesuai adalah `clickedCard`.

Selain itu, karena selector-nya `.destination-card`, klik pada bagian mana pun di dalam card dapat memicu pembukaan modal, bukan hanya tombol "Lihat Detail".

### Baris 3

```js
if (!clickedButton) return;
```

Jika klik bukan berasal dari card destinasi, hentikan function.

### Baris 4

```js
const clickedCard = clickedButton.closest(".destination-card");
```

Mencari card destinasi dari elemen yang sebelumnya ditemukan.

Dalam kode saat ini, baris ini sebenarnya mengulang pencarian yang sama karena `clickedButton` sudah merupakan elemen `.destination-card`.

### Baris 5

```js
const destinationId = clickedCard.dataset.destinationId;
```

Mengambil ID destinasi dari atribut `data-destination-id`.

Ingat aturan dataset:

```html
data-destination-id
```

Dibaca melalui:

```js
dataset.destinationId
```

### Baris Berikutnya

```js
const selectedDestination = destinations.find((destination) => {
  return destination.id === destinationId;
});
```

Mencari object destinasi yang ID-nya cocok dengan ID dari card yang diklik.

`find()` mengembalikan satu object yang sesuai.

### Pengaman

```js
if (!selectedDestination) return;
```

Memastikan object destinasi berhasil ditemukan.

Jika tidak, function berhenti.

### Memperbarui Gambar

```js
destinationModalImage.src = selectedDestination.image;
destinationModalImage.alt = selectedDestination.name;
```

Mengubah gambar dan teks alternatif pada modal destinasi.

### Memperbarui Informasi

```js
destinationModalLocation.textContent = selectedDestination.detail.alamat;
```

Menampilkan alamat destinasi.

```js
destinationModalTitle.textContent = selectedDestination.name;
```

Menampilkan nama destinasi.

```js
destinationModalDescription.textContent = selectedDestination.description;
```

Menampilkan deskripsi destinasi.

```js
destinationModalHistory.textContent = selectedDestination.detail.sejarah;
```

Menampilkan sejarah destinasi.

```js
destinationModalUniqueness.textContent = selectedDestination.detail.keunikan;
```

Menampilkan keunikan destinasi.

```js
destinationModalCulture.textContent = selectedDestination.detail.nilaiBudaya;
```

Menampilkan nilai budaya destinasi.

Perhatikan bahwa beberapa informasi berada di dalam object `detail`, sehingga harus diakses menggunakan:

```js
selectedDestination.detail.namaProperti
```

### Membuka Modal

```js
openDialog(destinationModal, destinationModalImage);
```

Memanggil helper function `openDialog()` untuk membuka modal destinasi setelah gambar dipersiapkan.

---

## 14.3 Tombol Tutup Modal Destinasi

Kode:

```js
destinationModalClose.addEventListener("click", () => {
  closeDialog(destinationModal);
});
```

Ketika tombol tutup diklik, helper function `closeDialog()` dipanggil dengan modal destinasi sebagai parameter.

Prosesnya sama seperti penutupan modal kategori.

---

## 14.4 Menutup Modal Destinasi Melalui Overlay

Kode:

```js
destinationModal.addEventListener("click", (event) => {
  if (event.target === destinationModal) {
    closeDialog(destinationModal);
  }
});
```

Cara kerjanya sama seperti modal kategori:

1. Mendengarkan klik pada dialog.
2. Memeriksa apakah target klik adalah dialog itu sendiri.
3. Jika benar, memanggil `closeDialog()`.

Dengan demikian, modal dapat ditutup melalui area overlay.

---

# 15. Menjalankan Function Saat Website Dimuat

Bagian paling bawah `main.js`:

```js
renderCategories();

setInterval(changeHeroSlide, 4500);

preloadCategoryImages();

renderDestinations();
```

Bagian ini penting karena function yang sudah dibuat tidak otomatis berjalan hanya karena sudah didefinisikan.

Function harus dipanggil agar kode di dalamnya dijalankan.

## 15.1 renderCategories()

```js
renderCategories();
```

Menampilkan seluruh card kategori ke halaman.

## 15.2 setInterval()

```js
setInterval(changeHeroSlide, 4500);
```

Memanggil function `changeHeroSlide()` secara berulang dengan jeda 4500 milidetik.

4500 milidetik sama dengan 4,5 detik.

Apa itu `setInterval()`?

`setInterval()` merupakan method JavaScript yang menjalankan callback secara berulang berdasarkan interval waktu tertentu.

Bentuk umum:

```js
setInterval(callback, waktu);
```

Contoh:

```js
setInterval(() => {
  console.log("Halo");
}, 1000);
```

Callback dijalankan setiap 1 detik.

Dalam JejakNusa:

```js
setInterval(changeHeroSlide, 4500);
```

Browser akan menjalankan function pergantian slide setiap 4,5 detik.

Kenapa tidak menulis:

```js
changeHeroSlide();
```

Karena pemanggilan biasa hanya menjalankan function satu kali.

Sedangkan `setInterval()` mengatur pemanggilan berulang.

## 15.3 preloadCategoryImages()

```js
preloadCategoryImages();
```

Menjalankan proses preload gambar kategori.

## 15.4 renderDestinations()

```js
renderDestinations();
```

Menampilkan seluruh card destinasi ke halaman.

### Alur Awal Website

```text
main.js dimuat
     |
Import data
     |
Mengambil elemen DOM
     |
Mendefinisikan helper function
     |
Memasang event listener
     |
renderCategories()
     |
setInterval(changeHeroSlide)
     |
preloadCategoryImages()
     |
renderDestinations()
     |
Website siap digunakan
```

---

# 16. Konsep JavaScript yang Digunakan

Bagian ini merupakan rangkuman konsep yang muncul di berbagai function JejakNusa.

## 16.1 Function

Function adalah blok kode yang dibuat untuk menjalankan tugas tertentu.

Contoh:

```js
function renderCategories() {
  // Kode
}
```

Function dapat dipanggil berkali-kali.

Contoh:

```js
renderCategories();
```

Function juga dapat menerima parameter:

```js
function renderPlaces(places) {
  // Kode
}
```

Parameter memungkinkan function menerima data dari luar.

## 16.2 Callback Function

Callback adalah function yang dikirim sebagai argumen kepada function lain untuk dijalankan pada waktu tertentu.

Contoh:

```js
navLinks.forEach((link) => {
  // Kode
});
```

Function di dalam `forEach()` merupakan callback.

Callback juga digunakan pada:

- `addEventListener()`
- `map()`
- `find()`
- `setInterval()`
- `IntersectionObserver`

## 16.3 Array

Array digunakan untuk menyimpan beberapa nilai dalam satu variabel.

Contoh:

```js
const fruits = ["Apel", "Jeruk", "Mangga"];
```

Index array dimulai dari 0.

```js
fruits[0]; // Apel
fruits[1]; // Jeruk
fruits[2]; // Mangga
```

## 16.4 Object

Object menyimpan data dalam bentuk pasangan key dan value.

Contoh:

```js
const person = {
  name: "Maul",
  age: 16
};
```

Mengakses properti:

```js
person.name;
person.age;
```

## 16.5 map()

`map()` mengolah setiap elemen array dan menghasilkan array baru berdasarkan nilai yang dikembalikan callback.

Digunakan pada:

- `renderCategories()`
- `renderPlaces()`
- `renderDestinations()`

## 16.6 forEach()

`forEach()` menjalankan callback untuk setiap elemen array.

Tidak digunakan untuk menghasilkan array baru.

Digunakan pada:

- Pengaturan link navbar.
- Pengamatan section navbar.
- Preload gambar.
- Array dialog.

## 16.7 find()

`find()` mencari elemen pertama yang memenuhi kondisi.

Contoh:

```js
const selected = categories.find((category) => {
  return category.id === "rumah-adat";
});
```

Jika ditemukan, hasilnya adalah object yang cocok.

Jika tidak, hasilnya `undefined`.

Digunakan untuk mencari kategori dan destinasi berdasarkan ID.

## 16.8 join()

`join()` menggabungkan elemen array menjadi string.

Contoh:

```js
const words = ["Jejak", "Nusa"];

const result = words.join("");
```

Hasil:

```text
JejakNusa
```

Dalam project, digunakan untuk menggabungkan HTML hasil `map()`.

## 16.9 Template Literal

Template literal menggunakan tanda backtick.

Contoh:

```js
const name = "JejakNusa";

const message = `Selamat datang di ${name}`;
```

Template literal memungkinkan kita memasukkan variabel ke dalam string menggunakan `${}`.

Digunakan untuk membuat HTML card secara dinamis.

## 16.10 DOM Manipulation

DOM manipulation adalah proses mengubah struktur, isi, atribut, atau tampilan elemen HTML melalui JavaScript.

Contoh yang digunakan:

```js
element.textContent = "Teks baru";
element.innerHTML = "<h1>Judul</h1>";
element.src = "gambar.webp";
element.alt = "Deskripsi gambar";
element.hidden = true;
```

## 16.11 Event Handling

Event handling adalah proses menangani kejadian yang dilakukan pengguna atau browser.

Contoh:

```js
button.addEventListener("click", () => {
  // Kode
});
```

Event yang digunakan dalam project:

- `click`
- `keydown`
- `cancel`
- `animationend`

## 16.12 Event Delegation

Event delegation adalah pendekatan memasang event listener pada elemen parent untuk menangani event dari elemen anak.

Contoh:

```js
categoryTrack.addEventListener("click", (event) => {
  const card = event.target.closest(".category-card");

  if (!card) return;

  // Kode
});
```

Keuntungannya:

- Tidak perlu memasang listener pada setiap card.
- Bisa menangani elemen yang dibuat secara dinamis.
- Mengurangi jumlah event listener yang perlu dikelola.

## 16.13 dataset

`dataset` digunakan untuk membaca atribut HTML yang diawali `data-`.

Contoh HTML:

```html
<div data-category-id="rumah-adat"></div>
```

JavaScript:

```js
element.dataset.categoryId;
```

Aturan perubahan nama:

```text
data-category-id       -> dataset.categoryId
data-place-index       -> dataset.placeIndex
data-destination-id    -> dataset.destinationId
```

Nilai `dataset` berupa string.

Jika membutuhkan angka:

```js
const index = Number(element.dataset.placeIndex);
```

## 16.14 Optional Chaining

Contoh:

```js
element?.click();
```

Optional chaining mencegah akses lanjutan dilakukan ketika nilai di sebelah kirinya adalah `null` atau `undefined`.

## 16.15 Promise

Promise merupakan object yang merepresentasikan hasil proses asynchronous.

Dalam project, digunakan melalui:

```js
img.decode()
```

Kemudian ditangani menggunakan:

```js
.catch()
.then()
```

## 16.16 Modulo

Operator `%` menghasilkan sisa pembagian.

Contoh:

```js
5 % 3; // 2
```

Dalam slideshow, modulo digunakan agar indeks kembali ke awal ketika mencapai slide terakhir.

## 16.17 setInterval()

Menjalankan callback secara berulang dengan interval waktu tertentu.

Digunakan untuk slideshow hero.

## 16.18 IntersectionObserver

API browser untuk mengamati apakah sebuah elemen beririsan dengan area pengamatan.

Digunakan untuk menentukan link navbar yang sedang aktif.

## 16.19 classList

Digunakan untuk mengelola class CSS pada elemen.

| Method | Fungsi |
|---|---|
| `add()` | Menambahkan class. |
| `remove()` | Menghapus class. |
| `toggle()` | Membalik kondisi class. |
| `contains()` | Memeriksa keberadaan class. |

## 16.20 closest()

Mencari elemen terdekat yang sesuai dengan selector, dimulai dari elemen saat ini dan bergerak ke parent.

Digunakan dalam event delegation.

## 16.21 HTMLDialogElement

Project menggunakan elemen HTML `<dialog>`.

Method yang digunakan:

```js
dialog.showModal();
dialog.close();
```

- `showModal()` membuka dialog sebagai modal.
- `close()` menutup dialog.

## 16.22 Image()

Contoh:

```js
const image = new Image();
image.src = "./assets/images/rumah-gadang.webp";
```

Membuat object gambar baru untuk memulai proses pemuatan gambar tanpa harus langsung menampilkannya di halaman.

## 16.23 preventDefault()

Method untuk mencegah perilaku default browser dari suatu event.

Contoh:

```js
event.preventDefault();
```

Digunakan ketika kita ingin mengatur sendiri perilaku interaksi.

## 16.24 animationend

Event yang terjadi ketika animasi CSS selesai.

Dalam project, digunakan agar modal baru benar-benar ditutup setelah animasi keluar selesai.

---

# 17. Konsep HTML yang Mendukung JavaScript

Beberapa fitur JavaScript bergantung pada atribut dan elemen HTML.

## 17.1 data-*

Contoh:

```html
<article data-destination-id="tana-toraja">
```

Atribut `data-*` digunakan untuk menyimpan informasi tambahan pada elemen HTML.

Informasi ini dapat dibaca oleh JavaScript melalui `dataset`.

Dalam JejakNusa:

```html
data-category-id
data-place-index
data-destination-id
```

Masing-masing menghubungkan elemen HTML dengan data JavaScript.

## 17.2 hidden

Contoh:

```js
categoryView.hidden = true;
```

Menyembunyikan elemen.

Sedangkan:

```js
categoryView.hidden = false;
```

Menampilkan elemen.

Digunakan untuk berpindah antara daftar tempat dan detail tempat.

## 17.3 role dan tabindex

Contoh:

```html
<div role="button" tabindex="0">
```

- `role="button"` memberikan informasi bahwa elemen berperilaku seperti tombol.
- `tabindex="0"` memungkinkan elemen menerima fokus melalui navigasi keyboard.

Karena elemen tersebut bukan elemen `<button>` asli, JavaScript juga menangani tombol Enter dan Space agar card bisa digunakan melalui keyboard.

---

# 18. Menambahkan Data Baru

Karena data sudah dipisahkan ke `data.js`, kita tidak perlu mengubah banyak bagian `main.js` ketika ingin menambahkan konten.

## Menambahkan Kategori

Tambahkan object baru ke array `categories`.

Pastikan memiliki properti yang sesuai:

- `id`
- `number`
- `label`
- `title`
- `description`
- `image`
- `places`

## Menambahkan Tempat

Tambahkan object baru ke array `places` milik kategori.

Pastikan object tempat memiliki:

- `name`
- `location`
- `image`
- `description`
- `detail`
  - `asal`
  - `keunikan`
  - `nilaiBudaya`

## Menambahkan Hero Slide

Tambahkan object ke array `heroSlides`.

Pastikan memiliki:

- `image`
- `alt`
- `region`
- `location`

## Menambahkan Destinasi

Tambahkan object ke array `destinations`.

Pastikan memiliki:

- `id`
- `name`
- `location`
- `image`
- `description`
- `detail`
  - `alamat`
  - `sejarah`
  - `keunikan`
  - `nilaiBudaya`

Perhatikan bahwa nama properti harus sesuai dengan yang digunakan oleh `main.js`.

Jika nama properti berbeda, JavaScript tidak akan menemukan data yang diharapkan.

---

# 19. Hal yang Perlu Dipahami dari Project Ini

Setelah menyelesaikan JejakNusa, beberapa konsep penting yang perlu benar-benar dipahami adalah:

1. Bagaimana data dari `data.js` dikirim ke `main.js` menggunakan import dan export.
2. Bagaimana array dan object digunakan untuk menyimpan data website.
3. Bagaimana `map()` mengubah data menjadi HTML.
4. Kenapa hasil `map()` digabungkan menggunakan `join("")`.
5. Bagaimana `dataset` menghubungkan elemen HTML dengan object JavaScript.
6. Bagaimana `find()` mencari object berdasarkan ID.
7. Bagaimana event delegation menangani card yang dibuat secara dinamis.
8. Bagaimana parameter membuat satu function bisa digunakan untuk data berbeda.
9. Bagaimana callback digunakan dalam event listener dan method array.
10. Bagaimana Promise digunakan untuk menunggu proses decode gambar.
11. Bagaimana `setInterval()` dan modulo membuat slideshow terus berulang.
12. Bagaimana `IntersectionObserver` mendeteksi section yang sedang terlihat.
13. Bagaimana helper function mengurangi pengulangan proses yang sama.
14. Bagaimana beberapa function bekerja sama untuk menghasilkan satu fitur.

---

# 20. Pertanyaan Evaluasi

Coba jawab pertanyaan berikut tanpa langsung melihat penjelasan di atas.

### Data dan Array

1. Apa perbedaan `categories` dan `category`?
2. Kenapa `places` berada di dalam object kategori?
3. Apa perbedaan `map()` dan `forEach()`?
4. Kenapa hasil `map()` di project perlu digabungkan menggunakan `join("")`?
5. Apa yang dikembalikan `find()` ketika tidak menemukan object yang cocok?

### DOM dan Event

6. Apa perbedaan `querySelector()` dan `querySelectorAll()`?
7. Apa fungsi `event.target`?
8. Apa fungsi `closest()`?
9. Kenapa event delegation digunakan pada `categoryTrack`?
10. Kenapa nilai `dataset` perlu diubah menggunakan `Number()` ketika digunakan sebagai index array?

### Function

11. Kenapa `renderPlaces()` menerima parameter?
12. Kenapa `openDialog()` bisa digunakan untuk dua modal berbeda?
13. Apa fungsi `return` dalam callback `map()`?
14. Kenapa `activeCategory` perlu disimpan?
15. Apa perbedaan parameter dan argument?

### Slideshow

16. Kenapa `activeSlideIndex` menggunakan modulo?
17. Apa fungsi `activeImage` dan `nextImage`?
18. Kenapa kedua elemen gambar saling bertukar referensi?
19. Apa perbedaan pemanggilan function biasa dan `setInterval()`?

### Browser API dan Asynchronous

20. Apa fungsi `IntersectionObserver`?
21. Apa yang dikembalikan oleh `img.decode()`?
22. Kenapa `dialog.showModal()` dipanggil setelah proses decode?
23. Apa fungsi event `animationend`?
24. Kenapa `closeDialog()` tidak langsung memanggil `dialog.close()`?

---

# 21. Kesimpulan

JejakNusa merupakan latihan menggabungkan berbagai konsep JavaScript dalam satu project.

Alur utamanya:

```text
DATA
 |
 v
IMPORT
 |
 v
PENGOLAHAN DATA
 |
 v
RENDER HTML
 |
 v
EVENT LISTENER
 |
 v
INTERAKSI PENGGUNA
 |
 v
UPDATE DOM
```

Hal terpenting yang perlu dipahami bukan hanya bagaimana menulis setiap method, tetapi bagaimana data berpindah dari satu bagian kode ke bagian lainnya.

Contohnya ketika pengguna membuka detail tempat:

```text
Pengguna mengeklik card
          |
          v
Event listener menerima event
          |
          v
closest() menemukan card
          |
          v
dataset mengambil index
          |
          v
Number() mengubah string menjadi angka
          |
          v
activeCategory.places[index]
          |
          v
Object tempat ditemukan
          |
          v
Informasi dimasukkan ke DOM
          |
          v
showView() mengganti tampilan
```

Itulah salah satu alur penting yang menghubungkan data, DOM, event handling, array, object, dan function dalam JejakNusa.

**Tujuan akhir pembelajaran:** mampu membaca kembali kode sendiri, memahami alasan setiap baris ditulis, dan mampu mengembangkan fitur baru tanpa hanya mengandalkan menyalin kode dari sumber lain.
