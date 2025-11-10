// let modeBtn = document.querySelector(".modeBtn")
// let modeToggle = document.querySelector(".modeToggle");

// let extension = [];
// let activeFilter = "all";

// let body = document.body;

// modeBtn.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   if (body.classList.contains("dark-mode")) {
//     modeToggle.src = "/assets/images/icon-sun.svg"
//   }
//   else {
//     modeToggle.src = "/assets/images/icon-moon.svg"
//   }
// })


// const container = document.querySelector(".container");
// const btnAll = document.querySelector(".allExtension");
// const btnActive = document.querySelector(".activeExtension");
// const btnInactive = document.querySelector(".inactiveExtension");


// fetch("./data.json")
//   .then(response => response.json())
//   .then(data => {
//     extension = data;
//     renderExtension();
//     setupFilterButtons();

//   }).catch(error => console.error("Error loading Error"));

// function renderExtension() {
//   container.innerHTML = "";


//   const list = extension.filter(item => {
//     if (activeFilter === "active") return item.isActive === true;
//     if (activeFilter === "inactive") return item.isActive === false;
//     return true;
//   })

//   list.forEach((ext, index) => {

//     const card = document.createElement("div");
//     card.classList.add("card");
//     card.dataset.index = index;

//     card.innerHTML = ` <div class="cardHeading">
//         <div class="cardImg">
//           <img src="${ext.logo}" alt="${ext.name}">
//         </div>
//         <div class="cardTitle">
//           <h3>${ext.name}</h3>
//           <div class="cardSubtitle">
//             <p>${ext.description}</p>
//             </div>
//           </div>
//       </div>

//       <div class="cardBtn">

//         <button class="Removebtn">Remove</button>
//         <input type="radio" name="active" class="activebtn">
//       </div>`

//     container.appendChild(card);


//     const checkbox = card.querySelector(".activebtn");
//     const text = card.querySelector("span");
  
//     checkbox.addEventListener("change", (e) => {
//       ext.isActive = e.target.checked;
//       text.textContent=ext.isActive? "active": "inactive";
//       renderExtension();
  
//     })
    
//   })
//   updateFilterUI()


// }




// function setupFilterButtons() {
//   btnAll.addEventListener("click", () => {
//     activeFilter = "all";
//     renderExtension();
//   })
//   btnActive.addEventListener("click", () => {
//     activeFilter = "active";
//     renderExtension();
//   })
//   btnInactive.addEventListener("click", () => {
//     activeFilter = "inactive";
//     renderExtension();
//   })
  
// }
// btnAll.addEventListener("click", () => { activeFilter = "all"; renderExtension(); });
// btnActive.addEventListener("click", () => { activeFilter = "active"; renderExtensions(); });
// btnInactive.addEventListener("click", () => { activeFilter = "inactive"; renderExtensions(); });


// function updateFilterUI() {
//   [btnAll, btnActive, btnInactive].forEach((btn) => 
//     btn.classList.remove("selected-filter")
//   );

//   if (activeFilter === "all") btnAll.classList.add("selected-filter");
//   if (activeFilter === "active") btnActive.classList.add("selected-filter");
//   if (activeFilter === "inactive") btnInactive.classList.add("selected-filter");
// }




// // // Fetch json data

// // fetch("./data.json")
// //   .then(response => response.json())
// //   .then(data => {
// //     const container = document.querySelector(".container")

// //     data.forEach(extansion => {
// //       const card = document.createElement("div")
// //       card.classList.add("card");
// //       card.innerHTML = ` <div class="cardHeading">
// //         <div class="cardImg">
// //           <img src="${extansion.logo}" alt="${extansion.name}">
// //         </div>
// //         <div class="cardTitle">
// //           <h3>${extansion.name}</h3>
// //           <div class="cardSubtitle">
// //             <p>${extansion.description}</p>
// //             </div>
// //           </div>
// //       </div>

// //       <div class="cardBtn">

// //         <button class="Removebtn">Remove</button>
// //         <input type="radio" name="active" class="activebtn">
// //       </div>`

// //       container.appendChild(card)

// //     });
// //   })
// //   .catch(error => console.error("Error Loading JSON", error));





// Select elements
const modeBtn = document.querySelector(".modeBtn");
const modeToggle = document.querySelector(".modeToggle");
const container = document.querySelector(".container");
const btnAll = document.querySelector(".allExtension");
const btnActive = document.querySelector(".activeExtension");
const btnInactive = document.querySelector(".inactiveExtension");

let extensions = [];
let activeFilter = "all";

// 🌙 Dark Mode Toggle
modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggle.src = "./assets/images/icon-sun.svg";
  } else {
    modeToggle.src = "./assets/images/icon-moon.svg";
  }
});

// 🧾 Fetch data from JSON file
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    extensions = data;
    showExtensions();
  })
  .catch(() => console.error("Error loading data"));

// 🧱 Show Extensions
function showExtensions() {
  container.innerHTML = ""; // clear old cards

  // Filter data
  const list = extensions.filter((ext) => {
    if (activeFilter === "active") return ext.isActive;
    if (activeFilter === "inactive") return !ext.isActive;
    return true;
  });

  // Create cards
  list.forEach((ext, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="cardHeading">
        <div class="cardImg">
          <img src="${ext.logo}" alt="${ext.name}">
        </div>
        <div class="cardTitle">
          <h3>${ext.name}</h3>
          <p class="cardSubtitle">${ext.description}</p>
        </div>
      </div>

      <div class="cardBtn">
        <button class="Removebtn">Remove</button>
        <label>
          <input type="checkbox" class="activebtn" ${ext.isActive ? "checked" : ""}>
          ${ext.isActive ? "Active" : "Inactive"}
        </label>
      </div>
    `;

    container.appendChild(card);

    // Remove button
    card.querySelector(".Removebtn").addEventListener("click", () => {
      extensions.splice(index, 1);
      showExtensions();
    });

    // Active toggle
    card.querySelector(".activebtn").addEventListener("change", (e) => {
      ext.isActive = e.target.checked;
      showExtensions();
    });
  });

  // Highlight active filter
  updateFilterUI();
}

// 🧭 Filter Buttons
btnAll.addEventListener("click", () => {
  activeFilter = "all";
  showExtensions();
});
btnActive.addEventListener("click", () => {
  activeFilter = "active";
  showExtensions();
});
btnInactive.addEventListener("click", () => {
  activeFilter = "inactive";
  showExtensions();
});

// 🎨 Highlight Selected Filter
function updateFilterUI() {
  [btnAll, btnActive, btnInactive].forEach((btn) =>
    btn.classList.remove("selected-filter")
  );

  if (activeFilter === "all") btnAll.classList.add("selected-filter");
  if (activeFilter === "active") btnActive.classList.add("selected-filter");
  if (activeFilter === "inactive") btnInactive.classList.add("selected-filter");
}
