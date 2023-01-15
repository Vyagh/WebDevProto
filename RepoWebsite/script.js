// Fetch crypto data from API
async function getCryptoData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await response.json();
    return data;
  }
  
  // Render crypto data to the table
  function renderCryptoData(data) {
    const cryptoTableBody = document.getElementById("crypto-table-body");
    data.forEach(coin => {
      const cryptoRow = document.createElement("tr");
      cryptoRow.innerHTML = `
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>$${coin.current_price}</td>
        <td>${coin.price_change_percentage_24h}%</td>
        <td>$${coin.market_cap}</td>
      `;
      cryptoTableBody.appendChild(cryptoRow);
    });
  }
  
  // Search function
  function searchCrypto() {
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.toLowerCase();
    const cryptoTableBody = document.getElementById("crypto-table-body");
    const cryptoRows = cryptoTableBody.getElementsByTagName("tr");
    Array.from(cryptoRows).forEach(row => {
      const cryptoName = row.getElementsByTagName("td")[0].textContent.toLowerCase();
      if (cryptoName.indexOf(searchTerm) === -1) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    });
  }
  
  // Get crypto data and render it to the table
  getCryptoData()
    .then(data => renderCryptoData(data))
    .catch(error => console.log(error));

  //For Dark mode button
  const toggleButton = document.getElementById("dark-mode-toggle");
  toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  });

  
  // Event listener for search button
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", searchCrypto);

  // Event listener for search input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", searchCrypto);

 // Form submit event listener
 const cryptoForm = document.getElementById("crypto-form");
 cryptoForm.addEventListener("submit", function(event) {
   event.preventDefault();
   alert("Form Submitted!");
 });