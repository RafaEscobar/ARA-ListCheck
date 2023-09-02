//! Imports
import header from '../htmlRenders/header.html?raw';
import inputSection from '../htmlRenders/inputSection.html?raw';
import dropdown from '../htmlRenders/dropdown.html?raw';

/**
 * Create rendering of html sections
 * 
 * @param {idHTML} headerId - id from header section
 * @param {idHTML} inputSectionId - id from inputSection
 * @param {idHTML} dropdownId - id from dropdown section
 * @return void
 */
export const htmlRenders = (headerId, inputSectionId, dropdownId) => {
    //* Creating of div elements
    let boxHeader = document.createElement('div');
    let boxInputSection = document.createElement('div');
    let boxDropdown = document.createElement('div');

    //* InnerHTML of the html sections in divs created
    boxHeader.innerHTML = header;
    boxInputSection.innerHTML = inputSection;
    boxDropdown.innerHTML = dropdown;

    //* Action append of the divs with html sections
    document.querySelector(headerId).append(boxHeader);
    document.querySelector(inputSectionId).append(boxInputSection);
    document.querySelector(dropdownId).append(boxDropdown);
}