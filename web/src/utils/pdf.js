import getFilename from '@lukeboyle/get-filename-from-path';

export const pdfFromApplication = a => pdfFromHTML(renderApplication(a));
export const pdfFromProject = a => pdfFromHTML(renderProject(a));

const styles = `

  /* CSS styling for before/after/avoid */

  .before {
    page-break-before: always;
  }
  .after {
    page-break-after: always;
  }
  .avoid {
    page-break-inside: avoid;
  }


  /* Elements styles */

  body {
    margin: 0;
    padding: 0px;
  }

  .pdf-content {
    font-family: sans-serif;
    padding: 20px;
    break-inside: auto;
    page-break-inside: auto;
  }

  h1 {
    margin: 0;
    padding: 5px;
    margin-bottom: 0.5em;
    font-size: 28px;
    text-align: center;
    color: white;
    background: black;
  }

  .fields {
    font-size: 18px;
  }
  .fields__item {
    margin-bottom: 0.25em;
  }
  .fields__label {
    display: inline-block;
    font-weight: bold;
    min-width: 175px;
  }
  .fields__value {
    display: inline-block;
    min-width: 150px;
  }
`;

function renderProject(project) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        <div class="pdf-content">

          <h1>Project: ${project.title}</h1>

          <h2>Abstract</h2>
          <p>
            ${project.abstract}
          </p>

          <h2>Details</h2>
          <div class="fields">
            <div class="fields__item">
              <span class="fields__label">Author</span>
              <span class="fields__value">
                ${project.author.firstName} ${project.author.lastName}
              </span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Start date</span>
              <span class="fields__value">${project.startDate}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Timeframe</span>
              <span class="fields__value">${project.timeframe}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">MiCM Axis</span>
              <span class="fields__value">${project.axis}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Organizations</span>
              <span class="fields__value">${project.organizations.join(
                ', '
              )}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Keywords</span>
              <span class="fields__value">${project.tags.join(', ')}</span>
            </div>
          </div>

          <div class="avoid">
            <h2>Project description</h2>
            <p>
              ${project.description}
            </p>
          </div>

          <div class="avoid">
            <h2>Description of datasets</h2>
            <p>
              ${project.datasets}
            </p>
          </div>

          <div class="avoid">
            <h2>Motive of collaboration</h2>
            <p>
              ${project.motive}
            </p>
          </div>

          <div class="avoid">
            <h2>Documents</h2>
            <p>
              <ul>
                ${project.documents.map(d => `<li>${d.name}</li>`).join('\n')}
              </ul>
              <em>See attached files</em>
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
}

function renderApplication({ user, application }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        <div class="pdf-content">

          <h1>Application: ${user.firstName} ${user.lastName}</h1>

          <div class="fields">
            <div class="fields__item">
              <span class="fields__label">Name</span>
              <span class="fields__value">${user.firstName} ${
    user.lastName
  }</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">C.V.</span>
              <span class="fields__value"><em>View attached files</em> (${getFilename(
                user.cvKey
              )})</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Transcript</span>
              <span class="fields__value"><em>View attached files</em>  (${getFilename(
                application.transcriptKey
              )})</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Study program</span>
              <span class="fields__value">${application.studyProgram}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Study year</span>
              <span class="fields__value">${application.studyYear}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Graduation year</span>
              <span class="fields__value">${application.graduationYear}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Is a McGill student?</span>
              <span class="fields__value">${
                application.isMcgillStudent ? 'Yes' : 'No'
              }</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">University (if not McGill)</span>
              <span class="fields__value">${application.university}</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Has applied to other internships?</span>
              <span class="fields__value">${
                application.otherInternships ? 'Yes' : 'No'
              }</span>
            </div>
            <div class="fields__item">
              <span class="fields__label">Other internships details</span><br/>
              <span class="fields__value">${
                application.otherInternshipsDetails
              }</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function pdfFromHTML(html) {
  return window.html2pdf().from(html);
}
