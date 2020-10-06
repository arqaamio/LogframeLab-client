// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
  

declare global {
  namespace Cypress {
    interface Chainable {
       // attach_file: typeof attach_file;
        uploadFile: typeof uploadFile;
        upload_file: typeof upload_file;
    }
  }
}

function attach_file
// {
//   prevSubject: 'element',
// },
(input, fileName, fileType)  {
    cy.fixture(fileName)
      .then((content) => Cypress.Blob.base64StringToBlob(content, fileType))
      .then((blob) => {
        const testFile = new File([blob], fileName);
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);
        input[0].files = dataTransfer.files;
        return input;
      });
}

// Cypress.Commands.add('customCommand', customCommand);
  //new command
Cypress.Commands.add(
    'attach_file', attach_file
  );
  
  /**
 * Converts Cypress fixtures, including JSON, to a Blob. All file types are
 * converted to base64 then converted to a Blob using Cypress
 * expect application/json. Json files are just stringified then converted to
 * a blob (prevents issues with invalid string decoding).
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 * @return {Promise} Resolves with blob containing fixture contents
 */
function getFixtureBlob(fileUrl, type) {
    return type === 'application/json'
      ? cy
          .fixture(fileUrl)
          .then(JSON.stringify)
          .then(jsonStr => new Blob([jsonStr], { type: 'application/json' }))
      : cy.fixture(fileUrl, 'base64').then(Cypress.Blob.base64StringToBlob)
  }
  
  /**
   * Uploads a file to an input
   * @memberOf Cypress.Chainable#
   * @name uploadFile
   * @function
   * @param {String} selector - element to target
   * @param {String} fileUrl - The file url to upload
   * @param {String} type - content type of the uploaded file
   */
  Cypress.Commands.add('uploadFile', uploadFile);
  function uploadFile(selector, fileUrl, type = '') {
    return cy.get(selector).then(subject => {
      return getFixtureBlob(fileUrl, type).then(blob => {
        return cy.window().then(win => {
          const el = subject[0]
          const nameSegments = fileUrl.split('/')
          const name = nameSegments[nameSegments.length - 1]
          const testFile = new win.File([blob], name, { type })
          const dataTransfer = new win.DataTransfer()
          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files
          return subject
        })
      })
    })
  }

const upload_file = (fileName, fileType, selector) => {
cy.get(selector).then(subject => {
    cy.fixture(fileName, 'hex').then((fileHex) => {

        const fileBytes = hexStringToByte(fileHex);
        const testFile = new File([fileBytes], fileName, {
            type: fileType
        });
        const dataTransfer = new DataTransfer()
        const el = subject[0]

        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
    })
})
}
Cypress.Commands.add('upload_file', upload_file);

// UTILS
function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }

    return new Uint8Array(a);
}
  export {};