// ===================================
// AI Movie Ticket Booking System
// ===================================

const posters = {
  "Salaar": "salaar.jpg",
  "Pushpa 2": "pushpa2.jpg",
  "Kalki 2898 AD": "kalki.jpg",
  "OG": "og.jpg",
  "Spirit": "spirit.jpg",
  "Fauzi": "fauzi.jpg",
  "Varanasi": "varanasi.jpg"
};

const cityTheatresMap = {
  "Hyderabad": [
    "AMB Cinemas",
    "AAA Cinemas",
    "Aparna Cinemas",
    "Prasads Multiplex",
    "PVR Cinemas",
    "INOX"
  ],
  "Vijayawada": [
    "LEPL ICON",
    "Capital Cinemas",
    "INOX Laila Mall",
    "Cinepolis PVP Sequence Mall",
    "Cinepolis Powder One Mall"
  ],
  "Tiruvuru": [
    "Sri Krishna Theatre",
    "Sri Venkateswara Theatre",
    "New Palace Theatre"
  ],
  "Mylavaram": [
    "Narayana Theatre",
    "Sanghamitra Theatre"
  ],
  "Kondapalli": [
    "Siva Krishna Cinemas"
  ],
  "Vissannapeta": [
    "Venkateswara Theatre",
    "Sri Ram Theatre"
  ],
  "Nuzvid": [
    "Dwaraka Theatre",
    "Sathynarayana Theatre"
  ],
  "Guntur": [
    "Cine Prime Theatre",
    "Mythri Cinemas",
    "JLE Cinemas",
    "GS Cinemas"
  ]
};

function changeCity() {
    const citySelect = document.getElementById("city");
    const theatreSelect = document.getElementById("theatre");
    const selectedCity = citySelect.value;

    theatreSelect.innerHTML = '<option value="">-- Select Theatre --</option>';

    if (selectedCity && cityTheatresMap[selectedCity]) {
        cityTheatresMap[selectedCity].forEach(function(theatre) {
            const option = document.createElement("option");
            option.value = theatre;
            option.textContent = theatre;
            theatreSelect.appendChild(option);
        });
    }
}

let selectedSeats = [];

window.onload = function () {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("date").min = today;
    document.getElementById("date").value = "";

    createSeats();
    showRecommendation();
    adjustScreenText(); // App crash avvakunda load avvagane interface calculation check chesthundi
};

function changeMovie(){
    let movieElement = document.getElementById("movie");
    let movie = movieElement.value;
    
    let posterImg = document.getElementById("gposter");
    if(posterImg) {
        posterImg.src = posters[movie] || "spirit.jpg";
    }
    
    showRecommendation();
}

function showRecommendation(){
    let movie = document.getElementById("movie").value;
    let text = "Please select a movie.";

    if(movie=="Salaar") text="🤖 AI Recommendation : Spirit";
    else if(movie=="Pushpa 2") text="🤖 AI Recommendation : OG";
    else if(movie=="Kalki 2898 AD") text="🤖 AI Recommendation : Varanasi";
    else if(movie=="OG") text="🤖 AI Recommendation : Salaar";
    else if(movie=="Spirit") text="🤖 AI Recommendation : Fauzi";
    else if(movie=="Fauzi") text="🤖 AI Recommendation : Pushpa 2";
    else if(movie=="Varanasi") text="🤖 AI Recommendation : Kalki 2898 AD";

    document.getElementById("recommendation").innerHTML=text;
}

function createSeats(){
    const balconyRows = [
        { row: "A", leftEnd: 13, rightStart: 14, rightEnd: 26, extraMiddle: true },
        { row: "B", leftEnd: 13, rightStart: 14, rightEnd: 26, extraMiddle: false },
        { row: "C", leftEnd: 13, rightStart: 14, rightEnd: 26, extraMiddle: false }
    ];

    const sectionBalcony = document.getElementById("balconyClass");
    sectionBalcony.innerHTML = "";
    balconyRows.forEach(function(item){
        renderRow(sectionBalcony, item, 150);
    });

    let firstClassRows = [];
    ["D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R"].forEach(r => {
        firstClassRows.push({ row: r, leftEnd: 13, rightStart: 14, rightEnd: 26, extraMiddle: false });
    });
    const sectionFirst = document.getElementById("firstClass");
    sectionFirst.innerHTML = "";
    firstClassRows.forEach(function(item){
        renderRow(sectionFirst, item, 100);
    });

    let secondClassRows = [];
    ["S","T","U","V","W"].forEach(r => {
        secondClassRows.push({ row: r, leftEnd: 13, rightStart: 14, rightEnd: 26, extraMiddle: false });
    });
    const sectionSecond = document.getElementById("secondClass");
    sectionSecond.innerHTML = "";
    secondClassRows.forEach(function(item){
        renderRow(sectionSecond, item, 70);
    });
}

