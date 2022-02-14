const DEFAULT_CSS = `
`;

const getCSS = async () => {
    const returnValue = localStorage.getItem("manageback_tobasics_globalCSS");
    if (returnValue === undefined) return await updateCSS(DEFAULT_CSS);
    else return returnValue;
};

/**
 * @param {string} value 
 * @returns {Promise<string>}
 */
const updateCSS = async (value) => {
    localStorage.setItem("manageback_tobasics_globalCSS", value.toString());
    const css = await getCSS();
    if (css !== null) return css;
    else return "";
};

window.addEventListener("DOMContentLoaded", async () => {
    const test = new CSSStyleSheet();
    document.styleSheets;
    console.log(test);
});