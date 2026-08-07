// State
let selectedEdition = 'Standard Edition';
let selectedPrice = 69.99;
let selectedPlatform = 'PlayStation 5';
let selectedGamertag = '';
let selectedPayment = 'Visa •••• 4858';

function selectEdition(name, price) {
  selectedEdition = name;
  selectedPrice = price;

  document.getElementById('selected-edition-name').textContent = name;
  document.getElementById('pay-edition').textContent = name;
  document.getElementById('order-item').textContent = name;
  document.getElementById('pay-price').textContent = price.toFixed(2);
  document.getElementById('order-total').textContent = price.toFixed(2);
  document.getElementById('success-edition').textContent = name;
  document.getElementById('success-amount').textContent = price.toFixed(2);

  document.getElementById('modal-platform').classList.add('active');
}

function choosePlatform(platform) {
  selectedPlatform = platform;
  document.getElementById('success-platform').textContent = platform;

  // Reset user search
  document.getElementById('gamertag').value = '';
  document.getElementById('user-result').style.display = 'none';
  document.getElementById('btn-next-user').style.display = 'none';

  document.getElementById('modal-platform').classList.remove('active');
  document.getElementById('modal-user').classList.add('active');
}

function searchUser() {
  const input = document.getElementById('gamertag');
  const name = input.value.trim();

  if (!name) {
    alert('Masukkan Gamertag terlebih dahulu!');
    return;
  }

  selectedGamertag = name;

  // Update tampilan user result
  const firstLetter = name.charAt(0).toUpperCase();
  document.getElementById('user-avatar').textContent = firstLetter;
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-status').textContent = selectedPlatform + ' · Online';

  document.getElementById('user-result').style.display = 'flex';
  document.getElementById('btn-next-user').style.display = 'block';
}

function goToPayment() {
  if (!selectedGamertag) {
    alert('Cari dan pilih user terlebih dahulu!');
    return;
  }

  // Update payment summary
  const firstLetter = selectedGamertag.charAt(0).toUpperCase();
  document.getElementById('pay-avatar').textContent = firstLetter;
  document.getElementById('pay-gift-name').textContent = 'Gifting ' + selectedGamertag;

  document.getElementById('modal-user').classList.remove('active');
  document.getElementById('modal-payment').classList.add('active');
}

function selectPay(el) {
  document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;

  selectedPayment = el.getAttribute('data-method');
}

function processPayment() {
  // Update processing text
  document.getElementById('processing-text').textContent = 'Completing purchase via ' + selectedPayment + '...';

  document.getElementById('modal-payment').classList.remove('active');
  document.getElementById('modal-processing').classList.add('active');

  // Generate random Order ID
  const orderId = 'EA-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                  Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                  Math.floor(Math.random() * 9000 + 1000);

  setTimeout(() => {
    document.getElementById('modal-processing').classList.remove('active');

    // Update success screen
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('success-date').textContent = 'Gift sent · ' + now.toLocaleString('en-GB', options).replace(',', '');

    document.getElementById('success-gamertag').textContent = selectedGamertag;
    document.getElementById('success-edition').textContent = selectedEdition;
    document.getElementById('success-platform').textContent = selectedPlatform;
    document.getElementById('success-amount').textContent = selectedPrice.toFixed(2);
    document.getElementById('success-payment').textContent = selectedPayment;
    document.getElementById('success-orderid').textContent = orderId;

    document.getElementById('modal-success').classList.add('active');
  }, 2500);
}

function backToPlatform() {
  document.getElementById('modal-user').classList.remove('active');
  document.getElementById('modal-platform').classList.add('active');
}

function backToUser() {
  document.getElementById('modal-payment').classList.remove('active');
  document.getElementById('modal-user').classList.add('active');
}

function closeAll() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