function renderRow(section, item, price){
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    const rowName = document.createElement("div");
    rowName.className = "row-name";
    rowName.innerHTML = item.row;
    rowDiv.appendChild(rowName);

    const left = document.createElement("div");
    left.className = "left";

    for(let i = 1; i <= item.leftEnd; i++){
        left.appendChild(createSeat(item.row + i, i, price));
    }

    const walkway = document.createElement("div");
    walkway.className = "walkway";

    if(item.extraMiddle){
        walkway.innerHTML = '<div style="width:48px; height:22px;"></div>';
    }

    const right = document.createElement("div");
    right.className = "right";

    for(let i = item.rightStart; i <= item.rightEnd; i++){
        right.appendChild(createSeat(item.row + i, i, price));
    }

    rowDiv.appendChild(left);
    rowDiv.appendChild(walkway);
    rowDiv.appendChild(right);

    section.appendChild(rowDiv);
}

function createSeat(code, number, price){
    const seat = document.createElement("button");
    seat.className = "seat";
    seat.innerHTML = number;
    seat.dataset.seat = code;
    seat.dataset.price = price;

    if(Math.random() < 0.12){
        seat.classList.add("booked");
    }

    seat.onclick = function(){
        toggleSeat(this);
    };

    return seat;
}

function toggleSeat(btn){
    if(btn.classList.contains("booked")){
        alert("❌ This seat is already booked.");
        return;
    }

    const seatCode = btn.dataset.seat;

    if(btn.classList.contains("selected")){
        btn.classList.remove("selected");
        selectedSeats = selectedSeats.filter(s => s !== seatCode);
    }else{
        btn.classList.add("selected");
        selectedSeats.push(seatCode);
    }

    document.getElementById("selectedSeats").innerHTML =
        "🎟 Selected Seats : " +
        (selectedSeats.length ? selectedSeats.join(", ") : "None");

    updateAISuggestion();
    calculateTotal();
}

function updateAISuggestion(){
    let msg = "";
    if(selectedSeats.length === 0){
        msg = "Select seats to get AI recommendation.";
    }else if(selectedSeats.length === 1){
        msg = "🤖 AI: G5, G6, H5 & H6 are the best viewing seats.";
    }else if(selectedSeats.length === 2){
        msg = "❤️ AI: Couple seats selected.";
    }else if(selectedSeats.length >= 5){
        msg = "👨‍👩‍👧‍👦 AI: Group booking detected.";
    }else{
        msg = "✅ AI: Great seat selection.";
    }
    document.getElementById("bestSeat").innerHTML = msg;
}

function calculateTotal(){
    let total = 0;
    document.querySelectorAll(".seat.selected").forEach(function(seat){
        total += Number(seat.dataset.price);
    });
    document.getElementById("priceDisplay").innerHTML = "💰 Total Price : ₹" + total;
}

function paymentChange(){
    let payment = document.getElementById("payment").value;

    document.getElementById("qrBox").style.display = "none";
    document.getElementById("cardBox").style.display = "none";

    if(payment === "UPI"){
        document.getElementById("qrBox").style.display = "block";
    }

    if(payment === "Credit Card" || payment === "Debit Card"){
        document.getElementById("cardBox").style.display = "block";
    }
}

function paymentSuccess(){
    alert("✅ Payment Successful!");
}

function nextStep(stepId) {
    if (stepId === 'step2') {
        const movie = document.getElementById("movie").value;
        if (movie === "") {
            alert("Please select a movie.");
            return;
        }
    }

    if (stepId === 'step3') {
        const city = document.getElementById("city").value;
        const theatre = document.getElementById("theatre").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (city === "" || theatre === "" || date === "" || time === "") {
            alert("Please select City, Theatre, Date, and Show Time.");
            return;
        }
    }

    if (stepId === 'step4') {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
    }

    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
    
    // Step 3 layout visible avvagane text size render trigger function apply avthundi
    if (stepId === 'step3') {
        setTimeout(adjustScreenText, 50);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(stepId) {
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
    
    if (stepId === 'step3') {
        setTimeout(adjustScreenText, 50);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bookTicket(){
    const payment = document.getElementById("payment").value;

    if(payment === ""){
        alert("Please select a payment method.");
        return;
    }

    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById("step5").classList.add('active');

    const movie = document.getElementById("movie").value;
    const city = document.getElementById("city").value;
    const theatre = document.getElementById("theatre").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
