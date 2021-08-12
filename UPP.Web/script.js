
function dashboardStats() {

    const counters = document.querySelectorAll('.counter');
    const speed = 20; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to slow and higher to slow
            const inc = Math.round(target / speed);

            //console.log(inc);
            //console.log(count);

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = count + inc;

                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });

}

function bkPanels() {
   var h01 = $("#pnl1").height();
   var h02 = $("#pnl2").height();
   debugger;

   if (h01 > h02)
       $("#pnl2").height(h01);
   if (h02 > h01)
       $("#pnl1").height(h02);
}





