// ===================================
// AI Movie Ticket Booking System
// ===================================

// Movie Posters

const posters = {
  "Salaar": "salaar.jpg",
  "Pushpa 2": "pushpa2.jpg",
  "Kalki 2898 AD": "kalki.jpg",
  "OG": "og.jpg",
  "Spirit": "spirit.jpg",
  "Fauji": "fauji.jpg",
  "Varanasi": "varanasi.jpg"
};

let selectedSeats = [];

// ===========================
// Page Load
// ===========================

window.onload = function () {

    let today = new Date().toISOString().split("T")[0];

    document.getElementById("date").min = today;
    document.getElementById("date").value = today;

    createSeats();

    showRecommendation();

};

// ===========================
// Movie Change
// ===========================

function changeMovie(){

    let movie = document.getElementById("movie").value;

    document.getElementById("gposter").src =
        posters[movie] || "spirit.jpg";

    showRecommendation();

}

// ===========================
// AI Recommendation
// ===========================

function showRecommendation(){

    let movie = document.getElementById("movie").value;

    let text = "Please select a movie.";

    if(movie=="Salaar")
        text="🤖 AI Recommendation : Spirit";

    else if(movie=="Pushpa 2")
        text="🤖 AI Recommendation : OG";

    else if(movie=="Kalki 2898 AD")
        text="🤖 AI Recommendation : Varanasi";

    else if(movie=="OG")
        text="🤖 AI Recommendation : Salaar";

    else if(movie=="Spirit")
        text="🤖 AI Recommendation : OG";

    else if(movie=="Fauji")
        text="🤖 AI Recommendation : Spirit";

    else if(movie=="Varanasi")
        text="🤖 AI Recommendation : Kalki 2898 AD";

    document.getElementById("recommendation").innerHTML=text;

}
// ===========================
// Create Seats
// ===========================

function createSeats(){

    createSection("balcony", ["A","B","C"], 150);

    createSection("firstClass",
    ["D","E","F","G","H","I","J","K","L"], 100);

    createSection("secondClass",
    ["M","N","O"], 70);

}

// ===========================
// Create Section
// ===========================

function createSection(sectionId, rows, price){

    const section = document.getElementById(sectionId);

    section.innerHTML = "";

    rows.forEach(function(row){

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        // Row Name

        const rowName = document.createElement("div");
        rowName.className = "row-name";
        rowName.innerHTML = row;

        rowDiv.appendChild(rowName);

        // Left Seats (1-6)

        const left = document.createElement("div");
        left.className = "left";

        for(let i=1;i<=6;i++){

            left.appendChild(createSeat(row+i, i, price));

        }

        // Walkway

        const walkway = document.createElement("div");
        walkway.className = "walkway";

        // Right Seats (7-12)

        const right = document.createElement("div");
        right.className = "right";

        for(let i=7;i<=12;i++){

            right.appendChild(createSeat(row+i, i, price));

        }

        rowDiv.appendChild(left);
        rowDiv.appendChild(walkway);
        rowDiv.appendChild(right);

        section.appendChild(rowDiv);

    });

}

// ===========================
// Create Single Seat
// ===========================

function createSeat(code, number, price){

    const seat = document.createElement("button");

    seat.className = "seat";

    seat.innerHTML = number;

    seat.dataset.seat = code;

    seat.dataset.price = price;

    if(Math.random() < 0.15){

        seat.classList.add("booked");

    }

    seat.onclick = function(){

        toggleSeat(this);

    };

    return seat;

}
// ===========================
// Seat Selection
// ===========================

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

// ===========================
// AI Seat Suggestion
// ===========================

function updateAISuggestion(){

    let msg = "";

    if(selectedSeats.length === 0){

        msg = "Select seats to get AI recommendation.";

    }else if(selectedSeats.length === 1){

        msg = "🤖 AI: H5, H6, G5 & G6 are the best viewing seats.";

    }else if(selectedSeats.length === 2){

        msg = "❤️ AI: Couple seats selected.";

    }else if(selectedSeats.length >= 5){

        msg = "👨‍👩‍👧‍👦 AI: Group booking detected.";

    }else{

        msg = "✅ AI: Great seat selection.";

    }

    document.getElementById("bestSeat").innerHTML = msg;

}

// ===========================
// Total Price
// ===========================

function calculateTotal(){

    let total = 0;

    document.querySelectorAll(".seat.selected").forEach(function(seat){

        total += Number(seat.dataset.price);

    });

    document.getElementById("priceDisplay").innerHTML =
        "💰 Total Price : ₹" + total;
}
// ===========================
// Payment Method
// ===========================

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

// ===========================
// Payment Success
// ===========================

function paymentSuccess(){

    alert("✅ Payment Successful!");

}

// ===========================
// Book Ticket
// ===========================

function bookTicket(){

    const movie = document.getElementById("movie").value;
    const theatre = document.getElementById("theatre").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const payment = document.getElementById("payment").value;

    if(movie === ""){
        alert("Please select a movie.");
        return;
    }

    if(selectedSeats.length === 0){
        alert("Please select at least one seat.");
        return;
    }

    if(payment === ""){
        alert("Please select a payment method.");
        return;
    }

    // === ఇక్కడ ఈ కోడ్ రాయాలి ===
    const containerChildren = document.querySelector(".container").children;
    for (let i = 0; i < containerChildren.length - 1; i++) {
        containerChildren[i].style.display = "none";
    }
    // ============================

    document.getElementById("ticket").style.display = "block";

    document.getElementById("ticketPoster").src =
        posters[movie] || "spirit.jpg";

    document.getElementById("ticketMovie").innerHTML =
        "<b>Movie:</b> " + movie;

    document.getElementById("ticketTheatre").innerHTML =
        "<b>Theatre:</b> " + theatre;

    document.getElementById("ticketDate").innerHTML =
        "<b>Date:</b> " + date;

    document.getElementById("ticketTime").innerHTML =
        "<b>Show Time:</b> " + time;

    document.getElementById("ticketSeats").innerHTML =
        "<b>Seats:</b> " + selectedSeats.join(", ");

    document.getElementById("ticketAmount").innerHTML =
        document.getElementById("priceDisplay").innerHTML;

    document.getElementById("ticketPayment").innerHTML =
        "<b>Payment:</b> " + payment;

    const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("bookingId").innerHTML =
        "Booking ID : " + bookingId;

    document.getElementById("result").innerHTML =
        "🎉 Booking Successful. Enjoy your movie!";

    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });


    document.getElementById("ticket").scrollIntoView({ behavior: 'smooth', block: 'start' });

}