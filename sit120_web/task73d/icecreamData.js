const icecreamSalesListJSON = {
    icecreams: [
        { name: "Vanilla", bestState: 'VIC', totalSold: 78923 },
        { name: "Chocolate", bestState: 'SA', totalSold: 23001 },
        { name: "Cookies 'n Cream", bestState: 'NT', totalSold: 43010 },
        { name: "Strawberry", bestState: 'VIC', totalSold: 29221 },
        { name: "Chocolate Chip", bestState: 'WA', totalSold: 62133 },
        { name: "Mint Chocolate Chip", bestState: 'TAS', totalSold: 12075 },
        { name: "Chocolate Chip Cookie Dough", bestState: 'NSW', totalSold: 39992 },
        { name: "Butter Pecan", bestState: 'ACT', totalSold: 45000 },
        { name: "Birthday Cake", bestState: 'QLD', totalSold: 3001 },
        { name: "Moose Tracks", bestState: 'WA', totalSold: 59004 }
    ]
};

const fullStateName = (state) => {
    // this is one way to do it, as suggested in the task sheet
    // ----------
    /*
    switch (state) {
        case "ACT":
            return "Australian Capital Territory";
        case "NSW":
            return "New South Wales";
        case "NT":
            return "Northern Territory";
        case "QLD":
            return "Queensland";
        case "SA":
            return "South Australia";
        case "TAS":
            return "Tasmania";
        case "VIC":
            return "Victoria";
        case "WA":
            return "Western Australia";
        default:
            return state;
    }
    */

    // personally, this is how i would have done it
    // ----------
    const states = {
        ACT: "Australian Capital Territory",
        NSW: "New South Wales",
        NT: "Northern Territory",
        QLD: "Queensland",
        SA: "South Australia",
        TAS: "Tasmania",
        VIC: "Victoria",
        WA: "Western Australia"
    };
    return states[state] || state;
};

const salesCategory = (userRating) => {
    if (userRating < 15000) {
        return "Below Average";
    } else if (userRating < 25000) {
        return "Pretty Good";
    } else if (userRating < 35000) {
        return "Great";
    } else if (userRating < 55000) {
        return "Fantastic";
    } else {
        return "Outstanding";
    }
};

const buildIcecreamList = () => {
    const icecreamDiv = document.getElementById("top_icecreams");
    const icecreams = icecreamSalesListJSON.icecreams;

    // keep track of things
    let totalSold = 0;
    let bestIndex = 0;
    let worstIndex = 0;
    let tableRows = "";

    icecreams.forEach((icecream, index) => {
        totalSold += icecream.totalSold;

        if (icecream.totalSold > icecreams[bestIndex].totalSold) {
            bestIndex = index;
        }

        if (icecream.totalSold < icecreams[worstIndex].totalSold) {
            worstIndex = index;
        }

        tableRows += `
            <tr>
                <td>${icecream.name}</td>
                <td>${fullStateName(icecream.bestState)}</td>
                <td>${icecream.totalSold}</td>
                <td>${salesCategory(icecream.totalSold)}</td>
            </tr>
        `;
    });

    const bestIcecream = icecreams[bestIndex];
    const worstIcecream = icecreams[worstIndex];
    const averageSold = Math.round(totalSold / icecreams.length);
    const averageCategory = salesCategory(averageSold);

    // this is not the most ideal way to do this
    // the "correct" way would be to create the elements manually, and add to them safely
    // this is also very unsafe. make sure the source data is properly sanitized
    // otherwise, malicious data might be able to escape out easily
    icecreamDiv.innerHTML = `
        <div class="table-wrapper">
            <table class="icecream-table">
                <thead>
                    <tr>
                        <th>Ice Cream Name</th>
                        <th>Best State</th>
                        <th>Total Sold</th>
                        <th>Sales Category</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>

        <p>Some statistics on the icecreams sold across all types:</p>

        <ul class="icecream-stats">
            <li>
                Best selling icecream:
                <strong>${bestIcecream.name}</strong>
                with ${bestIcecream.totalSold} sold from
                <strong>${fullStateName(bestIcecream.bestState)}</strong>
            </li>
            <li>
                Worst selling icecream:
                <strong>${worstIcecream.name}</strong>
                with ${worstIcecream.totalSold} sold from
                <strong>${fullStateName(worstIcecream.bestState)}</strong>
            </li>
            <li>
                Average number of icecreams sold:
                <strong>${averageSold}</strong>,
                which equates to a sales category of
                <strong>${averageCategory}</strong>
            </li>
        </ul>

        <p>
            Averages calculated from summing up all the <em>totalSold</em> values
            and dividing by the total number of icecreams in the list.
        </p>
    `;
};
