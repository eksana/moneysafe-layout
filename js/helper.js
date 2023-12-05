
export const convertStringToNumber = (str) => {
    const noSpaceStr = String(str).replace(/\s+/g, '');
    const num = parseFloat(noSpaceStr);

    if (!isNaN(num) && isFinite(num)) {

        return num;
    }
    else {
        return false;
    }
}

export const reformateDate = (dateStr) => {

    const [year, month, day] = dateStr.split("-");
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`

}