// Async function to simulate fetching data from an API
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data fetched"), 1000);
    });
}

// Top-level await
const data = await fetchData();
console.log(data); // Output: Data fetched
