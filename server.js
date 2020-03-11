// fix my website CSS
// do GIFs increase human resource interest?
// help make my password generator work
// help make my piano play notes while looping
// how do I get open source stuff into my app?


const bids = [];
const inquirer = require("inquirer");
const fs = require("fs");

const bidderQuestions = [
    {
        type: "list",
        message: "Would you like to post or bid?",
        choices: ["post", "bid", "exit"],
        name: "postOrBid"
    },
    {
        type: "input",
        message: "What is the item you would like to post?",
        name: "postItem"
    },
    {
        type: "list",
        message: "What category would you like to place your auction in?",
        choices: ["electronics", "antiques", "fashion", "toys", "misc"],
        name: "chosenCategory"
    },
    {
        type: "input",
        message: "What would you like your starting bid to be?",
        name: "startingBid"
    },
    {
        type: "list",
        message: "Would you like continue bidding?",
        choices: ["yes", "no"],
        name: "continueBidding"
    },
];



function bidOnItem() {
    RTCPeerConnection.query("SELECT * FROM products", function (err, data) {
        if (err)
            throw err;

            // console.log(data);
            const productArr = [];

            for (let i = 0; i < data.length; i++) {
                productArr.data.push(data[i].name)
            }
    })
}
console.log(data);
console.log(productArr);

inquirer.prompt([
    {
    name: "whichProduct",
    message: "Choose a product to bibd on",
    type: "rawlist",
    choices: productArr,
    },
    {
        name: "bidPrice",
        message: "What is the bid price?",
        type: "input",
        choices: productArr,
    },
]).then(function(productAnswers) {
    console.log(productAnswers);
});

