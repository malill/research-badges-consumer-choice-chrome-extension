console.log("Product Navigator Amazon [v2]")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const PROLIFIC_ID = urlParams.get('prolificID');
const EXPERIMENT_GROUP = urlParams.get('experimentGroup')


if (PROLIFIC_ID) {
    console.log('Prolific ID is:', PROLIFIC_ID);
} else {
    console.log("No Prolific ID provided in URL params. Need to generate ID for user...");
}

if (EXPERIMENT_GROUP) {
    console.log('User is assigned to:', EXPERIMENT_GROUP);
} else {
    console.log('User is not assigned to a group. Need to draw group assignment for user...');
}
