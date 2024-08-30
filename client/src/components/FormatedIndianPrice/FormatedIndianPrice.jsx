// Function to format the price in the Indian numbering system
const FormatedIndianPrice = (amount) => {
    // Convert number to string and split into whole and decimal parts (if any)
    const x = amount.toString().split('.');
    let lastThree = x[0].substring(x[0].length - 3);
    const otherNumbers = x[0].substring(0, x[0].length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    const formattedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return x.length > 1 ? formattedValue + '.' + x[1] : formattedValue;
};

export default FormatedIndianPrice;
