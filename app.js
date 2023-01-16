// kullanacağımız butonları önce seçiyoruz.
const table = document.querySelector("table");
const begin = document.querySelector(".books-title");
let bookTitle = document.querySelector("#name");
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookIsRead = document.querySelector("#read");
const btn = document.querySelector("#submit");
const form = document.querySelectorAll("form");
const readedBook = document.querySelector(".alldone");

// bu fonksiyon ile hazırladığım popun gözükmesi için style özelliğini block haline getiriyorum.
function div_show() {
  document.getElementById("abc").style.display = "block";
}
// bu arada ise hazırladğım popupı styl özelliğine erişerek none getirerek kapatıyoruz.
function div_hide() {
  document.getElementById("abc").style.display = "none";
}
// eklenen kitapları saklayacağımız boş bir array.
let myLibrary = [];

// burada tanımladığım fonksiyon 4 parametre alıyor girilen bilgilere göre this keyword ile örnek nesnesi tanımlanıyor thitle paramtesi nesnin title özelliğini ataması gibi

function bookInfo(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "Okundu" : "Okunmadı";
}

btn.addEventListener("click", addbooktoLibrary);

function addbooktoLibrary() {
  // kitap eklediğimiz oluşacak olaylar
  const books = []; // öncellikle boş bir aray tanımlıyoru sebebini ilereyen satırlarda açıklayacğaım.
  let title = bookTitle.value; // fonk için scope özellikli değişken bir tanımlıyorum onu. book titleın valuesa yani inputa bağladım
  let author = bookAuthor.value; // aynı özelliği burada da kullandım
  let pages = bookPages.value; // ve aynısı
  let read = bookIsRead.checked; // burada ise checked döndüreceği true false olayını ayarladım ki yukarıda 20. satırda görüldüğü üzere
  // read parametresi true dönerse okundu false dönerse okunmadı olarak adlandıralacak.

  let newBook = new bookInfo(title, author, pages, read); // burada ise newbook adındaki değişkenenin bookınfo olduğunu söylüyorum

  if (newBook.title === "" || newBook.author === "" || newBook.pages === "") {
    return alert("Bilgileri Eksik Girmeyiniz");
  } // burada girilen bilgilerin eksik olması doğrultusunda bir uyarıcı geliyor.

  books.push(newBook); // burada yeni oluşturduğumuz newbook nesneyi books dizisiye ekliyoruz.
  myLibrary.push(newBook); // aynı şekilde oluşturdğumu nesneyi verileri saklayacağımız libraryı dizisine ekliyoruz.
  const keys = Object.keys(newBook); // keys methodu ile oluşturduğumuz nesneyi tüm anahtarlarını bir dizi olarak döndürr.ve bunları keys içine atar.

  for (const book of books) {
    // buradaki ise her bir books nesnesi için yeni bir tablo satırı oluşturur
    //ooksu neden kullandığmız burada önemli oluyor burada books yerine
    //my library kullansaydım hep bir eleman için olduğu için ve genel nesnelerimiz için kullandığımız library
    //içnide 2 3 4 kaç tane ekledesiydek nesne olacağı için her ekleme yaptığımızda
    //daha fazla satır oluşturacak önceki her bir nesne için için yeniden bir tane tablo satırı
    const tr = document.createElement("tr");
    tr.classList.add("books-info"); // sonrasında oluşturduğumuz trye books info adı verilen classı ekledik
    for (const key of keys) {
      // burada ise her nesne öğesine atanan anahtarın hepsi td ekleyerek tablo satırımıza ekliyoruz.
      const td = document.createElement("td");
      // burada ise okudun bilgisinin buton olmasından ötürü onu ayrı oluşturmamız gerekiyor
      if (book[key] === "Okundu" || book[key] === "Okunmadı") {
        // book[keyleri] içindeki bilgi okudun ila okunmadı bilgisi içeriyorsa
        // template literal kullanarak ısRead classına sahip olarak üretiyoruz.
        td.innerHTML = `<button class="ısRead">${book[key]}</button>`;
      } else {
        td.innerText = book[key]; // burada ise td içine innertext ile book[keyleri ekliyoruz.]
      }

      tr.appendChild(td); // tdleri trnin içine chil olarak ekliyoruz.
    }
    tr.insertAdjacentHTML(
      // ardından trnin delete butunu ekliyoruz.
      "beforeend", // before end ile en sonra ekliyoruz.
      `<td><button class="delete">DELETE</button></td>`
    );
    table.appendChild(tr); // oluşturdupumuz tryi table öğesine ekliyerek hazılıyoruz.
  }

  bookTitle.setAttribute("placeholder", bookTitle.value); // burada place holder özelliğine eklenen kitabı ekleyerek kullanıcı için en son eklediği kitabı görerek kullanıcı deneyimi zenginleştirmek istenmiştir.
  bookTitle.value = ""; // bunları boşaltarak yeniden kitap eklemek isteyenlerin önceki kitapların bilgileri boşaltarak rahat bir kullanım sonmayı hedelenmiştir.
  bookAuthor.setAttribute("placeholder", bookAuthor.value);
  bookAuthor.value = "";
  bookPages.value = "";

  const delbtn = document.querySelectorAll(".delete");
  delbtn.forEach((button) =>
    button.addEventListener("click", function () {
      // delete fonksiyonu oluşturma her bir delete butonuna erişmek için
      // foreach metodu kullandım onlarında hepsine click eventi ekledim.
      const dugum = button.parentNode.parentNode; // burada ise o butunon tr sinin silinmesi için parentnode ile ike kere parentına eriştim
      // ilk parentnode bana bulunduğu td yi verirken ikinicisi ise satırı verir ve onu
      dugum.remove(); // elde ettiğimiz satırı remove methodu ile sileriz
    })
  );
}
const uptbtn = document.querySelector(".ısRead");

window.addEventListener("click", function (e) {
  // burada ise ekrana click eventi ekleriz
  if (e.target.innerText == "Okundu") {
    // eğer tıkladığımız eventin innertexti okundu ise okunmadıya çevirir.
    e.target.innerText = "Okunmadı"; //
  } else if (e.target.innerText == "Okunmadı") {
    // değilse okunmadı yazsını okundu olarak değitirir.
    e.target.innerText = "Okundu";
  }
});
// özelliklik üstüne eklemeler yapacağım asıl amacaım sayfadaki okunmuş tuşuna bastığım zaman sadece okunanları göstermek
readedBook.addEventListener("click", function () {
  const okunan = myLibrary.map((books) => books);
  okunan.filter((keys) => console.log(keys.read));
  console.log(myLibrary);
});
