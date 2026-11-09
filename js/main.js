// Import dan Eksport
import { categories, heroSlides, destinations } from "./data.js";

// Ambil Elemen HTML nya doelu Guys
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const categoryTrack = document.querySelector("#category-track");
const scrollNext = document.querySelector("#scroll-next");
const scrollPrev = document.querySelector("#scroll-prev");
// Category Modal
const categoryModal = document.querySelector("#category-modal");
const modalClose = document.querySelector("#modal-close");

const modalImage = document.querySelector("#modal-image");
const modalNumber = document.querySelector("#modal-number");
const modalLabel = document.querySelector("#modal-label");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");

const placesCount = document.querySelector("#places-count");
const placesList = document.querySelector("#places-list");
// Modal Views
const categoryView = document.querySelector("#category-view");
const placeView = document.querySelector("#place-view");
const backToCategory = document.querySelector("#back-to-category");

// Place Detail
const detailLocation = document.querySelector("#detail-location");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailOrigin = document.querySelector("#detail-origin");
const detailUniqueness = document.querySelector("#detail-uniqueness");
const detailCulturalValue = document.querySelector("#detail-cultural-value");

const heroImageA = document.querySelector("#hero-image-a");
const heroImageB = document.querySelector("#hero-image-b");
const heroRegion = document.querySelector("#hero-region");
const heroLocation = document.querySelector("#hero-location");
// Kenapa empat elemen ini?
// - heroImageA dan heroImageB: bergantian menampilkan gambar.
// - heroRegion: memperbarui nomor dan wilayah.
// - heroLocation: memperbarui nama lokasi.

// Destinationss
const destinationsGrid = document.querySelector(".destinations-grid");
// Destinations Modals
const destinationModal = document.querySelector("#destination-modal");
const destinationModalClose = document.querySelector(
  "#destination-modal-close",
);

const destinationModalImage = document.querySelector(
  "#destination-modal-image",
);
const destinationModalLocation = document.querySelector(
  "#destination-modal-location",
);
const destinationModalTitle = document.querySelector(
  "#destination-modal-title",
);
const destinationModalDescription = document.querySelector(
  "#destination-modal-description",
);
// Kenapa sebanyak itu? Karena setiap elemen punya tugas berbeda: gambar, lokasi, judul, deskripsi, dan tombol tutup perlu kita manipulasi secara terpisah.
const destinationModalHistory = document.querySelector(
  "#destination-modal-history",
);

const destinationModalUniqueness = document.querySelector(
  "#destination-modal-uniqueness",
);

const destinationModalCulture = document.querySelector(
  "#destination-modal-culture",
);

// Helper dialog: decode gambar dulu supaya tidak patah saat animasi masuk,
// dan animasi keluar dijalankan sebelum dialog benar-benar ditutup.
function openDialog(dialog, img) {
  img
    .decode()
    .catch(() => {})
    .then(() => dialog.showModal());
}

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

function showView(show, hide) {
  hide.hidden = true;
  show.hidden = false;
  show.classList.remove("view-enter");
  void show.offsetWidth;
  show.classList.add("view-enter");
}

[categoryModal, destinationModal].forEach((dialog) => {
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault(); // Esc ikut lewat animasi keluar
    closeDialog(dialog);
  });
});

let activeSlideIndex = 0;

let activeImage = heroImageA;
let nextImage = heroImageB;

