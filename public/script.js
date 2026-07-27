const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {
     const amount = document.getElementById("amount").value;
     if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

    try{

        payBtn.disabled = true;
        payBtn.innerText = "Creating Payment...";

        const response = await fetch("/payment-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
    }),
  });

        const data = await response.json();

        console.log(data);

        window.location.href = data.short_url;

    }

    catch(err){

        console.log(err);

        alert("Something went wrong");

        payBtn.disabled = false;
        payBtn.innerText = "Pay Now";

    }

});