import { wcagObj } from './data.js';
let filteredTests = wcagObj.tests;

const filterContainer = document.getElementById('filters');
const tableBodyContainer = document.getElementById('dataTable');

const uniqeLevels = [
  'Single A',
  'Double A',
  'Triple A'
]

const uniqeLVersions = [
  'v2.1',
  'v2.2'
]

const uniqeCategories = [
  "Audio and video",
  "Colour",
  "Content",
  "Custom controls",
  "Dynamic content",
  "Font size",
  "Forms and UI",
  "Keyboard",
  "Link",
  "Quick win",
  "Structure"
];

window.handleFilterClose = function (name) {
  filterContainer.removeChild(document.getElementsByName(name)[0])
  console.log([...filterContainer.children].map(x => x.getAttribute('name')))
}

const filterButtons = [uniqeLevels, uniqeLVersions, uniqeCategories]
  .flat()
  .map((name) => `<span
                  class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                  name="${name}"
                >
                  <span>${name}</span>
                  <button
                    type="button"
                    class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    onclick="handleFilterClose('${name}')"
                  >
                    <span class="sr-only">Remove filter for Objects</span>
                    <svg
                      class="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>`
  )

filterContainer.innerHTML = filterButtons.join('')

function renderTable() {
  tableBodyContainer.innerHTML = filteredTests
    .map(({
      wcagLevel,
      wcagVersion,
      successCriteria,
      test
    }) => `<tr>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                <span
                  class="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-s font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                  >${wcagLevel}</span
                >
                <span
                  class="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-s font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                  >v${wcagVersion}</span
                >
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                ${successCriteria}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                ${urlify(test)
        .replace(/or,\s/g, '<br/><strong>or, </strong>')
        .replace(/and,\s/g, '<br/><strong>and, </strong>')}
              </td>
            </tr>`
    )
    .join('');
}

renderTable();

// Create URL from text
function urlify(text) {
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  return text
    // Regular Expression Used
    // < and > are HTML keyword, so replace those by changing HTML scape
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // replace url to HTML element
    .replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
}