function changeHeroSlide() {
  activeSlideIndex = (activeSlideIndex + 1) % heroSlides.length;
  //   Ini memastikan indeks slide terus berputar. Misalnya ada 3 slide:
  // - Indeks 0 → 1
  // - Indeks 1 → 2
  // - Indeks 2 → 0

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
// - activeSlideIndex: menyimpan indeks slide yang sedang ditampilkan. Mulai dari 0, berarti slide pertama.
// - activeImage: elemen <img> yang saat ini terlihat.
// - nextImage: elemen <img> yang akan menampilkan gambar berikutnya.
// Kenapa activeImage dan nextImage menggunakan let? Karena nanti keduanya akan bertukar peran setelah transisi selesai.

// Interaksi/Responsive Navbar

// Note
// - classList adalah properti yang memungkinkan kita mengelola class CSS pada sebuah elemen.
// -Sedangkan toggle() & remove() adalah salah satu method-nya.
// - toggle() bukan hanya menambahkan class.
// - toggle() menambahkan class kalau belum ada.
// - toggle() menghapus class kalau sudah ada.
// Sementara itu:
// - add() = menambahkan class.
// - remove() = menghapus class.
// - contains() = memeriksa apakah class tersedia.
// Method	Perilaku
// add()	Memastikan class ada
// remove()	Memastikan class tidak ada
// toggle()	Membalik kondisi class
// contains()	Mengecek apakah class ada
hamburger.addEventListener("click", () => {
  // toggle() membalik kondisi class:
  // - Ada → dihapus.
  // - Tidak ada → ditambahkan.
  hamburger.classList.toggle("is-active");
  navMenu.classList.toggle("is-active");
});

// toggle() digunakan ketika kita ingin membalik kondisi.
// remove() digunakan ketika kita ingin memastikan class dihapus.

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Kalau remove() dijalankan ketika class tidak ada,
    // JavaScript tidak menghasilkan error dan tidak mengembalikan null atau undefined sebagai efek penghapusan.
    // Dia hanya memastikan class tersebut tidak ada.
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
    // Walaupun is-active belum ada, kode tetap berjalan normal.
  });
});

