window.onload = () => {
    // window.setTimeout(() => {
    //     document.getElementById('preloader').style.display = 'none';
    // }, 100)
};
window.onscroll = () => {
    if ($(this).scrollTop()) {
        $("#toTop").fadeIn();
    } else {
        $("#toTop").fadeOut();
    }
};

$("#toTop").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 100);
});
jQuery(function() {
    window.setTimeout(() => {
        document.getElementById("LAVLoader").style.display = "none";
    }, 500);

    // let address = "";
    // const job = setInterval(() => {
    //   const walletAddress = document.getElementById("id-wallet-address");
    // if (walletAddress) {
    // address = walletAddress.value;
    // const blockpass = new BlockpassKYCConnect("bscpad_pub", {
    //   env: "prod",
    // });
    // // console.log("address kyc==>", address);
    // blockpass.startKYCConnect();

    // blockpass.on("KYCConnectSuccess", () => {
    //   //add code that will trigger when data have been sent. ex:
    //   //alert('Success!')
    // });

    // blockpass.on("KYCConnectClose", () => {
    //   //add code that will trigger when the workflow is finished. ex:
    //   //alert('Finished!')
    // });

    // blockpass.on("KYCConnectCancel", () => {
    //   //add code that will trigger when the workflow is aborted. ex:
    //   //alert('Cancelled!')
    // });

    //     clearInterval(job);
    //   }
    // }, 1000);

    // const address = document.getElementById('id-wallet-address').value
});