document.addEventListener("keydown", (event) => {
  // document.addEventListener("keydown", ...)
  // Kita meminta browser mendengarkan kejadian ketika tombol keyboard ditekan.
  // (event) => {}
  // Ini callback function.
  // Ketika kejadian terjadi, browser mengirimkan informasi kejadian tersebut ke callback melalui parameter event.
  if (event.key === "Escape") {
    // event.key
    // Kita mengambil informasi tombol yang ditekan.
    // Jadi event itu ibarat laporan kejadian yang dikirim browser kepada function kita.
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideNavbar = event.target.closest(".navbar");

  if (!clickedInsideNavbar) {
    hamburger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  }
});

const navSections = document.querySelectorAll(
  "#beranda, #eksplorasi, #destinations",
);

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

navSections.forEach((section) => {
  navObserver.observe(section);
});

// Eksplorasi

// Render Card Eksplorasi
// Note:
// map() bertugas mengolah setiap objek kategori menjadi sesuatu yang baru.
// Dalam kasus kita, setiap objek akan diubah menjadi HTML card.
// join("") menggabungkan hasil array menjadi satu string HTML.

function renderCategories() {
  const cards = categories.map((category) => {
    // Ubah setiap category menjadi HTML card
    //     Kenapa category, bukan categories?
    // Karena:
    // - categories = seluruh array.
    // - category = satu objek kategori yang sedang diproses.
    // Bayangkan isi array lu seperti ini:
    // categories = seluruh kumpulan kategori
    // map() mengambil satu objek:
    // category
    // 01 · Rumah Adat
    // map() mengambil objek berikutnya:
    // category

    // .map() mengambil setiap elemen array, menjalankan callback untuk elemen tersebut,
    //  lalu mengumpulkan setiap nilai yang dikembalikan (return) menjadi array baru.

    return `
     <div role="button" tabindex="0"
  class="category-card"
  data-category-id="${category.id}">
            <img
              src="${category.image}"
              alt="${category.title}"
            />

            <div class="category-info">
              <span> ${category.number} / ${category.label}</span>
              <h3>${category.title}</h3>
              <p>${category.description} ↗</p>
            </div>
          </div>`;
  });

  const gabungCards = cards.join("");

  categoryTrack.innerHTML = gabungCards;
  // appendChild() menerima Node atau elemen DOM, bukan string HTML biasa.
  // Sedangkan hasil join("") adalah string.
  //   Contoh:
  // const cards = ["Card 1", "Card 2"];
  // const gabungCards = cards.join("");
  // Hasil gabungCards adalah:
  // Card 1Card 2
  // Karena itu, untuk kasus kita, gunakan:
  // categoryTrack.innerHTML = gabungCards;
  // innerHTML memungkinkan browser membaca string tersebut sebagai markup HTML.
}

// scroll by Eksplorasi
// scrollBy() adalah method JavaScript untuk menggeser
//  posisi scroll suatu elemen berdasarkan jarak tertentu dari posisi scroll saat ini.
// Dalam project kita, elemen yang digeser adalah:
// categoryTrack
// Yaitu container yang menampung card-card Eksplorasi.
// Bayangkan posisi awalnya seperti ini:
// Posisi awal
// Rumah Adat
// Kuliner
// Tarian
// ...
// Container menampilkan card dari kiri ke kanan.
// Ketika tombol kanan diklik, container bergeser ke arah kanan sehingga card berikutnya terlihat.

scrollNext.addEventListener("click", () => {
  //  scrollNext.addEventListener("click", ...)
  // Artinya: ketika tombol scrollNext diklik, jalankan callback function.

  categoryTrack.scrollBy({
    // B. categoryTrack.scrollBy()
    // Kita meminta browser menggeser posisi scroll elemen categoryTrack.
    left: 312,
    // { left: 312 }
    // Ini adalah object yang berisi pengaturan arah dan jarak scroll.
    // Properti	Fungsi
    // left:	        Jarak scroll secara horizontal
    // top:	          Jarak scroll secara vertikal
    // behavior:	    Cara animasi scroll dilakukan
    // Nilai positif pada left menggeser ke kanan, sedangkan nilai negatif menggeser ke kiri.

    //     Kenapa nilainya 312?
    // Ingat CSS card kita?
    // .category-card {
    //   flex: 0 0 290px;
    // }
    // .category-track {
    //   gap: 22px;
    // }
    // Artinya:
    // - Lebar satu card = 290px.
    // - Jarak antarkartu = 22px.
    // Jadi:
    // 290 + 22 = 312\text{px}
    // Itulah alasan lu menggunakan 312.

    // Dengan begitu, setiap tombol diklik, container bergeser kira-kira sejauh satu card beserta jaraknya.
    behavior: "smooth",
    //     behavior: "smooth"
    // Memberikan animasi perpindahan yang halus.
    // Kalau tidak menggunakan smooth, perpindahan bisa dilakukan secara langsung tanpa animasi halus.
  });
});
scrollPrev.addEventListener("click", () => {
  categoryTrack.scrollBy({
    left: -312,
    //     Kenapa tombol kiri menggunakan angka negatif?
    // Kode lu:
    // scrollPrev.addEventListener("click", () => {
    //   categoryTrack.scrollBy({
    //     left: -312,
    //     behavior: "smooth",
    //   });
    // });

    // Karena arah scroll ditentukan oleh tanda angka:
    // left: -312
    // Menggeser kembali ke kiri sejauh 312px.

    // left: 312
    // Menggeser ke kanan sejauh 312px.
    // Jadi kedua tombol menggunakan method yang sama, hanya arah pergeserannya yang berbeda.
    behavior: "smooth",
  });
});
// Bedanya scrollBy() dan scrollTo()
// Ini juga penting buat catatan.
// Method	Cara kerja
// scrollBy()	Bergeser sejauh jarak dari posisi sekarang
// scrollTo()	Berpindah menuju posisi koordinat tertentu
// Contoh:
// // Bergeser 312px dari posisi sekarang
// categoryTrack.scrollBy({
//   left: 312,
//   behavior: "smooth",
// });
// // Menuju posisi horizontal 312px
// categoryTrack.scrollTo({
//   left: 312,
//   behavior: "smooth",
// });
// Misalnya posisi scroll sekarang sudah 624px:
// - scrollBy({ left: 312 }) → menuju 936px.
// - scrollTo({ left: 312 }) → kembali menu${ju 312px.

// scrollBy() merupakan method JavaScript untuk menggeser posisi scroll elemen
// berdasarkan jarak relatif dari posisi saat ini.
// Method ini menerima object pengaturan seperti left, top, dan behavior.
//  Nilai positif menggeser ke kanan atau bawah, sedangkan nilai negatif menggeser ke kiri atau atas.

function renderPlaces(places) {
  const cards = places.map((place, index) => {
    return `
      <article class="place-card"  data-place-index="${index}">
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

let activeCategory = null;
placesList.addEventListener("click", (event) => {
  const clickedPlace = event.target.closest(".place-card");
  // event.target.closest() mencari card yang diklik, termasuk ketika yang diklik adalah gambar atau teks di dalamnya.

  if (!clickedPlace) return;

  const placeIndex = Number(clickedPlace.dataset.placeIndex);
  // dataset.placeIndex mengambil index dari atribut HTML.
  // Number() mengubah nilai index dari string menjadi angka.

  const selectedPlace = activeCategory.places[placeIndex];
  // activeCategory.places[placeIndex] mengambil objek tempat berdasarkan index tersebut.

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

backToCategory.addEventListener("click", () => {
  modalImage.src = activeCategory.image;
  modalImage.alt = activeCategory.title;
  showView(categoryView, placeView);
});

function preloadCategoryImages() {
  categories.forEach((category) => {
    const image = new Image();
    image.src = category.image;
  });
}
// Modal Eksplorasi

categoryTrack.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.target.closest(".category-card")?.click();
  }
});

categoryTrack.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".category-card");

  if (!clickedCard) return;

  event.preventDefault();

  const categoryId = clickedCard.dataset.categoryId;

  const selectedCategory = categories.find((category) => {
    return category.id === categoryId;
    //     Apa yang sedang kita lakukan?
    // Ingat, categories adalah array yang berisi 8 objek kategori.
    // .find() akan mencari satu objek pertama yang memenuhi kondisi.
  });

  activeCategory = selectedCategory;
  // Variabel ini menyimpan kategori yang sedang dibuka.
  // Kenapa penting? Karena ketika pengguna memilih salah satu tempat, kita perlu mengetahui tempat tersebut berasal dari kategori mana.

  if (!selectedCategory) return;
  // Kenapa?
  // Karena .find() bisa menghasilkan undefined kalau tidak menemukan objek yang cocok. Tanpa pengaman, akses selectedCategory.image akan menghasilkan error.
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
  //   Apa yang terjadi?
  // Properti	Fungsinya
  // .src	Mengubah sumber gambar.
  // .alt	Mengubah deskripsi alternatif gambar.
  // .textContent	Mengubah teks di dalam elemen.
  // Kita menggunakan selectedCategory karena objek tersebut sudah berisi data kategori yang tadi berhasil ditemukan.

  categoryView.hidden = false;
  placeView.hidden = true;
  document.querySelector(".modal-content").scrollTop = 0;
  openDialog(categoryModal, modalImage);

  // console.log(categoryId);
  // console.log(selectedCategory);

  //   - event.target: elemen yang benar-benar diklik. Bisa gambar, judul, atau paragraf di dalam card.
  // - .closest(".category-card"): mencari elemen .category-card terdekat dari elemen yang diklik.
  // - .dataset.categoryId: mengambil nilai dari atribut data-category-id.
  // if (!clickedCard) return; memastikan kode berhenti kalau yang diklik bukan card kategori.
  // event.preventDefault() mencegah link menjalankan navigasi bawaannya karena sekarang card akan digunakan untuk membuka modal.
});

modalClose.addEventListener("click", () => {
  closeDialog(categoryModal);
  // close() adalah method bawaan <dialog> untuk menutup modal.
});

// categoryModal.addEventListener("click", (event) => {
//   if (event.target === categoryModal) {
//     // Kenapa event.target === categoryModal?
//     // Karena ketika pengguna mengeklik area overlay, target event-nya adalah elemen <dialog> itu sendiri.
//     // Sedangkan ketika mengeklik isi modal, target-nya adalah elemen di dalam dialog.
//     // Jadi modal hanya ditutup ketika area luar kontennya diklik.
//     closeDialog(categoryModal);
//   }
// });

categoryModal.addEventListener("click", (event) => {
  if (event.target === categoryModal) {
    // Kenapa event.target === categoryModal?
    // Karena ketika pengguna mengeklik area overlay, target event-nya adalah elemen <dialog> itu sendiri.
    // Sedangkan ketika mengeklik isi modal, target-nya adalah elemen di dalam dialog.
    // Jadi modal hanya ditutup ketika area luar kontennya diklik.
    closeDialog(categoryModal);
  }
});

// Desstinations Section

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
    //     Atribut	Kegunaan
    // class	    Identitas kelompok elemen untuk CSS/JS
    // id	        Identitas unik elemen
    // data-*	    Menyimpan informasi tambahan milik elemen
  });

  destinationsGrid.innerHTML = destinationCards.join("");
  //   map() mengolah setiap objek destinasi menjadi HTML card.
  // Template literal ` ` memungkinkan kita menyisipkan nilai menggunakan ${...}.
  // innerHTML memasukkan HTML hasil olahan ke elemen .destinations-grid.
  // join("") menggabungkan seluruh HTML card menjadi satu string.
}

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

destinationModalClose.addEventListener("click", () => {
  closeDialog(destinationModal);
});

destinationModal.addEventListener("click", (event) => {
  if (event.target === destinationModal) {
    closeDialog(destinationModal);
  }
});

renderCategories();
setInterval(changeHeroSlide, 4500);
preloadCategoryImages();
renderDestinations();
